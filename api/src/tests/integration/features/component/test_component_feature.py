from starlette.status import HTTP_200_OK

from common.components import COMPONENT_IDS
from features.component.component_use_case import ComponentName


def test_components_feature(test_app):
    response = test_app.get("/api/v1/components")
    results = response.json()
    # using sets as sets do not care about ordering
    assert {key for key in results.keys()} == set(COMPONENT_IDS.keys())
    for key, value in results.items():
        assert value == ComponentName(**COMPONENT_IDS[key]).dict(by_alias=True)
    assert response.status_code == HTTP_200_OK
