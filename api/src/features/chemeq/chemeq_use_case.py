from typing import List

import numpy.typing as npt
from pydantic import BaseModel, Field

from entities.Chemeq import Chemeq, ChemeqResult


class ChemeqResponse(BaseModel):
    ph_index: List[str] = Field(..., description="Phase labels (vapor, liquid, aqueous, mercury)")
    ntot: List[float] = Field(..., description="Total mole numbers for each phase")
    ph_frac: List[float] = Field(..., description="Fraction of each phase (sums to 1)")
    moles: List[List[float]] = Field(..., description="Mole fractions of each phase")

    @classmethod
    def from_values(
        cls,
        ph_index: npt.NDArray[bytes],
        ntot: npt.NDArray[float],
        ph_frac: npt.NDArray[float],
        moles: npt.NDArray[float],
    ) -> "ChemeqResponse":
        return cls(ph_index=ph_index.tolist(), ntot=ntot.tolist(), ph_frac=ph_frac.tolist(), moles=moles.tolist())


def compute_chemeq_use_case(chemeq: Chemeq) -> ChemeqResponse:
    chemeq_result: ChemeqResult = chemeq.compute()
    return ChemeqResponse.from_values(*chemeq_result)
