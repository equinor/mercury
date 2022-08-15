import uuid

from entities.Chemeq import Chemeq


def test_chemeq_init():
    chemeq = Chemeq(
        number_of_components=20,
        number_of_reactions=1,
        component_ids=[1, 2, 3, 4, 5],
        feed_composition=[1, 2, 3],
        formula_matrix=[[1, 0, 0], [0, 1, 0], [0, 0, 1]],
        stoichiometric_matrix=[[1, 0], [0, 1]],
    )
    assert chemeq.number_of_components == 20
    assert chemeq.number_of_reactions == 1
    assert chemeq.component_ids == [1, 2, 3, 4, 5]
    assert chemeq.feed_composition == [1, 2, 3]
    assert chemeq.formula_matrix == [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    assert chemeq.stoichiometric_matrix == [[1, 0], [0, 1]]


def test_chemeq_from_dict():
    init_dict = {
        "number_of_components": 20,
        "number_of_reactions": 1,
        "component_ids": [1, 2, 3, 4, 5],
        "feed_composition": [1, 2, 3],
        "formula_matrix": [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
        "stoichiometric_matrix": [[1, 0], [0, 1]],
    }
    chemeq = Chemeq.from_dict(init_dict)
    assert chemeq.number_of_components == 20
    assert chemeq.number_of_reactions == 1
    assert chemeq.component_ids == [1, 2, 3, 4, 5]
    assert chemeq.feed_composition == [1, 2, 3]
    assert chemeq.formula_matrix == [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    assert chemeq.stoichiometric_matrix == [[1, 0], [0, 1]]


def test_chemeq_from_dict_alternative():
    init_dict = {
        "number_of_components": 20,
        "number_of_reactions": 1,
        "component_ids": [1, 2, 3, 4, 5],
        "feed_composition": [1, 2, 3],
        "formula_matrix": [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
        "stoichiometric_matrix": [[1, 0], [0, 1]],
    }
    chemeq = Chemeq(**init_dict)
    assert chemeq.number_of_components == 20
    assert chemeq.number_of_reactions == 1
    assert chemeq.component_ids == [1, 2, 3, 4, 5]
    assert chemeq.feed_composition == [1, 2, 3]
    assert chemeq.formula_matrix == [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
    assert chemeq.stoichiometric_matrix == [[1, 0], [0, 1]]


def test_chemeq_comparison():
    init_dict = {
        "number_of_components": 20,
        "number_of_reactions": 1,
        "component_ids": [1, 2, 3, 4, 5],
        "feed_composition": [1, 2, 3],
        "formula_matrix": [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
        "stoichiometric_matrix": [[1, 0], [0, 1]],
    }
    chemeq_1 = Chemeq.from_dict(init_dict)
    chemeq_2 = Chemeq.from_dict(init_dict)
    assert chemeq_1 == chemeq_2
