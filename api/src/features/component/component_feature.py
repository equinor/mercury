from typing import Dict

from fastapi import APIRouter
from starlette.responses import JSONResponse

from common.components import COMPONENT_IDS
from common.responses import create_response
from features.component.component_use_case import component_use_case

router = APIRouter(tags=["component"])


@create_response(JSONResponse)
@router.get("/components", operation_id="get_components", response_model=Dict[str, Dict[str, str]])
async def components() -> Dict[str, Dict[str, str]]:
    return component_use_case(COMPONENT_IDS)
