from typing import List, NamedTuple

import numpy.typing as npt
from pydantic import BaseModel, Field, validator

import libhg

ChemeqResult = NamedTuple(
    "ChemeqResult",
    ph_index=npt.NDArray[bytes],
    ntot=npt.NDArray[float],
    ph_frac=npt.NDArray[float],
    moles=npt.NDArray[float],
)


class Chemeq(BaseModel):
    """
    Model for the  simultaneous chemical and phase equilibria calculation inputs
    """

    number_of_components: int = Field(
        ..., description="Number of components to process", gt=0
    )  # unnecessary: len(component_ids)?
    component_ids: List[int] = Field(..., description="The id's of the components (e.g. H2O, Hg, ...) to process")
    number_of_reactions: int = Field(..., description="", gt=0)
    feed_composition: List[float] = Field(..., description="")
    formula_matrix: List[List[float]] = Field(..., description="")
    stoichiometric_matrix: List[List[float]] = Field(..., description="")

    class Config:
        allow_mutation = False
        schema_extra = {
            "example": {
                "number_of_components": 5,
                "component_ids": [1, 2, 3, 1001, 5],
                "number_of_reactions": 1,
                "feed_composition": [0.98348, 0.09, 0.0247, 0.4565, 0.067685],
                "formula_matrix": [[1, 0, 0, 0, 1], [0, 1, 0, 0, 0], [0, 0, 1, 0, 0], [0, 0, 0, 1, 1]],
                "stoichiometric_matrix": [[1, 0, 0, 0, -1]],
            }
        }

    @validator("component_ids")
    def validate_component_ids(cls, v, values):
        # TODO: Possible to validate each ID against table
        if len(v) != values["number_of_components"]:
            raise ValueError("Length of component_ids must match number_of_components.")
        return v

    @validator("number_of_reactions")
    def validate_number_of_reactions(cls, v, values):
        if values["number_of_components"] - v < 1:
            raise ValueError("Number of reactions must be greater than number_of_components + 1")
        return v

    @validator("feed_composition")
    def validate_feed_composition(cls, v, values):
        if len(v) != values["number_of_components"]:
            raise ValueError("Length of feed_composition must match number_of_components.")
        return v

    @validator("formula_matrix")
    def validate_formula_matrix(cls, v, values):
        number_of_columns = values["number_of_components"]
        number_of_rows = values["number_of_components"] - values["number_of_reactions"]
        row_count = 0
        for row in v:
            if not len(row) == number_of_columns:
                raise ValueError(f"Formula matrix must have {number_of_columns} columns")
            row_count += 1
        if not row_count == number_of_rows:
            raise ValueError(f"Formula matrix must have {number_of_rows} rows")
        return v

    @validator("stoichiometric_matrix")
    def validate_stoichiometric_matrix(cls, v, values):
        number_of_columns = values["number_of_components"]
        number_of_rows = values["number_of_reactions"]
        row_count = 0
        for row in v:
            if not len(row) == number_of_columns:
                raise ValueError(f"Stoichiometric matrix must have {number_of_columns} columns")
            row_count += 1
        if not row_count == number_of_rows:
            raise ValueError(f"Stoichiometric matrix must have {number_of_rows} rows")
        return v

    def compute(self) -> ChemeqResult:
        ph_index, ntot, ph_frac, moles = libhg.cpe(
            ne=self.number_of_components - self.number_of_reactions,
            nc=self.number_of_components,
            nr=self.number_of_reactions,
            list=self.component_ids,
            nf=self.feed_composition,
            a=self.formula_matrix,
            n=self.stoichiometric_matrix,
        )
        return ChemeqResult(ph_index=ph_index, ntot=ntot, ph_frac=ph_frac, moles=moles)
