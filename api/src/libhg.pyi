from numpy.typing import ArrayLike

def compute_multiflash(
    num_comp: int,
    components: list[int],
    temperature: float,
    pressure: float,
    feed_composition: list[float],
) -> tuple[ArrayLike, ArrayLike, ArrayLike, ArrayLike, ArrayLike]: ...
