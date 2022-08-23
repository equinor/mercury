from typing import List, NamedTuple

import libhg
import numpy.typing as npt
from pydantic import BaseModel, Field, validator

MultiflashResult = NamedTuple(
    "MultiflashResult", ph_index=npt.NDArray[bytes], ph_frac=npt.NDArray[float], moles=npt.NDArray[float]
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
        # TODO: Possible to validate each ID against table
        if len(v) != values["number_of_components"]:
            raise ValueError("Length of component_ids must match number_of_components.")
        return v

    @validator("composition")
    def validate_composition(cls, v, values):
        if len(v) != values["number_of_components"]:
            raise ValueError("Length of composition must match number_of_components.")
        return v

    def compute(self) -> MultiflashResult:
        ph_index, ph_frac, moles = libhg.mf(
            nc=self.number_of_components,
            list=self.component_ids,
            t=self.temperature,
            p=self.pressure,
            compos=self.composition,
        )
        return MultiflashResult(ph_index=ph_index, ph_frac=ph_frac, moles=moles)
