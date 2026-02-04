from enum import StrEnum


class Environment(StrEnum):
    """Enum containing the different deployment environments."""

    LOCAL = "local"
    DEV = "development"
    STAGING = "staging"
    PROD = "production"
