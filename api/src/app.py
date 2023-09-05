import click
import uvicorn
from fastapi import APIRouter, FastAPI, Security
from starlette.middleware import Middleware
from starlette.responses import RedirectResponse

from authentication.authentication import auth_with_jwt
from common.middleware import OpenCensusRequestLoggingMiddleware, TimerHeaderMiddleware
from config import config
from features.component import component_feature
from features.health_check import health_check_feature
from features.metrics import metrics_feature
from features.multiflash import multiflash_feature
from features.whoami import whoami_feature


def create_app() -> FastAPI:
    public_routes = APIRouter()
    public_routes.include_router(health_check_feature.router)
    public_routes.include_router(metrics_feature.router)

    authenticated_routes = APIRouter(tags=["mercury"])
    authenticated_routes.include_router(whoami_feature.router)
    authenticated_routes.include_router(multiflash_feature.router)
    authenticated_routes.include_router(component_feature.router)
    app = FastAPI(title="Mercury", description="", version="1.0.0")  # x-release-please-version
    app.include_router(authenticated_routes, dependencies=[Security(auth_with_jwt)])
    app.include_router(public_routes)

    middleware = [Middleware(TimerHeaderMiddleware)]

    if config.APPINSIGHTS_CONSTRING:
        middleware.append(Middleware(OpenCensusRequestLoggingMiddleware))
        print("################ INFO ################")
        print("#  Azure AppInsight logging enabled  #")
        print("################ INFO ################")

    @app.get("/", operation_id="redirect_to_docs", response_class=RedirectResponse, include_in_schema=False)
    def redirect_to_docs():
        """
        Redirects any requests to the servers root ('/') to '/docs'
        """
        return RedirectResponse(url="/docs")

    return app


@click.group()
def cli():
    pass


@cli.command()
def run():
    uvicorn.run(
        "app:create_app",
        host="0.0.0.0",  # nosec
        port=5000,
        reload=config.ENVIRONMENT == "local",
        log_level=config.LOGGER_LEVEL.lower(),
    )


if __name__ == "__main__":
    cli()  # run commands in cli() group
