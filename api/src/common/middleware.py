import time
from typing import Any, Callable

from fastapi import Request
from opencensus.ext.azure.trace_exporter import AzureExporter
from opencensus.trace.attributes_helper import COMMON_ATTRIBUTES
from opencensus.trace.samplers import ProbabilitySampler
from opencensus.trace.span import SpanKind
from opencensus.trace.tracer import Tracer
from starlette.middleware.base import BaseHTTPMiddleware

from common.utils.logger import logger
from config import config


class TimerHeaderMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next: Callable) -> Any:
        start_time = time.time()
        response = await call_next(request)
        process_time = time.time() - start_time
        milliseconds = int(round(process_time * 1000))
        logger.info(f"{request.method} {request.url.path} - {milliseconds}ms - {response.status_code}")
        response.headers["X-Process-Time"] = str(process_time)
        return response


class OpenCensusRequestLoggingMiddleware(BaseHTTPMiddleware):
    exporter = AzureExporter(connection_string=config.APPINSIGHTS_CONSTRING) if config.APPINSIGHTS_CONSTRING else None
    sampler = ProbabilitySampler(1.0)

    async def dispatch(self, request: Request, call_next: Callable) -> Any:
        tracer = Tracer(exporter=self.exporter, sampler=self.sampler)
        with tracer.span("main") as span:
            span.span_kind = SpanKind.SERVER

            response = await call_next(request)

            tracer.add_attribute_to_current_span(
                attribute_key=COMMON_ATTRIBUTES["HTTP_STATUS_CODE"], attribute_value=response.status_code
            )
            tracer.add_attribute_to_current_span(
                attribute_key=COMMON_ATTRIBUTES["HTTP_URL"], attribute_value=str(request.url)
            )

        return response
