#!/bin/bash -eu

python -m uvicorn backend.main:app --host 0.0.0.0