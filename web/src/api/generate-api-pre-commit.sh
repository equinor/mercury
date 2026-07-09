#!/bin/bash
set -euo pipefail

# Regenerate the API client from the application source and fail if the
# committed client drifts from it. Capturing the working-tree state before and
# after generation lets this run identically in local pre-commit and in CI
# (where nothing is staged), without relying on staged-file detection.

# Record the repository state before generation.
git_status_before=$(git status --porcelain)

openapi_path="${PWD}/web/openapi.json"
# Export the OpenAPI schema directly from the application source.
# This does not require a running API server (or Docker).
(cd api && uv run python scripts/export_openapi.py "$openapi_path")

cd web
# CI=true forces Kubb to use a plain logger compatible with non-TTY environments
CI=true yarn generate
rm -f openapi.json
cd ..

echo "API Client successfully generated"

# Record the repository state after generation and fail on any drift.
git_status_after=$(git status --porcelain)

if [ "$git_status_before" = "$git_status_after" ]; then
	echo "API client is up to date."
	exit 0
else
	echo "API client is out of date. Re-run generation and commit the changes:"
	git --no-pager diff --stat
	exit 1
fi
