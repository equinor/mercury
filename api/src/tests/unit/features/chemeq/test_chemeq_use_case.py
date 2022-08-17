import numpy as np
import pytest

from entities.Chemeq import Chemeq
from features.chemeq.chemeq_use_case import ChemeqResponse, compute_chemeq_use_case


@pytest.mark.parametrize("get_test_data", ["chemeq"], indirect=True)
def test_compute_chemeq_use_case(get_test_data):
    chemeq_input, chemeq_output = get_test_data
    chemeq = Chemeq(**chemeq_input)
    response: ChemeqResponse = compute_chemeq_use_case(chemeq)

    assert np.allclose(response.ph_frac, chemeq_output["ph_frac"])
    assert np.allclose(response.ntot, chemeq_output["ntot"])
    assert np.allclose(response.moles, chemeq_output["moles"])
