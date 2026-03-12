from common.telemetry import tracer
from entities.multiflash import (
    Multiflash,
    MultiflashResult,
)
from features.multiflash.multiflash_response_model import MultiflashResponse


@tracer.start_as_current_span("compute_multiflash_use_case")
def compute_multiflash_use_case(multiflash: Multiflash) -> MultiflashResponse:
    """Compute multiflash."""
    multiflash_result: MultiflashResult = multiflash.compute()
    return MultiflashResponse.from_results(multiflash_result)
