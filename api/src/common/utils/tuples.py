from typing import Dict, List, NamedTuple

import numpy as np

from common.utils.arrays import NDArrayFloat
from common.utils.enums import PhaseLabels


class PhaseValues(NamedTuple):
    """
    NamedTuple containing results (percentage of fluid and amount of mercury in the given phase) for each of the phases
    from the multiflash computation output.
    """

    percentage: float
    mercury: float

    def __eq__(self, other) -> bool:
        if not np.isclose(self.percentage, other.percentage):
            return False
        if not np.isclose(self.mercury, other.mercury):
            return False
        return True


class ComponentFractions(NamedTuple):
    """
    NamedTuple containing results (mass concentration and mole concentration) for each of the components
    from the multiflash computation output.
    """

    moles: NDArrayFloat
    mass: NDArrayFloat

    def __eq__(self, other) -> bool:
        if not np.allclose(self.moles, other.moles, rtol=1e-3):
            return False
        if not np.allclose(self.mass, other.mass, rtol=1e-3):
            return False
        return True


class MultiflashResult(NamedTuple):
    """
    NamedTuple containing both all results from the multiflash computation output.

    phase_values - dictionary where the keys are PhaseLabels (corresponding to the phase state) with PhaseValue
        as values
    component_fractions - a dictionary where the keys are strings (component numbers) with ComponentFractions as
        values
    feed_molecular_weight - float with the total molecular weight for the given input feed.
    """

    phase_values: Dict[PhaseLabels, PhaseValues]
    component_fractions: Dict[str, ComponentFractions]
    feed_fractions: List[float]

    def __eq__(self, other) -> bool:
        if not set(self.phase_values.keys()) == set(other.phase_values.keys()):
            return False
        if not set(self.component_fractions.keys()) == set(other.component_fractions.keys()):
            return False
        for label in self.phase_values.keys():
            if not self.phase_values[label] == other.phase_values[label]:
                return False
        for component_id in self.component_fractions.keys():
            if not self.component_fractions[component_id] == other.component_fractions[component_id]:
                return False
        return True
