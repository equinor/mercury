from enum import Enum


class PhaseLabels(str, Enum):
    """Enum class for phase labels"""

    MERCURY = "Mercury"
    LIQUID = "Liquid"
    VAPOR = "Vapor"
    AQUEOUS = "Aqueous"
