from typing import Dict

from fastapi import APIRouter
from starlette.responses import JSONResponse

from common.components import COMPONENT_IDS
from common.responses import create_response

router = APIRouter(tags=["component"])


@create_response(JSONResponse)
@router.get("/components", operation_id="get_components", response_model=Dict[int, Dict[str, str]])
async def components() -> Dict[int, Dict[str, str]]:
    return COMPONENT_IDS
