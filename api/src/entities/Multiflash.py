from typing import Dict, List

import libhg
import numpy.typing as npt
from pydantic import BaseModel, Field, validator

from common.components import COMPONENT_IDS
from common.utils.enums import PhaseLabels
from common.utils.tuples import ComponentFractions, MultiflashResult, PhaseValues


class Multiflash(BaseModel):
    """
    Model for the computing multiphase flash calculation input.
    """

    component_composition: Dict[str, float] = Field(
        ...,
        description="The component ids (as string parsed numbers) and the percentage of each component in the feed",
        alias="componentComposition",
    )
    temperature: float = Field(..., description="Temperature (in Celsius) for computation", gt=-273.15)
    pressure: float = Field(..., description="Pressure (in bar) for computation")

    class Config:
        allow_mutation = False
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "componentComposition": {"1": 0.1057, "2": 0.2535, "3": 0.2720, "101": 0.23102, "5": 0.137},
                "temperature": 37,
                "pressure": 20,
            }
        }

    @validator("component_composition")
    def validate_composition(cls, v):
        composition = list(v.values())
        ids = list(v.keys())
        if not set(ids) <= set(COMPONENT_IDS.keys()):
            raise ValueError("component_id input contains unknown component!")
        if abs(sum(composition) - 1) > 0.01:
            raise ValueError("composition list should add to approx. 1")
        return v

    @property
    def component_ids(self) -> List[str]:
        return list(self.component_composition.keys())

    @property
    def component_ids_as_ints(self) -> List[int]:
        return [int(x) for x in self.component_ids]

    @property
    def feed_composition(self) -> List[float]:
        return list(self.component_composition.values())

    @property
    def number_of_components(self) -> int:
        return len(self.component_ids)

    @staticmethod
    def format_phase_results(
        phase_labels: npt.NDArray[bytes],
        phase_fractions: npt.NDArray[float],
        mercury_concentrations: npt.NDArray[float],
    ) -> Dict[PhaseLabels, PhaseValues]:
        """
        Converts phase related output from libhg.compute_multiflash (phase_labels, phase_fractions,
        mercury_concentration) to dictionary where keys are PhaseLabel objects and values are PhaseValues tuples.
        """
        phase_label_byte_strings = [b"".join(label).strip() for label in phase_labels]
        phases = {
            PhaseLabels[label.decode("utf-8").upper()]: PhaseValues(
                percentage=phase_fractions[i], mercury=mercury_concentrations[i]
            )
            for i, label in enumerate(filter(lambda label: label != b"", phase_label_byte_strings))
        }
        return phases

    def format_component_results(
        self,
        mole_fractions: npt.NDArray[float],
        mass_fractions: npt.NDArray[float],
        columns_to_keep: tuple = (1, 2, 3, 4),
    ) -> Dict[str, ComponentFractions]:
        """
        Converts fraction related output from libhg.compute_multiflash (mole_fractions, mass_fractions) into dictionary
        where the keys are component id and the values are ComponentFractions tuples.
        """
        sliced_mole_fractions = mole_fractions[:, columns_to_keep]
        sliced_mass_fractions = mass_fractions[:, columns_to_keep]
        return {
            component_id: ComponentFractions(moles=sliced_mole_fractions[i], mass=sliced_mass_fractions[i])
            for i, component_id in enumerate(self.component_ids)
        }

    def compute(self) -> MultiflashResult:
        (
            phase_labels,
            phase_fractions,
            mole_fractions,
            mass_fractions,
            mercury_concentrations,
        ) = libhg.compute_multiflash(
            num_comp=self.number_of_components,
            components=self.component_ids_as_ints,
            temperature=self.temperature,
            pressure=self.pressure,
            feed_composition=self.feed_composition,
        )
        phase_values = self.format_phase_results(phase_labels, phase_fractions, mercury_concentrations)
        columns_to_keep = tuple(n for n in range(len(phase_values.keys())))
        return MultiflashResult(
            phase_values=phase_values,
            component_fractions=self.format_component_results(mole_fractions, mass_fractions, columns_to_keep),
        )
