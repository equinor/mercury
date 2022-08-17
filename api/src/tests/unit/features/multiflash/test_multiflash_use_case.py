import numpy as np
import pytest

from entities.Multiflash import Multiflash
from features.multiflash.multiflash_use_case import (
    MultiflashResponse,
    compute_multiflash_use_case,
)


@pytest.mark.parametrize("get_test_data", ["multiflash"], indirect=True)
def test_compute_multiflash_use_case(get_test_data):
    multiflash_input, multiflash_output = get_test_data
    multiflash = Multiflash(**multiflash_input)
    response: MultiflashResponse = compute_multiflash_use_case(multiflash)
    assert np.allclose(response.ph_frac, multiflash_output["ph_frac"])
    assert np.allclose(response.moles, multiflash_output["moles"])
