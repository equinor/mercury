from typing import Dict, List

import numpy.typing as npt
from pydantic import BaseModel, Field

from common.utils.enums import PhaseLabels
from entities.Multiflash import Multiflash, MultiflashResult


class MultiflashResponse(BaseModel):
    phases: Dict[PhaseLabels, float] = Field(
        ..., description="Phase labels (vapor, liquid, aqueous, mercury) and their fraction of unity"
    )
    moles: Dict[str, List[float]] = Field(..., description="Mole fractions of each phase")

    @classmethod
    def from_values(
        cls,
        phase_label: npt.NDArray[npt.NDArray[bytes]],
        phase_fraction: npt.NDArray[float],
        moles: Dict[str, npt.NDArray[float]],
    ) -> "MultiflashResponse":
        new_phase_label = [PhaseLabels[entry.upper()].value for entry in phase_label]
        phases = {label: fraction for label, fraction in zip(new_phase_label, phase_fraction)}
        new_moles = {component_id: mole_values.tolist() for component_id, mole_values in moles.items()}
        return cls(phases=phases, moles=new_moles)

    @property
    def phase_labels(self) -> List[PhaseLabels]:
        return list(self.phases.keys())

    @property
    def phase_fractions(self) -> List[float]:
        return list(self.phases.values())


def compute_multiflash_use_case(multiflash: Multiflash) -> MultiflashResponse:
    multiflash_result: MultiflashResult = multiflash.compute()
    return MultiflashResponse.from_values(*multiflash_result)
