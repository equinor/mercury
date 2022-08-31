from typing import List

import numpy.typing as npt
from pydantic import BaseModel, Field

from common.utils.enums import PhaseLabels
from entities.Multiflash import Multiflash, MultiflashResult


class MultiflashResponse(BaseModel):
    phase_label: List[PhaseLabels] = Field(..., description="Phase labels (vapor, liquid, aqueous, mercury)")
    phase_fraction: List[float] = Field(..., description="Fraction of each phase (sums to 1)")
    moles: List[List[float]] = Field(..., description="Mole fractions of each phase")

    @classmethod
    def from_values(
        cls,
        phase_label: npt.NDArray[npt.NDArray[bytes]],
        phase_fraction: npt.NDArray[float],
        moles: npt.NDArray[float],
    ) -> "MultiflashResponse":
        new_phase_label = [PhaseLabels[entry.upper()].value for entry in phase_label]
        return cls(phase_label=new_phase_label, phase_fraction=phase_fraction.tolist(), moles=moles.tolist())


def compute_multiflash_use_case(multiflash: Multiflash) -> MultiflashResponse:
    multiflash_result: MultiflashResult = multiflash.compute()
    return MultiflashResponse.from_values(*multiflash_result)
