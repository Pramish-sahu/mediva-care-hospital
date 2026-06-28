#!/usr/bin/env bash
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORT="${1:-8000}"

cd "$PROJECT_ROOT"
printf 'Serving Mediva Care Hospital at http://localhost:%s\n' "$PORT"
python3 -m http.server "$PORT"
