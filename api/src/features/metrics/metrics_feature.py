from fastapi import APIRouter
from fastapi.responses import PlainTextResponse

from common.exception_handling import ExceptionHandlingRoute
from config import config

router = APIRouter(tags=["metrics"], route_class=ExceptionHandlingRoute)


class Metrics:
    MULTIFLASH_CALCULATION_COUNT: int = 0
    FETCH_COMPONENTS_COUNT: int = 0


metrics = Metrics()


@router.get("/metrics", operation_id="get_metrics", summary="Collect application metrics")
async def get() -> PlainTextResponse:
    return PlainTextResponse(f"""mercury_calculations_count {{env={config.ENVIRONMENT}}} {metrics.MULTIFLASH_CALCULATION_COUNT}\n
mercury_fetch_components_count {{env={config.ENVIRONMENT}}} {metrics.FETCH_COMPONENTS_COUNT}\n""")
