#!/bin/sh
set -eu

if [ "$1" = 'api' ]; then
  cd src
  exec python -m cli run
else
  exec "$@"
fi
