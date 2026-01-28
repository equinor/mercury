#!/bin/sh
set -eu

if [ "$1" = 'api' ]; then
  exec python3 /code/src/app.py run
else
  exec "$@"
fi
