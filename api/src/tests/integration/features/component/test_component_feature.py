import pytest
from starlette.status import HTTP_200_OK

from common.components import COMPONENT_IDS

pytestmark = pytest.mark.integration


def test_components_feature(test_app):
    response = test_app.get("/api/v1/components")
    results = response.json()
    # json turns ints to str, need to convert back for testing:
    # using sets as sets dont care about ordering
    assert {int(key) for key in results.keys()} == set(COMPONENT_IDS.keys())
    for key, value in results.items():
        assert value == COMPONENT_IDS[int(key)]
    assert response.status_code == HTTP_200_OK
