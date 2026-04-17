# API Overview (Showcase)

Base URL (mock):

`http://localhost:8090`

## Health

- `GET /health`
- response:

```json
{ "ok": true, "service": "callpulse-showcase-mock" }
```

## Calls list

- `GET /api/calls`
- response:

```json
{
  "items": [
    {
      "id": "call_demo_1",
      "started_at": "2026-04-17T11:00:00Z",
      "duration_sec": 95,
      "status": "processed",
      "outcome": "callback",
      "quality": 7.8,
      "risk": "medium"
    }
  ]
}
```

## CRM leads

- `GET /api/crm/leads`
- `POST /api/crm/leads`

## Sales department overview

- `GET /api/sales/overview`
- response includes:
  calls accepted, AI closed, transferred, active leads and conversion.
