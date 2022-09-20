from typing import Dict, List

from pydantic import BaseModel, Field

from common.utils.enums import PhaseLabels
from entities.Multiflash import (
    ComponentFractions,
    Multiflash,
    MultiflashResult,
    PhaseValues,
)


class MultiflashResponse(BaseModel):
    phase_values: Dict[PhaseLabels, Dict[str, float]] = Field(
        ...,
        description="Phase labels (vapor, liquid, aqueous, mercury) with "
        "their fraction of unity and mercury concentration",
    )
    component_fractions: Dict[str, List[float]] = Field(
        ..., description="Mole fractions of each of the components (Note: mass is discarded from MultiflashResult)"
    )

    class Config:
        allow_mutation = False
        schema_extra = {
            "example": {
                "phase_values": {
                    "Mercury": {"percentage": 0.13710670215621407, "mercury": 1000000000},
                    "Vapor": {"percentage": 0.5923732280108018, "mercury": 3426.2630579508586},
                    "Aqueous": {"percentage": 0.2705200698329841, "mercury": 82.76725027120922},
                },
                "component_fractions": {
                    "1": [3.153640195684568e-23, 0.17798810356465122, 0.001283168757794131],
                    "2": [8.232685472278065e-23, 0.42824009015281783, 0.00007363513673381724],
                    "3": [6.089783280850285e-25, 0.0035486377271550557, 0.9984849101778882],
                    "5": [1.0000000000000002, 4.038754670974074e-7, 7.447270506156235e-9],
                    "101": [7.260898200622709e-23, 0.390222764679909, 0.00015827848031333905],
                },
            }
        }

    @classmethod
    def from_values(
        cls, phase_values: Dict[PhaseLabels, PhaseValues], component_fractions: Dict[str, ComponentFractions]
    ) -> "MultiflashResponse":
        # convert phase_values to dictionary
        new_phase_values = {label: value._asdict() for label, value in phase_values.items()}
        # convert component_fraction to dictionary with lists (not numpy arrays):
        new_component_fractions = {
            component_id: component_fractions[component_id].moles.tolist()
            for component_id in component_fractions.keys()
        }
        return cls(phase_values=new_phase_values, component_fractions=new_component_fractions)

    @property
    def phase_labels(self) -> List[PhaseLabels]:
        return list(self.phase_values.keys())

    @property
    def phase_fractions(self) -> List[float]:
        return [value["percentage"] for key, value in self.phase_values.items()]


def compute_multiflash_use_case(multiflash: Multiflash) -> MultiflashResponse:
    multiflash_result: MultiflashResult = multiflash.compute()
    return MultiflashResponse.from_values(*multiflash_result)
