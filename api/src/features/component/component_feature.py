from fastapi import APIRouter

from common.components import COMPONENTS
from common.exception_handling import ExceptionHandlingRoute
from entities.ComponentResponse import ComponentResponse
from features.metrics.metrics_feature import metrics

router = APIRouter(tags=["component"], route_class=ExceptionHandlingRoute)


@router.get("/components", operation_id="get_components", response_model=ComponentResponse)
async def components() -> ComponentResponse:
    metrics.FETCH_COMPONENTS_COUNT += 1
    return ComponentResponse(components=COMPONENTS)
