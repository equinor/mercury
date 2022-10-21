from enum import Enum


class PhaseLabels(str, Enum):
    """Enum class for phase labels"""

    MERCURY = "mercury"
    LIQUID = "liquid"
    VAPOR = "vapor"
    AQUEOUS = "aqueous"
