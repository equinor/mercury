"""Export the OpenAPI schema from the FastAPI app without running the server.

This script can run without the `libhg` Fortran library installed by
stubbing it out before importing the application.
"""

import json
import sys
import types
from pathlib import Path
from unittest.mock import MagicMock

# Stub libhg so the app can be imported without the Fortran library
sys.modules["libhg"] = MagicMock(spec=types.ModuleType)

sys.path.insert(0, str(Path(__file__).resolve().parent / "src"))

from app import create_app

schema = create_app().openapi()
output = Path(__file__).resolve().parent.parent / "web" / "openapi.json"
output.write_text(json.dumps(schema, indent=2) + "\n")
print(f"OpenAPI schema written to {output}")
