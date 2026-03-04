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
	# This requires the API to be running on localhost port 5000
	if ! curl -sf http://localhost:5000/openapi.json -o web/openapi.json; then
		echo "Failed to reach API at localhost:5000. Is it running?"
		exit 1
	fi
	cd web
	# CI=true forces Kubb to use a plain logger compatible with non-TTY environments
	CI=true yarn generate
	rm -f openapi.json
	echo "API Client successfully generated"
fi
