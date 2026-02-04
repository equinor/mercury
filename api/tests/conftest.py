# Global fixtures can be defined in this file


import pytest

from config import config

_UNIT_TEST_MARKER = "unit"
_INTEGRATION_TEST_MARKER = "integration"


def pytest_configure(config: pytest.Config):
    """Add markers to be recognised by pytest."""
    config.addinivalue_line("markers", f"{_UNIT_TEST_MARKER}: mark test as unit test")
    config.addinivalue_line("markers", f"{_INTEGRATION_TEST_MARKER}: mark test as integration test")


def pytest_collection_modifyitems(config: pytest.Config, items: list[pytest.Item]):
    """Add markers to tests based on folder structure."""
    unit_test_directory = config.rootpath / "tests/unit"
    use_case_test_directory = config.rootpath / "tests/integration"

    for unit_test_item in filter(lambda item: item.path.is_relative_to(unit_test_directory), items):
        unit_test_item.add_marker(_UNIT_TEST_MARKER)

    for use_case_test_item in filter(lambda item: item.path.is_relative_to(use_case_test_directory), items):
        use_case_test_item.add_marker(_INTEGRATION_TEST_MARKER)


@pytest.fixture(autouse=True)
def disable_auth():
    config.AUTH_ENABLED = False
