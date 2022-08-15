from dataclasses import asdict, dataclass, fields

from typing import List, Tuple
import numpy as np

import libhg


@dataclass(frozen=True)
class Multiflash:
    number_of_components: int
    component_ids: List[int]
    temperature: float
    pressure: float
    composition: List[float]

    def to_dict(self):
        return asdict(self)

    @classmethod
    def from_dict(cls, dict_) -> "Multiflash":
        class_fields = {f.name for f in fields(cls)}
        return Multiflash(**{k: v for k, v in dict_.items() if k in class_fields})

    def compute(self) -> Tuple[np.ndarray, np.ndarray, np.ndarray]:
        ph_index, ph_frac, moles = libhg.mf(
            nc=self.number_of_components,
            list=self.component_ids,
            t=self.temperature,
            p=self.pressure,
            compos=self.composition
        )
        return ph_index, ph_frac, moles

    # def cpe(self) -> Tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray]:
    #     ph_index, ntot, ph_frac, moles = libhg.cpe(
    #         ne=self.number_of_components - self.number_of_reactions,
    #         nc=self.number_of_components,
    #         nr=self.number_of_reactions,
    #         list=self.component_ids,
    #         nf=self.feed_composition,
    #         a=self.formula_matrix,
    #         n=self.stoichiometric_matrix,
    #     )
    #     return ph_index, ntot, ph_frac, moles
