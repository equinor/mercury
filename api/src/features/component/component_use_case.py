from typing import Dict

from pydantic import BaseModel, Field


class ComponentName(BaseModel):
    chemical_formula: str = Field(..., description="Chemical name of the component", alias="chemicalFormula")
    alt_name: str = Field(..., description="Alternate name for component (e.g. Water for H2O)", alias="altName")

    class Config:
        allow_population_by_field_name = True


def component_use_case(components: Dict[str, Dict[str, str]]):
    component_response = {}
    for key, value in components.items():
        component_response[key] = ComponentName(**value).dict(by_alias=True)
    return component_response
