from common.utils.arrays import NDArrayBytes, NDArrayFloat

def compute_multiflash(
    num_comp: int,
    components: list[int],
    temperature: float,
    pressure: float,
    feed_composition: list[float],
) -> tuple[NDArrayBytes, NDArrayFloat, NDArrayFloat, NDArrayFloat, NDArrayFloat]: ...
