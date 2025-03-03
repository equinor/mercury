from enum import Enum
from typing import Any

from starlette import status

from common.entities.StrictModel import StrictModel


class ExceptionSeverity(Enum):
    WARNING = 1
    ERROR = 2
    CRITICAL = 3


class ErrorResponse(StrictModel):
    status: int = 500
    type: str = "ApplicationException"
    message: str = "The requested operation failed"
    debug: str = "An unknown and unhandled exception occurred in the API"
    extra: dict[str, Any] | None = None


class ApplicationException(Exception):
    status: int = 500
    severity: ExceptionSeverity = ExceptionSeverity.ERROR
    type: str = "ApplicationException"
    message: str = "The requested operation failed"
    debug: str = "An unknown and unhandled exception occurred in the API"
    extra: dict[str, Any] | None = None

    def __init__(
        self,
        message: str = "The requested operation failed",
        debug: str = "An unknown and unhandled exception occurred in the API",
        extra: dict[str, Any] | None = None,
        status: int = 500,
        severity: ExceptionSeverity = ExceptionSeverity.ERROR,
    ):
        self.status = status
        self.type = self.__class__.__name__
        self.message = message
        self.debug = debug
        self.extra = extra
        self.severity = severity

    def dict(self) -> dict[str, int | str | dict[str, Any] | None]:
        return {
            "status": self.status,
            "type": self.type,
            "message": self.message,
            "debug": self.debug,
            "extra": self.extra,
        }


class MissingPrivilegeException(ApplicationException):
    def __init__(
        self,
        message: str = "You do not have the required permissions",
        debug: str = "Action denied because of insufficient permissions",
        extra: dict[str, Any] | None = None,
    ):
        super().__init__(message, debug, extra, status.HTTP_403_FORBIDDEN, severity=ExceptionSeverity.WARNING)
        self.type = self.__class__.__name__


class EntityNotFoundException(ApplicationException):
    def __init__(
        self,
        message: str = "The requested resource could not be found",
        debug: str = "The requested resource could not be found",
        extra: dict[str, Any] | None = None,
    ):
        super().__init__(message, debug, extra, status.HTTP_404_NOT_FOUND)
        self.type = self.__class__.__name__


class BadRequestException(ApplicationException):
    def __init__(
        self,
        message: str = "Invalid data for the operation",
        debug: str = "Unable to complete the requested operation with the given input values.",
        extra: dict[str, Any] | None = None,
    ):
        super().__init__(message, debug, extra, status.HTTP_400_BAD_REQUEST)
        self.type = self.__class__.__name__


class ValidationException(ApplicationException):
    def __init__(
        self,
        message: str = "The received data is invalid",
        debug: str = "Values are invalid for requested operation.",
        extra: dict[str, Any] | None = None,
    ):
        super().__init__(message, debug, extra, status.HTTP_422_UNPROCESSABLE_ENTITY)
        self.type = self.__class__.__name__


class UnauthorizedException(ApplicationException):
    def __init__(
        self,
        message: str = "Token validation failed",
        debug: str = "Token was not valid for requested operation.",
        extra: dict[str, Any] | None = None,
    ):
        super().__init__(message, debug, extra, status.HTTP_401_UNAUTHORIZED)
        self.type = self.__class__.__name__
