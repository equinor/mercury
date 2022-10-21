from starlette.status import HTTP_200_OK

from entities.Components import Components


def test_components_feature(test_app):
    response = test_app.get("/api/v1/components")
    results = response.json()
    components = results["components"]
    # using sets as sets do not care about ordering
    assert set(components.keys()) == set(Components().get_ids())
    for key, value in components.items():
        assert value == Components().dict(by_alias=True)[key]
    assert response.status_code == HTTP_200_OK
