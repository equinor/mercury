from fastapi import APIRouter

from entities.Chemeq import Chemeq
from features.chemeq.chemeq_use_case import ChemeqResponse, compute_chemeq_use_case

router = APIRouter(tags=["chemeq"])


@router.post("/chemeq", operation_id="compute_chemeq", response_model=ChemeqResponse)
async def compute_chemeq(chemeq: Chemeq) -> ChemeqResponse:
    return compute_chemeq_use_case(chemeq=chemeq)
