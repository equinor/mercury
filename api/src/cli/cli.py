import typer

cli = typer.Typer(
    help="CLI for Mercury application.",
    no_args_is_help=True,
    pretty_exceptions_show_locals=False,
)


@cli.command()
def run() -> None:
    """Run application."""
    from cli.commands.run import run_command

    run_command()


@cli.command()
def version() -> None:
    """Get version."""
    from cli.commands.version import version_command

    version_command()
