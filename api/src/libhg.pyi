from typing import Tuple
from numpy.typing import ArrayLike

def mf(nc: int, list: list[int], t: float, p: float, compos: list[float]) -> Tuple[ArrayLike, ArrayLike, ArrayLike]: ...

def cpe(ne: int, nc: int, nr: int, list: list[int], nf: list[float], a: list[list[float]], n: list[list[float]]) -> Tuple[ArrayLike, ArrayLike, ArrayLike, ArrayLike]: ...
