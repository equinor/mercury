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

    number_of_components: int = Field(
        ..., description="Number of components to process", gt=0
    )  # unnecessary: len(component_ids)?
    component_ids: List[int] = Field(..., description="The id's of the components (e.g. H2O, Hg, ...) to process")
    temperature: float = Field(..., description="Temperature (in Celsius) for computation", gt=-273.15)
    pressure: float = Field(..., description="Pressure (in bar) for computation")
    composition: List[float] = Field(..., description="")  # feed_composition?

    class Config:
        allow_mutation = False
        schema_extra = {
            "example": {
                "number_of_components": 5,
                "component_ids": [1, 2, 3, 1001, 5],
                "temperature": 37,
                "pressure": 20,
                "composition": [0.98348, 0.09, 0.0247, 0.4565, 0.067685],
            }
        }

    @validator("component_ids")
    def validate_component_ids(cls, v, values):
        # TODO: Possible to validate each ID against table (currently not possible as test data includes other components)
        if len(v) != values["number_of_components"]:
            raise ValueError("Length of component_ids must match number_of_components.")
        return v

    @validator("composition")
    def validate_composition(cls, v, values):
        if len(v) != values["number_of_components"]:
            raise ValueError("Length of composition must match number_of_components.")
        return v

    def compute(self) -> MultiflashResult:
        phase_label, phase_fraction, moles = libhg.compute_multiflash(
            num_comp=self.number_of_components,
            components=self.component_ids,
            temperature=self.temperature,
            pressure=self.pressure,
            feed_composition=self.composition,
        )
        # convert phase_label from list[list[bytes]] to list[str] and remove empty strings:
        new_phase_label = list(filter(None, [entry.tobytes().decode("utf-8").strip() for entry in phase_label]))
        return MultiflashResult(phase_label=np.array(new_phase_label), phase_fraction=phase_fraction, moles=moles)
