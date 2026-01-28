from fastapi import APIRouter


def get_authenticated_routes() -> APIRouter:
    """Return authenticated routes."""
    from features.component import component_feature
    from features.multiflash import multiflash_feature
    from features.whoami import whoami_feature

    authenticated_routes = APIRouter(tags=["mercury"])
    authenticated_routes.include_router(whoami_feature.router)
    authenticated_routes.include_router(multiflash_feature.router)
    authenticated_routes.include_router(component_feature.router)
    return authenticated_routes


def get_public_routes() -> APIRouter:
    """Return public routes."""
    from features.health_check import health_check_feature
    from features.metrics import metrics_feature

    public_routes = APIRouter()
    public_routes.include_router(health_check_feature.router)
    public_routes.include_router(metrics_feature.router)
    return public_routes
