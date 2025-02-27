from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class StrictModel(BaseModel):
    model_config = ConfigDict(
        # extra="forbid",
        alias_generator=to_camel,
        populate_by_name=True,
    )
