from typing import Annotated

from fastapi import APIRouter, Depends

from authentication.authentication import auth_with_jwt
from authentication.models import User
from common.exception_handling import ExceptionHandlingRoute

router = APIRouter(tags=["whoami"], prefix="/whoami", route_class=ExceptionHandlingRoute)


@router.get("/", operation_id="get_whoami")
async def get_information_on_authenticated_user(
    user: Annotated[User, Depends(auth_with_jwt)],
):
    return user
