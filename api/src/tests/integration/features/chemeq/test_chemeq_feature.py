import numpy as np
import pytest
from starlette.status import HTTP_200_OK

pytestmark = pytest.mark.integration


@pytest.mark.skip(reason="Wait for test data")
@pytest.mark.parametrize("get_test_data", ["chemeq"], indirect=True)
def test_compute_chemeq_feature(test_app, get_test_data):
    chemeq_input, chemeq_output = get_test_data
    response = test_app.post("/api/v1/chemeq", json=chemeq_input)
    results = response.json()

    assert response.status_code == HTTP_200_OK
    assert np.allclose(results["ph_frac"], chemeq_output["ph_frac"])
    assert np.allclose(results["ntot"], chemeq_output["ntot"])
    assert np.allclose(results["moles"], chemeq_output["moles"])
