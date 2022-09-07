from timeit import default_timer as timer

import numpy as np
import pytest

from entities.Multiflash import Multiflash, MultiflashResult


def test_multiflash_init():
    multiflash = Multiflash(
        component_composition={"1": 0.1, "2": 0.2, "3": 0.3, "4": 0.2, "1001": 0.2},
        temperature=9001,
        pressure=9001,
    )
    assert multiflash.number_of_components == 5
    assert multiflash.component_ids == ["1", "2", "3", "4", "1001"]
    assert multiflash.temperature > 9000
    assert multiflash.pressure > 9000
    assert multiflash.feed_composition == [0.1, 0.2, 0.3, 0.2, 0.2]


def test_multiflash_from_dict():
    init_dict = {
        "component_composition": {"1": 0.1, "2": 0.2, "3": 0.3, "4": 0.2, "1001": 0.2},
        "temperature": 9001,
        "pressure": 9001,
    }
    multiflash = Multiflash(**init_dict)
    assert multiflash.number_of_components == 5
    assert multiflash.component_ids == ["1", "2", "3", "4", "1001"]
    assert multiflash.temperature > 9000
    assert multiflash.pressure > 9000
    assert multiflash.feed_composition == [0.1, 0.2, 0.3, 0.2, 0.2]


def test_multiflash_comparison():
    init_dict = {
        "component_composition": {"1": 0.1, "2": 0.2, "3": 0.3, "4": 0.2, "1001": 0.2},
        "temperature": 9001,
        "pressure": 9001,
    }
    multiflash_1 = Multiflash(**init_dict)
    multiflash_2 = Multiflash(**init_dict)
    assert multiflash_1 == multiflash_2


@pytest.mark.parametrize("get_multiflash_test_data", ["multiflash"], indirect=True)
def test_multiflash_compute(get_multiflash_test_data):
    multiflash_input, multiflash_output = get_multiflash_test_data
    multiflash = Multiflash(**multiflash_input)

    print("\nComputing multiflash:")
    start = timer()
    multiflash_result: MultiflashResult = multiflash.compute()
    print(f"Multiflash finished: {timer() - start}")

    assert list(multiflash_result.phase_label) == list(multiflash_output["phases"].keys())
    assert np.allclose(multiflash_result.phase_fraction, list(multiflash_output["phases"].values()))
    for component_id in multiflash_result.moles.keys():
        assert np.allclose(multiflash_result.moles[component_id], multiflash_output["moles"][component_id])
