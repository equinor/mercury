# Global fixtures can be defined in this file


import pytest

from config import config


@pytest.fixture(autouse=True)
def disable_auth():
    config.AUTH_ENABLED = False


def pytest_addoption(parser):
    """
    Adds option flags to pytest:
        --integration: runs only integration tests
        --unit: runs unit tests
    """
    parser.addoption("--integration", action="store_true", help="run integration tests")
    parser.addoption("--unit", action="store_true", help="run unit tests")


def pytest_collection_modifyitems(config, items):
    """
    Collection modifier for passed options. If --integration is passed, only integration tests are run, similarly
    for --unit. No options mean all tests are run.
    """
    for item in items:
        if config.getoption("--integration"):
            if "integration" not in str(item.path):
                item.add_marker(
                    pytest.mark.skip(reason=f"--integration option is passed: {item.name} is not an integration test")
                )
        elif config.getoption("--unit"):
            if "unit" not in str(item.path):
                item.add_marker(pytest.mark.skip(reason=f"--unit option is passed: {item.name} is not a unit test"))
