from typing import Dict

from pydantic import BaseModel, Field


class ComponentProperties(BaseModel):
    """
    Model containing properties of the component: I.e. the chemical name (H2O, Hg, etc.), the alternate name for a
    component (water, mercury, etc.) and the molecular weight of the component.
    """

    chemical_formula: str = Field(..., description="Chemical name of the component", alias="chemicalFormula")
    alt_name: str = Field(..., description="Alternate name of the component", alias="altName")
    molecular_weight: float = Field(
        ..., description="Molecular weight of the component (g/mol)", alias="molecularWeight"
    )

    class Config:
        allow_population_by_field_name = True
        schema_extra = {"example": {"chemicalFormula": "Hg", "altName": "Mercury", "molecularWeight": 200.59}}


class ComponentResponse(BaseModel):
    """
    Model for containing the response of getting the component dictionary.
    """

    components: Dict[str, ComponentProperties] = Field(
        ...,
        description="Dictionary of component_ids as string and ComponentProperties as value",
    )

    class Config:
        allow_mutation = False
        schema_extra = {
            "example": {
                "components": {
                    "1": {"chemicalFormula": "CO2", "altName": "Carbondioxide", "molecularWeight": 44.01},
                    "2": {"chemicalFormula": "N2", "altName": "Nitrogen", "molecularWeight": 28.014},
                    "3": {"chemicalFormula": "H2O", "altName": "Water", "molecularWeight": 18.015},
                    "101": {"chemicalFormula": "CH4", "altName": "Methane", "molecularWeight": 16.043},
                    "5": {"chemicalFormula": "Hg", "altName": "Mercury", "molecularWeight": 200.59},
                },
            }
        }
