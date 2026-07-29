# Product Requirements (Public Showcase)

## Roles

- `Admin`: tenant configuration, integrations, policies, knowledge publication, billing controls, and global audit.
- `Supervisor`: campaigns, QA, live monitoring, analytics, coaching, and escalation rules.
- `Manager`: leads, next actions, human handoff, and CRM follow-up.
- `Auditor`: read-only access to permitted traces, reports, and audit events.

## Core workflows

- Ingest or upload a recording and process it asynchronously into a call card, transcript, analysis, and next action.
- Handle an inbound voice session using approved knowledge and transfer to a qualified human when required.
- Create and operate an outbound campaign with consent/DNC, timing, budget, and retry controls.
- Persist result changes through idempotent Control API commands and expose them in CRM and analytics.
- Manage scenarios, prompts, knowledge, models, voices, and policies as published versions.
- Track usage and budget by call, campaign, quality profile, and tenant.

## Public showcase scope

- Bilingual documentation for architecture, product, security, and integration contracts.
- A safe mock API with synthetic data for the principal product entities.
- Demonstration of idempotent campaign creation and distinct call-result states.

## Intentionally out of scope for this repository

- Production media runtime and actual calls.
- Real provider adapters, credentials, customer integrations, and deployment configuration.
- Customer recordings, personally identifiable information, and commercial algorithms.
