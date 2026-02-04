#!/bin/sh
set -eu

if [ "$1" = 'run' ]; then
  cd src
  exec python -m cli run
else
  exec "$@"
fi
