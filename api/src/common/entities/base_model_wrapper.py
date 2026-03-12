from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class BaseModelWrapper(BaseModel):
    """
    Wrapper around BaseModel ensuring correct serialization case.
    """

    model_config = ConfigDict(
        frozen=True,
        alias_generator=to_camel,
        populate_by_name=True,
    )
