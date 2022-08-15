import uuid

from entities.Multiflash import Multiflash


def test_multiflash_init():
    multiflash = Multiflash(
        number_of_components=20,
        component_ids=[1, 2, 3, 4, 5],
        temperature=9001,
        pressure=9001,
        composition=[1, 2, 3, 4, 5],
    )
    assert multiflash.number_of_components == 20
    assert multiflash.component_ids == [1, 2, 3, 4, 5]
    assert multiflash.temperature > 9000
    assert multiflash.pressure > 9000
    assert multiflash.composition == [1, 2, 3, 4, 5]


def test_multiflash_from_dict():
    init_dict = {
        "number_of_components": 20,
        "component_ids": [1, 2, 3, 4, 5],
        "temperature": 9001,
        "pressure": 9001,
        "composition": [1, 2, 3, 4, 5],
    }
    multiflash = Multiflash.from_dict(init_dict)
    assert multiflash.number_of_components == 20
    assert multiflash.component_ids == [1, 2, 3, 4, 5]
    assert multiflash.temperature > 9000
    assert multiflash.pressure > 9000
    assert multiflash.composition == [1, 2, 3, 4, 5]


def test_multiflash_from_dict_alternative():
    init_dict = {
        "number_of_components": 20,
        "component_ids": [1, 2, 3, 4, 5],
        "temperature": 9001,
        "pressure": 9001,
        "composition": [1, 2, 3, 4, 5],
    }
    multiflash = Multiflash(**init_dict)
    assert multiflash.number_of_components == 20
    assert multiflash.component_ids == [1, 2, 3, 4, 5]
    assert multiflash.temperature > 9000
    assert multiflash.pressure > 9000
    assert multiflash.composition == [1, 2, 3, 4, 5]


def test_multiflash_comparison():
    init_dict = {
        "number_of_components": 20,
        "component_ids": [1, 2, 3, 4, 5],
        "temperature": 9001,
        "pressure": 9001,
        "composition": [1, 2, 3, 4, 5],
    }
    multiflash_1 = Multiflash.from_dict(init_dict)
    multiflash_2 = Multiflash.from_dict(init_dict)
    assert multiflash_1 == multiflash_2
