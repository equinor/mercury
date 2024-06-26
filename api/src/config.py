from pydantic import BaseSettings, Field

from authentication.models import User


class Config(BaseSettings):
    ENVIRONMENT: str = Field("local", env="ENVIRONMENT")

    # Logging
    LOGGER_LEVEL: str = Field("INFO", env="LOGGING_LEVEL", to_lower=True)
    APPINSIGHTS_CONSTRING: str = Field(None, env="APPINSIGHTS_CONSTRING")

    # Access control
    APPLICATION_ADMIN = Field("admin", env="APPLICATION_ADMIN")
    APPLICATION_ADMIN_ROLE = Field("admin", env="APPLICATION_ADMIN_ROLE")

    # Authentication
    AUTH_ENABLED: bool = Field(False, env="AUTH_ENABLED")
    JWT_SELF_SIGNING_ISSUER: str = "APPLICATION"  # Which value will be used to sign self-signed JWT's
    TEST_TOKEN: bool = False  # This value should only be changed at runtime by test setup
    OAUTH_WELL_KNOWN: str = Field(None, env="OAUTH_WELL_KNOWN")
    OAUTH_TOKEN_ENDPOINT: str = Field("", env="OAUTH_TOKEN_ENDPOINT")
    OAUTH_AUTH_ENDPOINT: str = Field("", env="OAUTH_AUTH_ENDPOINT")
    OAUTH_CLIENT_ID = Field("", env="OAUTH_CLIENT_ID")
    AUTH_AUDIENCE: str = Field("TEST", env="OAUTH_AUDIENCE")
    MICROSOFT_AUTH_PROVIDER: str = "login.microsoftonline.com"


config = Config()

default_user: User = User(
    **{
        "user_id": "nologin",
        "full_name": "Not Authenticated",
        "email": "nologin@example.com",
    }
)
