from fastapi import APIRouter
from starlette.responses import JSONResponse

from common.components import COMPONENTS
from common.responses import create_response
from entities.ComponentResponse import ComponentResponse
from features.metrics.metrics_feature import metrics

router = APIRouter(tags=["component"])


@create_response(JSONResponse)
@router.get("/components", operation_id="get_components", response_model=ComponentResponse)
async def components() -> ComponentResponse:
    metrics.FETCH_COMPONENTS_COUNT += 1
    return ComponentResponse(components=COMPONENTS)
