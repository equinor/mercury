from rich import print as rprint

from cli import __about__


def version_command() -> None:
    """Show Mercury application version."""
    rprint(__about__.__version__)
