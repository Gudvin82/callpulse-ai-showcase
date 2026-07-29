# CallPulse AI - Public Showcase

CallPulse AI is an on-prem AI platform for call analysis and sales operations.
This public repository demonstrates product capabilities and integration approach
without exposing private production logic or customer data.

## Why this repository is public

This repo is designed for:

- technical review by potential employers and partners,
- architecture discussion,
- safe local demo in mock mode.

This repo does not include:

- production keys/secrets,
- customer recordings and personal data,
- full commercial backend logic.

## Product modules

- Call Analysis: ingestion, transcript, quality and risk markers.
- Analytics: manager dashboard and operational summaries.
- AI Sales Department: incoming AI calls, outbound campaigns, CRM funnel.
- Integrations: telephony, messengers, storage, and AI providers.
- Billing and Ops: usage visibility and environment checks.

## What is included in this public repository

- Product-level documentation (`docs/`) for architecture, PRD, AI design and security approach.
- [Russian architecture reference](docs/ARCHITECTURE_REFERENCE_RU.md) describing the target industrial architecture of the platform.
- Safe `mock-api` for local demo and API interaction examples.
- Example payloads for integration walkthroughs.
- Public-safe legal and usage files (`LICENSE`, `NOTICE`).

## What is intentionally excluded

- Any production secret or environment values.
- Customer recordings, transcripts and personal data.
- Private on-prem operational datasets and backups.
- Internal commercial implementation details not intended for public disclosure.

## Quick demo

Run safe mock API:

```bash
cd mock-api
npm install
npm run start
```

Mock API starts at `http://localhost:8090`.

## Repository structure

- `docs/` - architecture and API notes; begin with [the documentation index](docs/README.md).
- `mock-api/` - lightweight sandbox API for demos.
- `examples/` - integration snippets and payload examples.

## Security statement

- This repository is sanitized for public sharing.
- All sensitive configuration values are placeholders only.
- Runtime/customer data is intentionally excluded.

## Contact

For partnership or technical collaboration, contact repository owner via GitHub profile.
