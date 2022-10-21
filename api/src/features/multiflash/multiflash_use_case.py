from typing import Dict, List, Optional

import numpy as np
from pydantic import BaseModel, Field

from common.utils.enums import PhaseLabels
from common.utils.tuples import PhaseValues
from entities.Components import ComponentIds
from entities.Multiflash import ComponentFractions, Multiflash, MultiflashResult


class PhaseProperties(BaseModel):
    """Model for the different properties a phase can have"""

    ratio: float = Field(..., description="The relative ratio of this phase in the result", alias="ratio")
    mercury_concentration: float = Field(
        ..., description="The amount of mercury in this phase (mass concentration)", alias="mercuryConcentration"
    )
    mole_fractions: List[float] = Field(
        ..., description="The mole concentration of each component in this phase", alias="moleFractions"
    )

    class Config:
        allow_population_by_field_name = True

        schema_extra = {
            "example": [
                {"ratio": 0.14},
                {"mercuryConcentration": 249},
                {"moleFractions": [0.000023, 0.0089321, 0.000241840]},
            ]
        }

    def __eq__(self, other) -> bool:
        if not isinstance(other, PhaseProperties):
            return False
        if (
            np.isclose(self.ratio, other.ratio)
            and np.isclose(self.mercury_concentration, other.mercury_concentration)
            and np.allclose(self.mole_fractions, other.mole_fractions, rtol=1e-3)
        ):
            return True
        else:
            return False


class PhaseResults(BaseModel):
    """Model containing the possible phases in a computation"""

    mercury: Optional[PhaseProperties] = Field(description="Mercury phase", alias="Mercury")
    vapor: Optional[PhaseProperties] = Field(description="Vapor phase", alias="Vapor")
    liquid: Optional[PhaseProperties] = Field(description="Liquid phase", alias="Liquid")
    aqueous: Optional[PhaseProperties] = Field(description="Aqueous phase", alias="Aqueous")

    class Config:
        allow_population_by_field_name = True

    def __getitem__(self, item):
        return PhaseProperties(**self.dict()[item])


class MultiflashResponse(BaseModel):
    """Model containing response from the computation"""

    component_ids: List[ComponentIds] = Field(
        ..., description="The ids of the components in the feed.", alias="componentIds"
    )
    phases: List[PhaseLabels] = Field(
        ..., description="The different phases observed in this computation.", alias="phases"
    )
    phase_values: PhaseResults = Field(..., description="Model containing results per phase.", alias="phaseValues")

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": [
                {"componentIds": ["id1", "id2", "id3", "id5", "id101"]},
                {"phases": ["mercury", "vapor", "aqueous"]},
                {
                    "phaseValues": [
                        {
                            "Mercury": [
                                {"ratio": 0.13710670215621407},
                                {"mercuryConcentration": 1000000000},
                                {
                                    "moleFractions": [
                                        3.153640195684568e-23,
                                        8.232685472278065e-23,
                                        6.089783280850285e-25,
                                        1.0000000000000002,
                                        7.260898200622709e-23,
                                    ]
                                },
                            ],
                            "Vapor": [
                                {"ratio": 0.5923732280108018},
                                {"mercuryConcentration": 3426.2630579508586},
                                {
                                    "moleFractions": [
                                        0.17798810356465122,
                                        0.42824009015281783,
                                        0.0035486377271550557,
                                        4.038754670974074e-7,
                                        0.390222764679909,
                                    ]
                                },
                            ],
                            "Aqueous": [
                                {"ratio": 0.2705200698329841},
                                {"mercuryConcentration": 82.76725027120922},
                                {
                                    "moleFractions": [
                                        0.001283168757794131,
                                        0.00007363513673381724,
                                        0.9984849101778882,
                                        7.447270506156235e-9,
                                        0.00015827848031333905,
                                    ]
                                },
                            ],
                        }
                    ]
                },
            ]
        }

    def __eq__(self, other) -> bool:
        if not isinstance(other, MultiflashResponse):
            return False
        if not set(self.component_ids) == set(other.component_ids):
            return False
        if not set(self.phases) and set(other.phases):
            return False
        for phase in self.phases:
            if not self.phase_values[phase] == other.phase_values[phase]:
                return False
        return True

    @classmethod
    def from_values(
        cls, phase_values: Dict[PhaseLabels, PhaseValues], component_fractions: Dict[str, ComponentFractions]
    ) -> "MultiflashResponse":
        component_ids = list(component_fractions.keys())
        phases = list(phase_values.keys())
        phase_results = {}
        for index, (phase, phase_value) in enumerate(phase_values.items()):
            phase_mole_fractions = [
                component_fractions[component_id].moles[index] for component_id in component_fractions.keys()
            ]
            phase_results[phase] = PhaseProperties(
                ratio=phase_value.percentage,
                mercury_concentration=phase_value.mercury,
                mole_fractions=phase_mole_fractions,
            )
        return MultiflashResponse(
            component_ids=component_ids,
            phases=phases,
            phase_values=phase_results,
        )


def compute_multiflash_use_case(multiflash: Multiflash) -> MultiflashResponse:
    multiflash_result: MultiflashResult = multiflash.compute()
    return MultiflashResponse.from_values(*multiflash_result)
