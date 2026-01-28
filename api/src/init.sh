#!/bin/sh
set -eu

if [ "$1" = 'api' ]; then
  exec python -m cli run
else
  exec "$@"
fi
