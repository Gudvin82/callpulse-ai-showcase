#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "[scan] root: $ROOT_DIR"

echo "[scan] checking critical secret patterns..."
cd "$ROOT_DIR"
rg -n --hidden -S \
  "BEGIN (RSA|OPENSSH|PRIVATE) KEY|ghp_[A-Za-z0-9]{20,}|sshpass|YANDEX_PRIVATE_KEY=.+|OBJECT_STORAGE_SECRET_ACCESS_KEY=.+|JWT_(ACCESS|REFRESH)_SECRET=.+" \
  -g '!scripts/scan_public_repo.sh' \
  . || true

echo "[scan] checking forbidden runtime/data directories..."
find . -type d \( -name uploads -o -name data -o -name backups -o -name node_modules \) -print || true

echo "[scan] checking env files..."
find . -type f -name ".env*" ! -name ".env.example" -print || true

echo "[scan] completed"
