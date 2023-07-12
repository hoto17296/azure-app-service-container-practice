#!/bin/bash -eu

python -m uvicorn main:app \
  --host 0.0.0.0 \
  --port ${WEBSITES_PORT:-8000}