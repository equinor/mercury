from pydantic import SecretStr
from pydantic_settings import BaseSettings

from common.environment import Environment
from common.logger_level import LoggerLevel


class Config(BaseSettings):
    ENVIRONMENT: Environment = Environment.LOCAL

    # Logging
    LOGGER_LEVEL: LoggerLevel = LoggerLevel.INFO
    APPLICATIONINSIGHTS_CONNECTION_STRING: SecretStr | None = None

    # Access control
    APPLICATION_ADMIN: str = "admin"
    APPLICATION_ADMIN_ROLE: str = "admin"

    # Azure
    AZURE_TENANT_ID: str = ""
    AZURE_CLIENT_ID: str = ""

    # Authentication
    AUTH_ENABLED: bool = False
    OAUTH_AUDIENCE: str = ""
    OAUTH_AUTH_SCOPE: str = ""
    OAUTH_AUTH_ENDPOINT: str = ""
    OAUTH_TOKEN_ENDPOINT: str = ""
    OAUTH_WELL_KNOWN: str = ""

    @property
    def has_applicationinsight_connection_string(self) -> bool:
        return (
            self.APPLICATIONINSIGHTS_CONNECTION_STRING is not None
            and self.APPLICATIONINSIGHTS_CONNECTION_STRING.get_secret_value() != ""
        )

    def get_applicationinsight_connection_string(self) -> str:
        if self.APPLICATIONINSIGHTS_CONNECTION_STRING is None:
            return ""
        return self.APPLICATIONINSIGHTS_CONNECTION_STRING.get_secret_value()


config = Config()
