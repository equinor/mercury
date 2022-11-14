from starlette.status import HTTP_200_OK

from common.components import COMPONENTS
from entities.ComponentResponse import ComponentProperties


def test_components_feature(test_app):
    response = test_app.get("/components")
    results = response.json()
    components = results["components"]
    # using sets as sets do not care about ordering
    assert set(components.keys()) == set(COMPONENTS.keys())
    for key, value in components.items():
        assert value == ComponentProperties(**COMPONENTS[key]).dict(by_alias=True)
    assert response.status_code == HTTP_200_OK
