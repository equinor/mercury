from typing import cast

from fastapi import APIRouter
from fastapi.responses import PlainTextResponse

from common.exception_handling import ExceptionHandlingRoute
from features.metrics.metrics_use_case import get_metrics_use_case

router = APIRouter(tags=["metrics"], route_class=ExceptionHandlingRoute)


@router.get(
    "/metrics",
    operation_id="get_metrics",
    response_class=PlainTextResponse,
    summary="Collect application metrics",
)
async def get() -> str:
    """Return metrics for application."""
    response = cast("str", get_metrics_use_case())
    return response
