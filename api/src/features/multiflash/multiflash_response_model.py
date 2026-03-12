from typing import Self

from pydantic import ConfigDict, Field

from common.base_model_wrapper import BaseModelWrapper
from common.utils.enums import PhaseLabels
from common.utils.tuples import MultiflashResult


class MultiflashResponse(BaseModelWrapper):
    phase_values: dict[PhaseLabels, dict[str, float]] = Field(
        ...,
        description="Phase labels (vapor, liquid, aqueous, mercury) with "
        "their fraction of unity and mercury concentration",
    )
    component_fractions: dict[str, list[float]] = Field(
        ...,
        description="Mole fractions of each of the components (Note: mass is discarded from MultiflashResult)",
    )
    feed_fractions: dict[str, float] = Field(
        ..., description="Ratio of components in the feed (guaranteed to sum to 1)"
    )

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "phaseValues": {
                    "Mercury": {"percentage": 0.13710670215621407, "mercury": 1000000000},
                    "Vapor": {"percentage": 0.5923732280108018, "mercury": 3426.2630579508586},
                    "Aqueous": {"percentage": 0.2705200698329841, "mercury": 82.76725027120922},
                },
                "componentFractions": {
                    "1": [3.153640195684568e-23, 0.17798810356465122, 0.001283168757794131],
                    "2": [8.232685472278065e-23, 0.42824009015281783, 0.00007363513673381724],
                    "3": [6.089783280850285e-25, 0.0035486377271550557, 0.9984849101778882],
                    "5": [1.0000000000000002, 4.038754670974074e-7, 7.447270506156235e-9],
                    "101": [7.260898200622709e-23, 0.390222764679909, 0.00015827848031333905],
                },
                "feedFractions": {"1": 0.1057, "2": 0.2535, "3": 0.2720, "101": 0.23102, "5": 0.137},
            }
        },
    )

    @classmethod
    def from_results(cls, multiflash_results: MultiflashResult) -> Self:
        # convert phase_values to dictionary
        new_phase_values = {label: value._asdict() for label, value in multiflash_results.phase_values.items()}
        # convert component_fraction to dictionary with lists (not numpy arrays):
        new_component_fractions = {
            component_id: multiflash_results.component_fractions[component_id].moles.tolist()
            for component_id in multiflash_results.component_fractions
        }
        # feed fractions to dictionary:
        new_feed_fractions = dict(
            zip(multiflash_results.component_fractions.keys(), multiflash_results.feed_fractions, strict=False)
        )
        return cls(
            phase_values=new_phase_values,
            component_fractions=new_component_fractions,
            feed_fractions=new_feed_fractions,
        )
