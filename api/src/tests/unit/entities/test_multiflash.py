from timeit import default_timer as timer

import pytest
from pydantic import ValidationError
from test_data.multiflash_data import MultiflashEntityOutput, MultiflashInput

from entities.Multiflash import Multiflash, MultiflashResult


def test_multiflash_init():
    multiflash = Multiflash(
        component_composition={"1": 0.1, "2": 0.2, "3": 0.3, "4": 0.2, "101": 0.2},
        temperature=9001,
        pressure=9001,
    )
    assert multiflash.number_of_components == 5
    assert multiflash.component_ids == ["1", "2", "3", "4", "101"]
    assert multiflash.temperature > 9000
    assert multiflash.pressure > 9000
    assert multiflash.feed_composition == [0.1, 0.2, 0.3, 0.2, 0.2]


def test_multiflash_from_dict():
    init_dict = {
        "component_composition": {"1": 0.1, "2": 0.2, "3": 0.3, "4": 0.2, "101": 0.2},
        "temperature": 9001,
        "pressure": 9001,
    }
    multiflash = Multiflash(**init_dict)
    assert multiflash.number_of_components == 5
    assert multiflash.component_ids == ["1", "2", "3", "4", "101"]
    assert multiflash.temperature > 9000
    assert multiflash.pressure > 9000
    assert multiflash.feed_composition == [0.1, 0.2, 0.3, 0.2, 0.2]


def test_multiflash_comparison():
    init_dict = {
        "component_composition": {"1": 0.1, "2": 0.2, "3": 0.3, "4": 0.2, "101": 0.2},
        "temperature": 9001,
        "pressure": 9001,
    }
    multiflash_1 = Multiflash(**init_dict)
    multiflash_2 = Multiflash(**init_dict)
    assert multiflash_1 == multiflash_2


def test_multiflash_invalid_id():
    init_dict = {
        "component_composition": {"1": 0.1, "2": 0.2, "3": 0.3, "4": 0.2, "1001": 0.2},
        "temperature": 9001,
        "pressure": 9001,
    }
    with pytest.raises(ValidationError):
        Multiflash(**init_dict)


@pytest.mark.parametrize(
    "multiflash_input, multiflash_expected_result",
    [
        (MultiflashInput.case_1, MultiflashEntityOutput.case_1),
        (MultiflashInput.case_2, MultiflashEntityOutput.case_2),
        (MultiflashInput.case_3, MultiflashEntityOutput.case_3),
    ],
)
def test_multiflash_compute(multiflash_input: dict, multiflash_expected_result: MultiflashResult):
    multiflash = Multiflash(**multiflash_input)

    print("\nComputing multiflash:")
    start = timer()
    multiflash_result: MultiflashResult = multiflash.compute()
    print(f"Multiflash finished: {timer() - start}")
    assert multiflash_result == multiflash_expected_result
