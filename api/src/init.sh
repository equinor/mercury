#!/bin/sh
set -eu

if [ "$1" = 'api' ]; then
  exec python3 /code/app.py run
else
  exec "$@"
fi
