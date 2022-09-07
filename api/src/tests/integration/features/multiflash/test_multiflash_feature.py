import numpy as np
import pytest
from starlette.status import HTTP_200_OK

pytestmark = pytest.mark.integration


@pytest.mark.parametrize("get_multiflash_test_data", ["multiflash"], indirect=True)
def test_compute_multiflash_feature(test_app, get_multiflash_test_data):
    multiflash_input, multiflash_output = get_multiflash_test_data
    response = test_app.post("/api/v1/multiflash", json=multiflash_input)
    results = response.json()

    assert response.status_code == HTTP_200_OK
    assert list(results["phases"].keys()) == list(multiflash_output["phases"].keys())
    assert np.allclose(list(results["phases"].values()), list(multiflash_output["phases"].values()))
    for component_id in results["moles"].keys():
        assert np.allclose(results["moles"][component_id], multiflash_output["moles"][component_id])
