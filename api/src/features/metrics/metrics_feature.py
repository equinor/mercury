from fastapi import APIRouter
from fastapi.responses import PlainTextResponse

from common.exception_handling import ExceptionHandlingRoute
from features.metrics.metrics_use_case import get_metrics_use_case

router = APIRouter(tags=["metrics"], route_class=ExceptionHandlingRoute)


@router.get("/metrics", operation_id="get_metrics", summary="Collect application metrics")
async def get() -> PlainTextResponse:
    """Return metrics for application."""
    return PlainTextResponse(get_metrics_use_case())
