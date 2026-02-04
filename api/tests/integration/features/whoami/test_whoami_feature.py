from collections.abc import Callable

import pytest
from starlette.status import HTTP_200_OK
from starlette.testclient import TestClient

from authentication.models import User
from config import config

pytestmark = pytest.mark.integration


class TestWhoami:
    def test_whoami(self, test_app: TestClient, test_user: User, get_mock_jwt_token: Callable[[User], str]):
        config.AUTH_ENABLED = True
        headers = {"Authorization": f"Bearer {get_mock_jwt_token(test_user)}"}
        response = test_app.get("/whoami", headers=headers)
        data = response.json()
        assert response.status_code == HTTP_200_OK
        assert data["roles"][0] == "a"
        assert data["user_id"] == "1"
