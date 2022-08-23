import numpy as np
import pytest
from starlette.status import HTTP_200_OK

pytestmark = pytest.mark.integration


@pytest.mark.skip(reason="Wait for test data")
@pytest.mark.parametrize("get_test_data", ["multiflash"], indirect=True)
def test_compute_multiflash_feature(test_app, get_test_data):
    multiflash_input, multiflash_output = get_test_data
    response = test_app.post("/api/v1/multiflash", json=multiflash_input)
    results = response.json()

    assert response.status_code == HTTP_200_OK
    assert np.allclose(results["ph_frac"], multiflash_output["ph_frac"])
    assert np.allclose(results["moles"], multiflash_output["moles"])
