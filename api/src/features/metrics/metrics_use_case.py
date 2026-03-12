from common.metrics import metrics
from config import config


def get_metrics_use_case() -> str:
    """Return metrics for application."""
    return f"""mercury_calculations_count {{env={config.ENVIRONMENT}}} {metrics.multiflash_calculation_count}\n
mercury_fetch_components_count {{env={config.ENVIRONMENT}}} {metrics.fetch_components_count}\n"""
