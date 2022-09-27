from fastapi import APIRouter
from starlette.responses import JSONResponse

from common.components import COMPONENT_IDS
from common.responses import create_response
from entities.ComponentResponse import ComponentResponse

router = APIRouter(tags=["component"])


@create_response(JSONResponse)
@router.get("/components", operation_id="get_components", response_model=ComponentResponse)
async def components() -> ComponentResponse:
    return ComponentResponse(components=COMPONENT_IDS)
