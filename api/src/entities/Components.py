from enum import Enum
from typing import Any, Dict, List

from pydantic import BaseModel, Field


class ComponentProperties(BaseModel):
    """Model for the properties of a component"""

    chemical_formula: str = Field(..., description="Chemical name of the component", alias="chemicalFormula")
    alt_name: str = Field(..., description="Alternate name of the component", alias="altName")
    molecular_weight: float = Field(..., description="Molecular weight of the component", alias="molecularWeight")

    class Config:
        allow_population_by_field_name = True
        schema_extra = {"example": {"chemicalFormula": "Hg", "altName": "Mercury", "molecularWeight": 200.59}}


class Components(BaseModel):
    """Model for all components supported by mercury app"""

    id_1: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="CO2", alt_name="Carbondioxide", molecular_weight=44.01),
        alias="id1",
    )
    id_2: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="N2", alt_name="Nitrogen", molecular_weight=28.014), alias="id2"
    )
    id_3: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="H2O", alt_name="Water", molecular_weight=18.015), alias="id3"
    )
    id_4: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="H2S", alt_name="Hydrogensulfide", molecular_weight=34.082),
        alias="id4",
    )
    id_5: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="Hg", alt_name="Mercury", molecular_weight=200.59), alias="id5"
    )
    id_101: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="CH4", alt_name="Methane", molecular_weight=16.043), alias="id101"
    )
    id_201: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="C2H6", alt_name="Ethane", molecular_weight=30.07), alias="id201"
    )
    id_301: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="nC3", alt_name="Propane", molecular_weight=44.096), alias="id301"
    )
    id_401: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="iC4", alt_name="i-Butane", molecular_weight=58.123),
        alias="id401",
    )
    id_402: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="nC4", alt_name="n-Butane", molecular_weight=58.123),
        alias="id402",
    )
    id_501: ComponentProperties = Field(
        default=ComponentProperties(
            chemical_formula="22-dm-C3", alt_name="2-2-dimethyl-propane", molecular_weight=72.15
        ),
        alias="id501",
    )
    id_503: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="iC5", alt_name="i-Pentane", molecular_weight=70.134),
        alias="id503",
    )
    id_504: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="nC5", alt_name="n-Pentane", molecular_weight=72.15),
        alias="id504",
    )
    id_502: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="cy-C5", alt_name="Cy-C5", molecular_weight=72.15), alias="id502"
    )
    id_601: ComponentProperties = Field(
        default=ComponentProperties(
            chemical_formula="22-dm-C4", alt_name="2-2-dimethyl-butane(neohexane)", molecular_weight=86.177
        ),
        alias="id601",
    )
    id_602: ComponentProperties = Field(
        default=ComponentProperties(
            chemical_formula="23-dm-C4", alt_name="2-3-dimethyl-butane", molecular_weight=86.177
        ),
        alias="id602",
    )
    id_603: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="2-m-C5", alt_name="2-methyl-pentane", molecular_weight=86.177),
        alias="id603",
    )
    id_604: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="3-m-C5", alt_name="3-methyl-pentane", molecular_weight=86.177),
        alias="id604",
    )
    id_605: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="nC6", alt_name="n-Hexane", molecular_weight=86.177),
        alias="id605",
    )
    id_606: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="cy-C6", alt_name="Cy-hexane", molecular_weight=84.161),
        alias="id606",
    )
    id_608: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="Benzene", alt_name="Benzene", molecular_weight=78.114),
        alias="id608",
    )
    id_701: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="nC7", alt_name="n-heptane", molecular_weight=100.204),
        alias="id701",
    )
    id_707: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="cy-C7", alt_name="Cy-heptane", molecular_weight=98.188),
        alias="id707",
    )
    id_710: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="Toluene", alt_name="Toluene", molecular_weight=92.141),
        alias="id710",
    )
    id_801: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="nC8", alt_name="n-octane", molecular_weight=114.231),
        alias="id801",
    )
    id_806: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="cy-C8", alt_name="Cy-octane", molecular_weight=112.215),
        alias="id806",
    )
    id_809: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="m-xylene", alt_name="M-xylene", molecular_weight=106.167),
        alias="id809",
    )
    id_901: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="nC9", alt_name="n-nonane", molecular_weight=128.258),
        alias="id901",
    )
    id_1016: ComponentProperties = Field(
        default=ComponentProperties(chemical_formula="nC10", alt_name="n-decane", molecular_weight=142.285),
        alias="id1016",
    )

    class Config:
        allow_population_by_field_name = True
        allow_mutation = False

        @staticmethod
        def schema_extra(schema: Dict[str, Any]) -> None:
            schema["example"] = {}
            schema["example"]["id1"] = {"chemicalFormula": "CO2", "altName": "Carbondioxide", "molecularWeight": 44.01}
            schema["example"]["id2"] = {"chemicalFormula": "N2", "altName": "Nitrogen", "molecularWeight": 28.014}
            schema["example"]["id3"] = {"chemicalFormula": "H2O", "altName": "Water", "molecularWeight": 18.015}
            schema["example"]["id4"] = {
                "chemicalFormula": "H2S",
                "altName": "Hydrogensulfide",
                "molecularWeight": 34.082,
            }
            schema["example"]["id5"] = {"chemicalFormula": "Hg", "altName": "Mercury", "molecularWeight": 200.59}
            schema["required"] = list(Components().dict(by_alias=True).keys())

    def __getitem__(self, item: str) -> ComponentProperties:
        """Return entry from field key.

        Supports both alias and regular key as input.
        """
        if "_" in item:
            return ComponentProperties(**self.dict()[item])
        else:
            return ComponentProperties(**self.dict(by_alias=True)[item])

    def get_ids(self) -> List[str]:
        """Return all ids by alias"""
        return list(self.dict(by_alias=True).keys())

    def get_ids_as_ints(self) -> List[str]:
        """Return all ids without id prefix"""
        return [x.split("_")[-1] for x in self.dict().keys()]


# Enum of component ids.
class ComponentIds(str, Enum):
    """Enum containing all component ids"""

    id_1 = "id1"
    id_2 = "id2"
    id_3 = "id3"
    id_4 = "id4"
    id_5 = "id5"
    id_101 = "id101"
    id_201 = "id201"
    id_301 = "id301"
    id_401 = "id401"
    id_402 = "id402"
    id_501 = "id501"
    id_503 = "id503"
    id_504 = "id504"
    id_502 = "id502"
    id_601 = "id601"
    id_602 = "id602"
    id_603 = "id603"
    id_604 = "id604"
    id_605 = "id605"
    id_606 = "id606"
    id_608 = "id608"
    id_701 = "id701"
    id_707 = "id707"
    id_710 = "id710"
    id_801 = "id801"
    id_806 = "id806"
    id_809 = "id809"
    id_901 = "id901"
    id_1016 = "id1016"
