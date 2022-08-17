from timeit import default_timer as timer

import numpy as np
import pytest

from entities.Chemeq import Chemeq, ChemeqResult


def test_chemeq_init():
    chemeq = Chemeq(
        number_of_components=3,
        number_of_reactions=2,
        component_ids=[1, 2, 3],
        feed_composition=[0.1, 0.2, 0.3],
        formula_matrix=[[1, 0, 0]],
        stoichiometric_matrix=[[0, 0, 1], [1, 0, -1]],
    )
    assert chemeq.number_of_components == 3
    assert chemeq.number_of_reactions == 2
    assert chemeq.component_ids == [1, 2, 3]
    assert chemeq.feed_composition == [0.1, 0.2, 0.3]
    assert chemeq.formula_matrix == [[1, 0, 0]]
    assert chemeq.stoichiometric_matrix == [[0, 0, 1], [1, 0, -1]]


def test_chemeq_from_dict():
    init_dict = {
        "number_of_components": 3,
        "number_of_reactions": 2,
        "component_ids": [1, 2, 3],
        "feed_composition": [0.1, 0.2, 0.3],
        "formula_matrix": [[1, 0, 0]],
        "stoichiometric_matrix": [[0, 0, 1], [1, 0, -1]],
    }
    chemeq = Chemeq(**init_dict)
    assert chemeq.number_of_components == 3
    assert chemeq.number_of_reactions == 2
    assert chemeq.component_ids == [1, 2, 3]
    assert chemeq.feed_composition == [0.1, 0.2, 0.3]
    assert chemeq.formula_matrix == [[1, 0, 0]]
    assert chemeq.stoichiometric_matrix == [[0, 0, 1], [1, 0, -1]]


def test_chemeq_comparison():
    init_dict = {
        "number_of_components": 3,
        "number_of_reactions": 2,
        "component_ids": [1, 2, 3],
        "feed_composition": [0.1, 0.2, 0.3],
        "formula_matrix": [[1, 0, 0]],
        "stoichiometric_matrix": [[0, 0, 1], [1, 0, -1]],
    }
    chemeq_1 = Chemeq(**init_dict)
    chemeq_2 = Chemeq(**init_dict)
    assert chemeq_1 == chemeq_2


@pytest.mark.parametrize("get_test_data", ["chemeq"], indirect=True)
def test_chemeq(get_test_data):
    chemeq_input, chemeq_output = get_test_data
    chemeq = Chemeq(**chemeq_input)
    print("\nComputing chemeq:")
    start = timer()
    chemeq_result: ChemeqResult = chemeq.compute()
    print(f"Chemeq finished: {timer() - start}")
    assert np.allclose(chemeq_result.ntot, np.array(chemeq_output["ntot"]))
    assert np.allclose(chemeq_result.ph_frac, np.array(chemeq_output["ph_frac"]))
    if not np.allclose(chemeq_result.moles, np.array(chemeq_output["moles"])):
        # print(f"chemeq_result.moles: \n{chemeq_result.moles}")
        # print(f"correct moles: \n{np.array(chemeq_output['moles'])}")
        # print(f"Difference matrix: \n{chemeq_result.moles - np.array(chemeq_output['moles'])}")
        assert False
    else:
        assert True
