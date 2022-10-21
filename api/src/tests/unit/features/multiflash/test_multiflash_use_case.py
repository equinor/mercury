import pytest

from entities.Multiflash import Multiflash
from features.multiflash.multiflash_use_case import (
    MultiflashResponse,
    compute_multiflash_use_case,
)
from tests.test_data.multiflash_data import MultiflashInput, MultiflashUseCaseOutput


@pytest.mark.parametrize(
    "multiflash_input, multiflash_expected_output",
    [
        (MultiflashInput.case_1, MultiflashUseCaseOutput.case_1),
        (MultiflashInput.case_2, MultiflashUseCaseOutput.case_2),
        (MultiflashInput.case_3, MultiflashUseCaseOutput.case_3),
    ],
)
def test_compute_multiflash_use_case(multiflash_input: dict, multiflash_expected_output: dict):
    multiflash = Multiflash(**multiflash_input)
    response: MultiflashResponse = compute_multiflash_use_case(multiflash)
    expected = MultiflashResponse(**multiflash_expected_output)
    assert response == expected
