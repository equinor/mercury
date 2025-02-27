from fastapi import APIRouter

from common.exception_handling import ExceptionHandlingRoute
from entities.Multiflash import Multiflash
from features.metrics.metrics_feature import metrics
from features.multiflash.multiflash_use_case import (
    MultiflashResponse,
    compute_multiflash_use_case,
)

router = APIRouter(tags=["multiflash"], route_class=ExceptionHandlingRoute)


@router.post("/multiflash", operation_id="compute_multiflash", response_model=MultiflashResponse)
async def compute_multiflash(multiflash: Multiflash) -> MultiflashResponse:
    metrics.MULTIFLASH_CALCULATION_COUNT += 1
    return compute_multiflash_use_case(multiflash=multiflash)
