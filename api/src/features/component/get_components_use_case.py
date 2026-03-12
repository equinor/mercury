from common.components import COMPONENTS
from common.metrics import metrics
from common.telemetry import tracer
from features.component.component_response_model import ComponentResponse


@tracer.start_as_current_span("get_components_use_case")
def get_components_use_case() -> ComponentResponse:
    """Get components."""
    metrics.increase_fetch_components_count()
    return ComponentResponse.from_dictionary(COMPONENTS)
