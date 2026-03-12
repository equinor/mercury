from fastapi import APIRouter

from common.exception_handling import ExceptionHandlingRoute
from entities.multiflash import Multiflash
from features.multiflash.multiflash_use_case import (
    MultiflashResponse,
    compute_multiflash_use_case,
)

router = APIRouter(tags=["multiflash"], route_class=ExceptionHandlingRoute)


@router.post("/multiflash", operation_id="compute_multiflash")
async def compute_multiflash(multiflash: Multiflash) -> MultiflashResponse:
    """Compute multiflash."""
    return compute_multiflash_use_case(multiflash=multiflash)
