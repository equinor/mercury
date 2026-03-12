from pydantic import ConfigDict, Field

from common.base_model_wrapper import BaseModelWrapper


class ComponentProperties(BaseModelWrapper):
    """
    Model containing properties of the component: I.e. the chemical name (H2O, Hg, etc.), the alternate name for a
    component (water, mercury, etc.) and the molecular weight of the component.
    """

    chemical_formula: str = Field(..., description="Chemical name of the component")
    alt_name: str = Field(..., description="Alternate name of the component")
    molecular_weight: float = Field(..., description="Molecular weight of the component (g/mol)")

    model_config = ConfigDict(
        json_schema_extra={"example": {"chemicalFormula": "Hg", "altName": "Mercury", "molecularWeight": 200.59}},
    )
