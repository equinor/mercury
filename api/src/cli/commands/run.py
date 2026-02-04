import typer
import uvicorn
from rich import print as rich_print
from rich.console import Console

from common.environment import Environment
from config import config

err_console = Console(stderr=True)


def run_command() -> None:
    """Run application."""
    _validate_config()

    use_reload = config.ENVIRONMENT == Environment.LOCAL

    uvicorn.run(
        "app:create_app",
        factory=True,
        host="0.0.0.0",  # noqa: S104
        port=5000,
        reload=use_reload,
        log_level=config.LOGGER_LEVEL.lower(),
    )


_DISABLED_AUTH_WARNING = """
################ WARNING ################
#       Authentication is disabled      #
################ WARNING ################
"""


def _validate_config() -> None:
    """Validate config."""

    if not config.AUTH_ENABLED:
        rich_print(f"[bold yellow]{_DISABLED_AUTH_WARNING}[/bold yellow]")

    # validate that auth settings are consistent
    set_oauth_parameters = _get_set_authentication_parameters()
    if config.AUTH_ENABLED and False in set_oauth_parameters.values():
        unset_parameters = (f"'{param}'" for param, is_set in set_oauth_parameters.items() if not is_set)
        error_message = (
            f"Invalid config: Authentication was enabled ({config.AUTH_ENABLED=})"
            f", but config has unset authentication parameters: {', '.join(unset_parameters)}"
        )
        err_console.print(f"[bold red]{error_message}[/bold red]")
        raise typer.Exit(code=1)


def _get_set_authentication_parameters() -> dict[str, bool]:
    return {
        "OAUTH_AUDIENCE": config.OAUTH_AUDIENCE != "",
        "OAUTH_AUTH_SCOPE": config.OAUTH_AUTH_SCOPE != "",
        "OAUTH_AUTH_ENDPOINT": config.OAUTH_AUTH_ENDPOINT != "",
        "OAUTH_TOKEN_ENDPOINT": config.OAUTH_TOKEN_ENDPOINT != "",
        "OAUTH_WELL_KNOWN": config.OAUTH_WELL_KNOWN != "",
        "AZURE_CLIENT_ID": config.AZURE_CLIENT_ID != "",
    }
