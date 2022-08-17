from typing import List

import numpy.typing as npt
from pydantic import BaseModel, Field

from entities.Multiflash import Multiflash, MultiflashResult


class MultiflashResponse(BaseModel):
    ph_index: List[str] = Field(..., description="Phase labels (vapor, liquid, aqueous, mercury)")
    ph_frac: List[float] = Field(..., description="Fraction of each phase (sums to 1)")
    moles: List[List[float]] = Field(..., description="Mole fractions of each phase")

    @classmethod
    def from_values(
        cls, ph_index: npt.NDArray[bytes], ph_frac: npt.NDArray[float], moles: npt.NDArray[float]
    ) -> "MultiflashResponse":
        return cls(ph_index=ph_index.tolist(), ph_frac=ph_frac.tolist(), moles=moles.tolist())


def compute_multiflash_use_case(multiflash: Multiflash) -> MultiflashResponse:
    multiflash_result: MultiflashResult = multiflash.compute()
    return MultiflashResponse.from_values(*multiflash_result)
