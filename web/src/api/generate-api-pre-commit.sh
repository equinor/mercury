#!/bin/bash
set -eo

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
	cd web
	yarn generate
	echo "API Client successfully generated"
fi
