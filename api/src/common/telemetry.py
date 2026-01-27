from opentelemetry import trace
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import ConsoleSpanExporter, SimpleSpanProcessor

from config import config

# Creates a tracer from the global tracer provider
# If APPINSIGHTS_CONSTRING is not set, the tracer will log to console
if not config.APPLICATIONINSIGHTS_CONNECTION_STRING:
    trace_provider = TracerProvider()
    trace_provider.add_span_processor(SimpleSpanProcessor(ConsoleSpanExporter()))
    trace.set_tracer_provider(trace_provider)
tracer = trace.get_tracer("tracer.global")
