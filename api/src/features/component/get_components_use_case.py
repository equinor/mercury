from common.components import COMPONENTS
from common.telemetry import tracer
from features.component.component_response_model import ComponentResponse


@tracer.start_as_current_span("get_components_use_case")
def get_components_use_case() -> ComponentResponse:
    """Get components."""
    return ComponentResponse.from_dictionary(COMPONENTS)
