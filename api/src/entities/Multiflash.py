import libhg

import numpy as np
from pydantic import BaseModel, ConfigDict, Field, field_validator

from common.components import COMPONENTS
from common.utils.arrays import NDArrayBytes, NDArrayFloat
from common.utils.enums import PhaseLabels
from common.utils.tuples import ComponentFractions, MultiflashResult, PhaseValues


class Multiflash(BaseModel):
    """
    Model for the computing multiphase flash calculation input.
    """

    component_composition: dict[str, float] = Field(
        ...,
        description="The component ids (as string parsed numbers) and the percentage of each component in the feed",
        alias="componentComposition",
    )
    temperature: float = Field(..., description="Temperature (in Celsius) for computation", gt=-273.15)
    pressure: float = Field(..., description="Pressure (in bar) for computation")

    model_config = ConfigDict(
        frozen=True,
        populate_by_name=True,
        json_schema_extra={
            "example": {
                "componentComposition": {"1": 0.1057, "2": 0.2535, "3": 0.2720, "101": 0.23102, "5": 0.137},
                "temperature": 37,
                "pressure": 20,
            }
        },
    )

    @field_validator("component_composition")
    def validate_composition(cls, component_composition):
        ids = list(component_composition.keys())
        if not set(ids) <= set(COMPONENTS.keys()):
            raise ValueError("component_id input contains unknown component!")
        return {k: v for k, v in component_composition.items() if v != 0}

    @property
    def component_ids(self) -> list[str]:
        return list(self.component_composition.keys())

    @property
    def component_ids_as_ints(self) -> list[int]:
        return [int(x) for x in self.component_ids]

    @property
    def feed_composition(self) -> list[float]:
        return list(self.component_composition.values())

    @property
    def number_of_components(self) -> int:
        return len(self.component_ids)

    @property
    def normalized_feed_composition(self) -> list[float]:
        return list(np.array(self.feed_composition) / np.sum(self.feed_composition))

    @staticmethod
    def format_phase_results(
        phase_labels: NDArrayBytes,
        phase_fractions: NDArrayFloat,
        mercury_concentrations: NDArrayFloat,
    ) -> dict[PhaseLabels, PhaseValues]:
        """
        Convert phase related output from libhg.compute_multiflash (phase_labels, phase_fractions,
        mercury_concentration) to dictionary where keys are PhaseLabel objects and values are PhaseValues tuples.
        """
        return {
            PhaseLabels[label.decode("utf-8").strip().upper()]: PhaseValues(
                percentage=phase_fractions[i], mercury=mercury_concentrations[i]
            )
            for i, label in enumerate(filter(lambda label: label != b"", phase_labels))
        }

    def format_component_results(
        self,
        mole_fractions: NDArrayFloat,
        mass_fractions: NDArrayFloat,
        columns_to_keep: tuple = (1, 2, 3, 4),
    ) -> dict[str, ComponentFractions]:
        """
        Convert fraction related output from libhg.compute_multiflash (mole_fractions, mass_fractions) into dictionary
        where the keys are component id and the values are ComponentFractions tuples.
        """
        sliced_mole_fractions = mole_fractions[:, columns_to_keep]
        sliced_mass_fractions = mass_fractions[:, columns_to_keep]
        return {
            component_id: ComponentFractions(moles=sliced_mole_fractions[i], mass=sliced_mass_fractions[i])
            for i, component_id in enumerate(self.component_ids)
        }

    def compute(self) -> MultiflashResult:
        # Need to normalize feed composition for phase_fraction to not be NaN:
        normalized_feed_composition = self.normalized_feed_composition
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
            feed_composition=normalized_feed_composition,
        )
        phase_values = self.format_phase_results(phase_labels, phase_fractions, mercury_concentrations)
        columns_to_keep = tuple(n for n in range(len(phase_values.keys())))
        return MultiflashResult(
            phase_values=phase_values,
            component_fractions=self.format_component_results(mole_fractions, mass_fractions, columns_to_keep),
            feed_fractions=self.normalized_feed_composition,
        )
