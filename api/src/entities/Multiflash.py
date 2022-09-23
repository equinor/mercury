from typing import Dict, NamedTuple

import numpy as np
import numpy.typing as npt
from pydantic import BaseModel, Field, validator

import libhg

MultiflashResult = NamedTuple(
    "MultiflashResult",
    phase_label=npt.NDArray[str],
    phase_fraction=npt.NDArray[float],
    moles=Dict[str, npt.NDArray[float]],
)


class Multiflash(BaseModel):
    """
    Model for the computing multiphase flash calculation input.
    """

    component_composition: Dict[str, float] = Field(
        ...,
        description="The component ids (as string parsed numbers) and the percentage of each component in the feed",
    )
    temperature: float = Field(..., description="Temperature (in Celsius) for computation", gt=-273.15)
    pressure: float = Field(..., description="Pressure (in bar) for computation")

    class Config:
        allow_mutation = False
        schema_extra = {
            "example": {
                "component_composition": {"1": 0.1057, "2": 0.2535, "3": 0.2720, "1001": 0.23102, "5": 0.137},
                "temperature": 37,
                "pressure": 20,
            }
        }

    @validator("component_composition")
    def validate_composition(cls, v):
        composition = list(v.values())
        # TODO: validates each ID against COMPONENT_IDS (currently not possible as test data includes other components)
        # ids = list(v.keys())
        # if not set(ids) < set(COMPONENT_IDS.keys()):
        #     raise ValueError("component_id input contains unknown component!")
        # TODO: Tolerance?
        if sum(composition) - 1 > 0.05:
            raise ValueError("composition list should add to approx. 1")
        return v

    @property
    def component_ids(self):
        return list(self.component_composition.keys())

    @property
    def component_ids_as_ints(self):
        return [int(x) for x in self.component_ids]

    @property
    def feed_composition(self):
        return list(self.component_composition.values())

    @property
    def number_of_components(self):
        return len(self.component_ids)

    def compute(self) -> MultiflashResult:
        phase_label, phase_fraction, moles = libhg.compute_multiflash(
            num_comp=self.number_of_components,
            components=self.component_ids_as_ints,
            temperature=self.temperature,
            pressure=self.pressure,
            feed_composition=self.feed_composition,
        )
        # convert phase_label from list[list[bytes]] to list[str] and remove empty strings:
        new_phase_label = list(filter(None, [entry.tobytes().decode("utf-8").strip() for entry in phase_label]))
        # make moles into dictionary where value is the moles for that component id key:
        new_moles = {component_id: moles[i] for i, component_id in enumerate(self.component_ids)}
        return MultiflashResult(phase_label=np.array(new_phase_label), phase_fraction=phase_fraction, moles=new_moles)
