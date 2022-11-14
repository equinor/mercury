import numpy as np
import pytest
from starlette.status import HTTP_200_OK
from test_data.multiflash_data import MultiflashInput, MultiflashOutput


@pytest.mark.parametrize(
    "multiflash_input, multiflash_expected_output",
    [
        (MultiflashInput.case_1, MultiflashOutput.case_1),
        (MultiflashInput.case_2, MultiflashOutput.case_2),
        (MultiflashInput.case_3, MultiflashOutput.case_3),
    ],
)
def test_compute_multiflash_feature(test_app, multiflash_input: dict, multiflash_expected_output: dict):
    response = test_app.post("/multiflash", json=multiflash_input)
    results = response.json()
    computed_phase_values = results["phaseValues"]
    computed_component_fractions = results["componentFractions"]

    assert response.status_code == HTTP_200_OK

    for label, expected_values in multiflash_expected_output["phase_values"].items():
        assert np.isclose(computed_phase_values[label]["percentage"], expected_values["percentage"])
        assert np.isclose(computed_phase_values[label]["mercury"], expected_values["mercury"])
    for component_id in multiflash_expected_output["component_fractions"].keys():
        assert np.allclose(
            computed_component_fractions[component_id],
            multiflash_expected_output["component_fractions"][component_id],
            rtol=1e-3,
        )
