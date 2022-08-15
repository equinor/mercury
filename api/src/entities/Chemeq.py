from dataclasses import asdict, dataclass, fields

from typing import List, Tuple
import numpy as np

import libhg


@dataclass(frozen=True)
class Chemeq:
    number_of_components: int
    component_ids: List[int]
    number_of_reactions: int
    feed_composition: List[float]
    formula_matrix: List[List[int]]
    stoichiometric_matrix: List[List[float]]

    def to_dict(self):
        return asdict(self)

    @classmethod
    def from_dict(cls, dict_) -> "Chemeq":
        class_fields = {f.name for f in fields(cls)}
        return Chemeq(**{k: v for k, v in dict_.items() if k in class_fields})

    def compute(self) -> Tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray]:
        ph_index, ntot, ph_frac, moles = libhg.cpe(
            ne=self.number_of_components - self.number_of_reactions,
            nc=self.number_of_components,
            nr=self.number_of_reactions,
            list=self.component_ids,
            nf=self.feed_composition,
            a=self.formula_matrix,
            n=self.stoichiometric_matrix,
        )
        return ph_index, ntot, ph_frac, moles
