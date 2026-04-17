# Security and Data Handling

## What is collected in production (not in this public repo)

- Call metadata (time, duration, source, status).
- Transcript and analysis results.
- CRM lead state and follow-up actions.

## What is not stored in this public repository

- Production `.env` files.
- Access keys, private keys, signing secrets.
- Customer recordings and personal datasets.
- Runtime DB dumps and backup archives.

## Secret management principles

- Environment-only secrets.
- Rotated credentials after any accidental exposure.
- No secret values in commit history.

## Logging principles

- Log operational errors and system status.
- Do not log raw secrets or full sensitive payloads.

## Publication checklist

- Run secret scan before each push.
- Verify no `uploads/`, `data/`, `backups/`, `.env*` (except `.env.example`).
- Publish from a clean repository history.
