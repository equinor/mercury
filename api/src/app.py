from fastapi import FastAPI, Security
from starlette.middleware import Middleware

from authentication.authentication import auth_with_jwt
from common.middleware import LocalLoggerMiddleware
from config import config
from features.get_routes import get_authenticated_routes, get_public_routes

APP_TITLE = "Mercury"
APP_REPOSITORY_URL = "https://github.com/equinor/mercury"


def create_app() -> FastAPI:
    app = FastAPI(
        title=APP_TITLE,
        version="1.1.8",  # x-release-please-version
        description=_get_description_md(),
        middleware=[Middleware(LocalLoggerMiddleware)],  # type: ignore
        license_info=_get_license_info(),
        swagger_ui_init_oauth=_get_swagger_ui_init_oauth(),
    )

    if config.has_applicationinsight_connection_string:
        from azure.monitor.opentelemetry import configure_azure_monitor
        from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

        configure_azure_monitor(connection_string=config.get_applicationinsight_connection_string(), logger_name="API")
        FastAPIInstrumentor.instrument_app(app, excluded_urls="healthcheck")

    app.include_router(get_authenticated_routes(), dependencies=[Security(auth_with_jwt)])
    app.include_router(get_public_routes())

    return app


def _get_license_info() -> dict[str, str]:
    """Return license info."""
    return {
        "name": "MIT",
        "url": f"{APP_REPOSITORY_URL}/blob/main/LICENSE.md",
    }


def _get_description_md() -> str:
    """Return description markdown text."""
    return """
### Description
Mercury Calculator.

Anyone in Equinor are authorized to use the API.
 * Click **Authorize** to login and start testing.

### Resources
 * [Github](https://github.com/equinor/mercury)

 For questions about usage or expanding the API, create issue on Github or see docs.
"""


def _get_swagger_ui_init_oauth() -> dict[str, bool | str]:
    """Return swagger ui init oauth."""
    return {
        "clientId": config.AZURE_CLIENT_ID,
        "appName": "Mercury",
        "usePkceWithAuthorizationCodeGrant": True,
        "scopes": config.OAUTH_AUTH_SCOPE,
        "useBasicAuthenticationWithAccessCodeGrant": True,
    }
