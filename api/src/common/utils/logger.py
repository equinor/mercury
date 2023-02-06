"""
Setup API and Uvicorn logger.
"""

import logging

from opencensus.ext.azure.log_exporter import AzureLogHandler

from config import config

uvicorn_logger = logging.getLogger("uvicorn")

logger = logging.getLogger("API")
logger.setLevel(config.LOGGER_LEVEL.upper())
formatter = logging.Formatter("%(levelname)s:%(asctime)s %(message)s")
channel = logging.StreamHandler()
channel.setFormatter(formatter)
channel.setLevel(config.LOGGER_LEVEL.upper())
logger.addHandler(channel)

if config.APPINSIGHTS_CONSTRING:  # If an Azure AppInsight key was added, add a logHandler to export logs
    logger.addHandler(AzureLogHandler(connection_string=config.APPINSIGHTS_CONSTRING))
