# System Architecture (Showcase)

## High-level flow

1. Telephony or file upload provides call audio.
2. Speech-to-text pipeline generates transcript.
3. LLM analysis creates outcomes, risk markers and recommendations.
4. CRM stores lead, stage, and action history.
5. Analytics aggregates quality, conversion and operational metrics.

## Main components

- `API layer`:
  REST endpoints for calls, CRM, analytics, settings, integrations.
- `Pipeline layer`:
  audio ingestion, transcript, analysis, post-processing.
- `Storage layer`:
  DB + object storage + cache/queue.
- `AI layer`:
  STT / LLM / Live assistant provider adapters.
- `UI layer`:
  manager dashboard, call card, AI sales workflows.

## Runtime modes

- `Production mode`: full feature set with protected integrations.
- `Showcase mode`: mock-safe behavior for demos and interviews.

## Deployment model

- Primary target: customer on-prem infrastructure.
- Optional cloud-hosted demo mode for pre-sales.

## Security boundaries

- Secrets from env only.
- No customer raw data inside public repository.
- Signed URL strategy for call media access.
