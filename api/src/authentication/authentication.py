import jwt
import requests
from cachetools import TTLCache, cached
from fastapi import Security
from fastapi.security import OAuth2AuthorizationCodeBearer
from jwt import PyJWKClient

from authentication.models import User
from common.exceptions import UnauthorizedException
from common.logger import logger
from config import config

oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl=config.OAUTH_AUTH_ENDPOINT,
    tokenUrl=config.OAUTH_TOKEN_ENDPOINT,
    auto_error=False,
)
_MICROSOFT_AUTH_PROVIDER = "login.microsoftonline.com"


@cached(cache=TTLCache(maxsize=32, ttl=86400))
def get_JWK_client() -> PyJWKClient:
    try:
        oid_conf_response = requests.get(config.OAUTH_WELL_KNOWN, timeout=30)
        oid_conf_response.raise_for_status()
        oid_conf = oid_conf_response.json()
        return PyJWKClient(oid_conf["jwks_uri"])

    except Exception as error:
        logger.exception(f"Failed to fetch OpenId Connect configuration for '{config.OAUTH_WELL_KNOWN}': {error}")
        raise UnauthorizedException from error


def auth_with_jwt(jwt_token: str = Security(oauth2_scheme)) -> User:
    if not config.AUTH_ENABLED:
        return User.create_default()
    if not jwt_token:
        raise UnauthorizedException
    key = get_JWK_client().get_signing_key_from_jwt(jwt_token).key
    if not key:
        raise UnauthorizedException
    try:
        payload = jwt.decode(jwt_token, key, algorithms=["RS256"], audience=config.OAUTH_AUDIENCE)
        if _MICROSOFT_AUTH_PROVIDER in payload["iss"]:
            # Azure AD uses an oid string to uniquely identify users. Each user has a unique oid value.
            user = User(user_id=payload["oid"], **payload)
        else:
            user = User(user_id=payload["sub"], **payload)
    except jwt.exceptions.InvalidTokenError as error:
        logger.warning(f"Failed to decode JWT: {error}")
        raise UnauthorizedException from error

    if user is None:
        raise UnauthorizedException
    return user
