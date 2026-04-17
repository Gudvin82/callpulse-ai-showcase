# AI Design (Showcase)

## AI layers

- `STT`: converts audio to transcript.
- `LLM`: classifies outcome/risks and generates recommendations.
- `Live assistant`: suggests phrases for operator workflow.

## Guardrails

- No hardcoded production credentials in repository.
- No direct exposure of private provider keys in UI payloads.
- Sensitive operations are expected to be role-protected in production.

## Runtime modes

- `Showcase mode`: mock-only behavior for safe demonstration.
- `Production mode`: full provider integrations (private repository only).

## Data constraints

- Public showcase uses synthetic demo data only.
- No real customer recordings, PII payload dumps, or raw auth artifacts.
