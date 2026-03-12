from fastapi import APIRouter

from common.exception_handling import ExceptionHandlingRoute
from features.component.component_response_model import ComponentResponse
from features.component.get_components_use_case import get_components_use_case
from features.metrics.metrics_feature import metrics

router = APIRouter(tags=["component"], route_class=ExceptionHandlingRoute)


@router.get("/components", operation_id="get_components")
async def components() -> ComponentResponse:
    metrics.FETCH_COMPONENTS_COUNT += 1
    return get_components_use_case()
