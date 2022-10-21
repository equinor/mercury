import numpy as np
import pytest
from starlette.status import HTTP_200_OK
from test_data.multiflash_data import MultiflashFeatureOutput, MultiflashInput


@pytest.mark.parametrize(
    "multiflash_input, multiflash_expected_output",
    [
        (MultiflashInput.case_1, MultiflashFeatureOutput.case_1),
        (MultiflashInput.case_2, MultiflashFeatureOutput.case_2),
        (MultiflashInput.case_3, MultiflashFeatureOutput.case_3),
    ],
)
def test_compute_multiflash_feature(test_app, multiflash_input: dict, multiflash_expected_output: dict):
    response = test_app.post("/api/v1/multiflash", json=multiflash_input)
    results = response.json()

    assert response.status_code == HTTP_200_OK
    assert results["componentIds"] == multiflash_expected_output["componentIds"]
    assert results["phases"] == multiflash_expected_output["phases"]

    computed_phase_values = results["phaseValues"]
    for label, expected_values in multiflash_expected_output["phaseValues"].items():
        assert np.isclose(computed_phase_values[label]["ratio"], expected_values["ratio"])
        assert np.isclose(
            computed_phase_values[label]["mercuryConcentration"], expected_values["mercuryConcentration"]
        )
        assert np.allclose(
            computed_phase_values[label]["moleFractions"],
            expected_values["moleFractions"],
            rtol=1e-3,
        )
