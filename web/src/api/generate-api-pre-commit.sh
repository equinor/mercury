#!/bin/bash
set -e -o pipefail

PATTERN="api/src/features/*"
PATTERN+="|api/src/entities/*"
PATTERN+="|api/src/common/*"
PATTERN+="|api/src/authentication/*"

CHANGED_API_FILES=()
while read -r; do
	CHANGED_API_FILES+=("$REPLY")
done < <(git diff --name-only --cached --diff-filter=ACMR | grep -E "$PATTERN")

if [ ${#CHANGED_API_FILES[@]} -eq 0 ]; then
	echo "No changes in API relevant files. No need to generate API."
else
	echo "Changes detected in API relevant files. Generating API ..."
	openapi_path="${PWD}/web/openapi.json"
	# Export the OpenAPI schema directly from the application source.
	# This does not require a running API server (or Docker).
	(cd api && uv run python scripts/export_openapi.py "$openapi_path")
	cd web
	# CI=true forces Kubb to use a plain logger compatible with non-TTY environments
	CI=true yarn generate
	rm -f openapi.json
	echo "API Client successfully generated"
fi
