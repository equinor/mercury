# Global fixtures can be defined in this file

import json
import os
from pathlib import Path

import pytest
from starlette.testclient import TestClient

from app import create_app
from config import config


@pytest.fixture(autouse=True)
def disable_auth():
    config.AUTH_ENABLED = False


@pytest.fixture(scope="module")
def test_app():
    os.environ["AUTH_ENABLED"] = "False"
    client = TestClient(app=create_app())
    yield client  # testing happens here


def pytest_addoption(parser):
    parser.addoption("--integration", action="store_true", help="run integration tests")


def pytest_runtest_setup(item):
    if "integration" in item.keywords and not item.config.getvalue("integration"):
        pytest.skip("need --integration option to run")


def read_json(filepath: str):
    with open(filepath, "r") as file:
        data = file.read()
    return json.loads(data)


@pytest.fixture(scope="module")
def get_test_data(request):
    function: str = request.param
    test_data_location: Path = Path("tests/test_data").resolve()
    test_input: dict = read_json(f"{test_data_location}/{function}_input")
    test_output: dict = read_json(f"{test_data_location}/{function}_output")
    return test_input, test_output
