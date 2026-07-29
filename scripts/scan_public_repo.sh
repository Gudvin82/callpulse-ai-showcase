#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "[scan] root: $ROOT_DIR"

echo "[scan] checking critical secret patterns..."
cd "$ROOT_DIR"
secret_matches="$(rg -n --hidden -S \
  "BEGIN (RSA|OPENSSH|PRIVATE) KEY|ghp_[A-Za-z0-9]{20,}|sshpass|YANDEX_PRIVATE_KEY=.+|OBJECT_STORAGE_SECRET_ACCESS_KEY=.+|JWT_(ACCESS|REFRESH)_SECRET=.+" \
  -g '!scripts/scan_public_repo.sh' \
  -g '!**/node_modules/**' \
  . || true)"

if [[ -n "$secret_matches" ]]; then
  printf '%s\n' "$secret_matches"
  echo "[scan] failed: possible secret pattern found"
  exit 1
fi

echo "[scan] checking tracked runtime/data directories..."
forbidden_paths="$(git ls-files | rg '(^|/)(uploads|data|backups|node_modules)/' || true)"
if [[ -n "$forbidden_paths" ]]; then
  printf '%s\n' "$forbidden_paths"
  echo "[scan] failed: tracked runtime or data artifact found"
  exit 1
fi

echo "[scan] checking tracked env files..."
env_files="$(git ls-files | rg '(^|/)\.env($|\.)' | rg -v '(^|/)\.env\.example$' || true)"
if [[ -n "$env_files" ]]; then
  printf '%s\n' "$env_files"
  echo "[scan] failed: tracked environment file found"
  exit 1
fi

echo "[scan] passed"
