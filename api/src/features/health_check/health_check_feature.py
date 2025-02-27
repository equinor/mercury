from fastapi import APIRouter, status
from fastapi.responses import PlainTextResponse

from common.exception_handling import ExceptionHandlingRoute

router = APIRouter(tags=["health_check"], prefix="/health-check", route_class=ExceptionHandlingRoute)


@router.get(
    "",
    status_code=status.HTTP_200_OK,
    responses={status.HTTP_200_OK: {"model": str, "content": {"text/plain": {"example": "OK"}}}},
    response_class=PlainTextResponse,
)
async def get():
    return "OK"
