from enum import StrEnum


class LoggerLevel(StrEnum):
    """Enum containing the different levels for logging."""

    CRITICAL = "critical"
    ERROR = "error"
    WARNING = "warning"
    INFO = "info"
    DEBUG = "debug"
    TRACE = "trace"
