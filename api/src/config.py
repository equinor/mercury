from pydantic_settings import BaseSettings

from authentication.models import User


class Config(BaseSettings):
    ENVIRONMENT: str = "local"

    # Logging
    LOGGER_LEVEL: str = "INFO"
    APPINSIGHTS_CONSTRING: str | None = None

    # Access control
    APPLICATION_ADMIN: str = "admin"
    APPLICATION_ADMIN_ROLE: str = "admin"

    # Authentication
    AUTH_ENABLED: bool = False
    JWT_SELF_SIGNING_ISSUER: str = "APPLICATION"  # Which value will be used to sign self-signed JWT's
    TEST_TOKEN: bool = False  # This value should only be changed at runtime by test setup
    OAUTH_WELL_KNOWN: str | None = None
    OAUTH_TOKEN_ENDPOINT: str = ""
    OAUTH_AUTH_ENDPOINT: str = ""
    OAUTH_CLIENT_ID: str = ""
    OAUTH_AUDIENCE: str = "TEST"
    MICROSOFT_AUTH_PROVIDER: str = "login.microsoftonline.com"


config = Config()

default_user: User = User(
    **{
        "user_id": "nologin",
        "full_name": "Not Authenticated",
        "email": "nologin@example.com",
    }
)
