from pydantic_settings import BaseSettings

from authentication.models import User
from common.environment import Environment
from common.logger_level import LoggerLevel


class Config(BaseSettings):
    APP_TITLE: str = "Mercury"
    APP_REPOSITORY_URL: str = "https://github.com/equinor/mercury"
    ENVIRONMENT: Environment = Environment.LOCAL

    # Logging
    LOGGER_LEVEL: LoggerLevel = LoggerLevel.INFO
    APPLICATIONINSIGHTS_CONNECTION_STRING: str | None = None

    # Access control
    APPLICATION_ADMIN: str = "admin"
    APPLICATION_ADMIN_ROLE: str = "admin"

    # Azure
    AZURE_TENANT_ID: str = ""
    AZURE_CLIENT_ID: str = ""

    # Authentication
    AUTH_ENABLED: bool = False
    TEST_TOKEN: bool = False  # This value should only be changed at runtime by test setup
    OAUTH_AUDIENCE: str = ""
    OAUTH_AUTH_SCOPE: str = ""
    OAUTH_AUTH_ENDPOINT: str = ""
    OAUTH_TOKEN_ENDPOINT: str = ""
    OAUTH_WELL_KNOWN: str = ""


config = Config()

default_user: User = User(
    **{
        "user_id": "nologin",
        "full_name": "Not Authenticated",
        "email": "nologin@example.com",
    }
)
