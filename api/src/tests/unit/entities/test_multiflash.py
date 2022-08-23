from timeit import default_timer as timer

import numpy as np
import pytest

from entities.Multiflash import Multiflash, MultiflashResult


def test_multiflash_init():
    multiflash = Multiflash(
        number_of_components=5,
        component_ids=[1, 2, 3, 4, 1001],
        temperature=9001,
        pressure=9001,
        composition=[0.1, 0.2, 0.3, 0.4, 0.5],
    )
    assert multiflash.number_of_components == 5
    assert multiflash.component_ids == [1, 2, 3, 4, 1001]
    assert multiflash.temperature > 9000
    assert multiflash.pressure > 9000
    assert multiflash.composition == [0.1, 0.2, 0.3, 0.4, 0.5]


def test_multiflash_from_dict():
    init_dict = {
        "number_of_components": 5,
        "component_ids": [1, 2, 3, 4, 1001],
        "temperature": 9001,
        "pressure": 9001,
        "composition": [0.1, 0.2, 0.3, 0.4, 0.5],
    }
    multiflash = Multiflash(**init_dict)
    assert multiflash.number_of_components == 5
    assert multiflash.component_ids == [1, 2, 3, 4, 1001]
    assert multiflash.temperature > 9000
    assert multiflash.pressure > 9000
    assert multiflash.composition == [0.1, 0.2, 0.3, 0.4, 0.5]


def test_multiflash_comparison():
    init_dict = {
        "number_of_components": 5,
        "component_ids": [1, 2, 3, 4, 1001],
        "temperature": 9001,
        "pressure": 9001,
        "composition": [0.1, 0.2, 0.3, 0.4, 0.5],
    }
    multiflash_1 = Multiflash(**init_dict)
    multiflash_2 = Multiflash(**init_dict)
    assert multiflash_1 == multiflash_2


@pytest.mark.skip(reason="Wait for test data")
@pytest.mark.parametrize("get_test_data", ["multiflash"], indirect=True)
def test_multiflash_compute(get_test_data):
    multiflash_input, multiflash_output = get_test_data
    multiflash = Multiflash(**multiflash_input)

    print("\nComputing multiflash:")
    start = timer()
    multiflash_result: MultiflashResult = multiflash.compute()
    print(f"Multiflash finished: {timer() - start}")

    assert np.allclose(multiflash_result.ph_frac, np.array(multiflash_output["ph_frac"]))
    assert np.allclose(multiflash_result.moles, np.array(multiflash_output["moles"]))
