import numpy as np
import pytest

from entities.Multiflash import Multiflash
from features.multiflash.multiflash_use_case import (
    MultiflashResponse,
    compute_multiflash_use_case,
)


@pytest.mark.parametrize("get_multiflash_test_data", ["multiflash"], indirect=True)
def test_compute_multiflash_use_case(get_multiflash_test_data):
    multiflash_input, multiflash_output = get_multiflash_test_data
    multiflash = Multiflash(**multiflash_input)
    response: MultiflashResponse = compute_multiflash_use_case(multiflash)

    assert list(multiflash_output["phases"].keys()) == [str(x.value) for x in response.phase_labels]
    assert np.allclose(list(multiflash_output["phases"].values()), response.phase_fractions)
    for component_id in response.moles.keys():
        assert np.allclose(response.moles[component_id], multiflash_output["moles"][component_id])
