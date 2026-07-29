# Mock API Overview

Base URL: `http://localhost:8090`

The mock API uses synthetic in-memory data. It does not connect to telephony, AI providers, CRM, or production storage.

## Platform and operations

- `GET /health` - mock API health.
- `GET /api/platform/overview` - modules and mock-mode boundaries.
- `GET /api/ops/health` - synthetic operational component status.

## Calls and CRM

- `GET /api/calls` - synthetic call cards with independent attempt, conversation, handoff, and next-action states.
- `GET /api/calls/:id` - one synthetic call card.
- `GET /api/crm/leads` - synthetic CRM leads.
- `POST /api/crm/leads` - create a local synthetic lead.

## Control Plane

- `GET /api/control/campaigns` - campaign configuration and status.
- `POST /api/control/campaigns` - create a synthetic campaign. Use an `Idempotency-Key` header to demonstrate replay-safe creation.
- `GET /api/knowledge/bases` - published knowledge-base versions.
- `GET /api/consents/dnc` - consent/DNC contract example without personal data.
- `GET /api/billing/usage` - synthetic usage and budget summary.

## Sales summary

- `GET /api/sales/overview` - synthetic sales operations summary.

## Example: idempotent campaign creation

```bash
curl -X POST http://localhost:8090/api/control/campaigns \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: demo-campaign-001' \
  -d '{"name":"Marketplace audit pilot","contacts_total":2500}'
```

Repeating the request with the same idempotency key returns the original response and does not create another campaign in the mock process.
