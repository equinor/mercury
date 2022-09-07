from typing import List, NamedTuple

import libhg
import numpy as np
import numpy.typing as npt
from pydantic import BaseModel, Field, validator

MultiflashResult = NamedTuple(
    "MultiflashResult",
    phase_label=npt.NDArray[str],
    phase_fraction=npt.NDArray[float],
    moles=npt.NDArray[float],
)


class Multiflash(BaseModel):
    """
    Model for the computing multiphase flash calculation input.
    """

    component_ids: List[int] = Field(..., description="The id's of the components (e.g. H2O, Hg, ...) to process")
    temperature: float = Field(..., description="Temperature (in Celsius) for computation", gt=-273.15)
    pressure: float = Field(..., description="Pressure (in bar) for computation")
    feed_composition: List[float] = Field(..., description="The percentage of each component in the feed")

    class Config:
        allow_mutation = False
        schema_extra = {
            "example": {
                "component_ids": [1, 2, 3, 1001, 5],
                "temperature": 37,
                "pressure": 20,
                "feed_composition": [0.98348, 0.09, 0.0247, 0.4565, 0.067685],
            }
        }

    @validator("component_ids")
    def validate_component_ids(cls, v):
        # TODO: validates each ID against COMPONENT_IDS (currently not possible as test data includes other components)
        # if not set(v) < set(COMPONENT_IDS.keys()):
        #     raise ValueError("component_id input contains unknown component!")
        return v

    @validator("feed_composition")
    def validate_composition(cls, v, values):
        if len(v) != len(values["component_ids"]):
            raise ValueError("composition list must be of same length as component_ids")
        # TODO: Tolerance?
        if sum(v) - 1 > 0.05:
            raise ValueError("composition list should add to approx. 1")
        return v

    def compute(self) -> MultiflashResult:
        phase_label, phase_fraction, moles = libhg.compute_multiflash(
            num_comp=len(self.component_ids),
            components=self.component_ids,
            temperature=self.temperature,
            pressure=self.pressure,
            feed_composition=self.feed_composition,
        )
        # convert phase_label from list[list[bytes]] to list[str] and remove empty strings:
        new_phase_label = list(filter(None, [entry.tobytes().decode("utf-8").strip() for entry in phase_label]))
        return MultiflashResult(phase_label=np.array(new_phase_label), phase_fraction=phase_fraction, moles=moles)
