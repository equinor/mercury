from typing import Dict

from pydantic import BaseModel, Field


class ComponentName(BaseModel):
    """
    Model containing the ComponentName: I.e. the chemical name (H2O, Hg, etc.) and the alternate name for a component
    (water, mercury, etc.).
    """

    chemical_formula: str = Field(..., description="Chemical name of the component", alias="chemicalFormula")
    alt_name: str = Field(..., description="Alternate name of the component", alias="altName")

    class Config:
        allow_population_by_field_name = True
        schema_extra = {"example": {"chemicalFormula": "Hg", "altName": "Mercury"}}


class ComponentResponse(BaseModel):
    """
    Model for containing the response of getting the component dictionary.
    """

    components: Dict[str, ComponentName] = Field(
        ...,
        description="Dictionary of component_ids as string and ComponentName as value",
    )

    class Config:
        allow_mutation = False
        schema_extra = {
            "example": {
                "components": {
                    "1": {"chemicalFormula": "CO2", "altName": "Carbondioxide"},
                    "2": {"chemicalFormula": "N2", "altName": "Nitrogen"},
                    "3": {"chemicalFormula": "H2O", "altName": "Water"},
                    "101": {"chemicalFormula": "CH4", "altName": "Methane"},
                    "5": {"chemicalFormula": "Hg", "altName": "Mercury"},
                },
            }
        }
