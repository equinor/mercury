from fastapi import APIRouter, status
from fastapi.responses import PlainTextResponse

from common.exception_handling import ExceptionHandlingRoute

router = APIRouter(tags=["health_check"], prefix="/health-check", route_class=ExceptionHandlingRoute)


@router.get(
    "",
    operation_id="get_health_check",
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_200_OK: {"model": str, "content": {"text/plain": {"example": "OK"}}}},
)
async def get() -> PlainTextResponse:
    return PlainTextResponse("OK")
