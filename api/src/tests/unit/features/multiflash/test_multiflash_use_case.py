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
    assert [x.value for x in response.phase_label] == multiflash_output["phase_labels"]
    assert np.allclose(response.phase_fraction, multiflash_output["phase_fraction"])
    assert np.allclose(response.moles, multiflash_output["moles"])
