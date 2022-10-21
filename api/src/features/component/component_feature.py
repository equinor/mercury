from fastapi import APIRouter
from pydantic.fields import Field
from pydantic.main import BaseModel
from starlette.responses import JSONResponse

from common.responses import create_response
from entities.Components import Components

router = APIRouter(tags=["component"])


class ComponentResponse(BaseModel):
    """Model containing the response of getting the Components model."""

    components: Components = Field(
        ...,
        description="Model containing all components supported by Mercury app",
    )

    class Config:
        allow_mutation = False


@create_response(JSONResponse)
@router.get("/components", operation_id="get_components", response_model=ComponentResponse)
async def components() -> ComponentResponse:
    return ComponentResponse(components=Components())
