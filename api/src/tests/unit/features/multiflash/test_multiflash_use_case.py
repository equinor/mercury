import numpy as np
import pytest

from entities.Multiflash import Multiflash
from features.multiflash.multiflash_use_case import (
    MultiflashResponse,
    compute_multiflash_use_case,
)
from tests.test_data.multiflash_data import MultiflashInput, MultiflashOutput


@pytest.mark.parametrize(
    "multiflash_input, multiflash_expected_output",
    [
        (MultiflashInput.case_1, MultiflashOutput.case_1),
        (MultiflashInput.case_2, MultiflashOutput.case_2),
        (MultiflashInput.case_3, MultiflashOutput.case_3),
    ],
)
def test_compute_multiflash_use_case(multiflash_input: dict, multiflash_expected_output: dict):
    multiflash = Multiflash(**multiflash_input)
    response: MultiflashResponse = compute_multiflash_use_case(multiflash)
    print(response)
    computed_phase_values = response.phase_values
    computed_component_fractions = response.component_fractions

    for label, expected_values in multiflash_expected_output["phase_values"].items():
        assert np.isclose(computed_phase_values[label]["percentage"], expected_values["percentage"])
        assert np.isclose(computed_phase_values[label]["mercury"], expected_values["mercury"])
    for component_id in multiflash_expected_output["component_fractions"].keys():
        assert np.allclose(
            computed_component_fractions[component_id],
            multiflash_expected_output["component_fractions"][component_id],
            rtol=1e-3,
        )
