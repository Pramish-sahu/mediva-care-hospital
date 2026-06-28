#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECT_NAME="$(basename "$PROJECT_ROOT")"
OUTPUT_FILE="${1:-$PROJECT_ROOT/../${PROJECT_NAME}-release.zip}"

cd "$PROJECT_ROOT"
rm -f "$OUTPUT_FILE"
zip -qr "$OUTPUT_FILE" . \
  -x '.git/*' \
  -x '.DS_Store' \
  -x '*/.DS_Store' \
  -x '*.log' \
  -x '__pycache__/*' \
  -x '*/__pycache__/*'

printf 'Release package created: %s\n' "$OUTPUT_FILE"
