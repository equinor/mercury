from pydantic import ConfigDict, Field

from common.base_model_wrapper import BaseModelWrapper
from entities.component_properties import ComponentProperties


class ComponentResponse(BaseModelWrapper):
    """
    Model for containing the response of getting the component dictionary.
    """

    components: dict[str, ComponentProperties] = Field(
        ...,
        description="Dictionary of component_ids as string and ComponentProperties as value",
    )

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "components": {
                    "1": {"chemicalFormula": "CO2", "altName": "Carbon Dioxide", "molecularWeight": 44.01},
                    "2": {"chemicalFormula": "N2", "altName": "Nitrogen", "molecularWeight": 28.014},
                    "3": {"chemicalFormula": "H2O", "altName": "Water", "molecularWeight": 18.015},
                    "101": {"chemicalFormula": "CH4", "altName": "Methane", "molecularWeight": 16.043},
                    "5": {"chemicalFormula": "Hg", "altName": "Mercury", "molecularWeight": 200.59},
                },
            }
        },
    )
