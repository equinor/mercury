#!/bin/sh
set -eu

cat version.txt

if [ "$1" = 'api' ]; then
  python3 /code/app.py run
else
  exec "$@"
fi
