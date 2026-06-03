"""Export the OpenAPI schema directly from the application source.

This avoids having to run the API server (or Docker) just to obtain the schema.
Usage:
    python scripts/export_openapi.py <output_path>
"""

import json
import sys
from pathlib import Path


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python scripts/export_openapi.py <output_path>")

    # Make the application package importable without relying on PYTHONPATH.
    sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "src"))
    from app import create_app

    output_path = Path(sys.argv[1])
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w") as f:
        json.dump(create_app().openapi(), f)


if __name__ == "__main__":
    main()
