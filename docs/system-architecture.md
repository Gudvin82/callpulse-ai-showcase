# System Architecture (Public Showcase)

## Platform model

CallPulse AI consists of three product domains: Call Intelligence, Inbound Voice AI, and Outbound AI Campaigns. CRM, knowledge retrieval, billing, identity, and observability are shared platform capabilities.

## Control Plane and Voice Runtime

- **Control Plane** owns tenant configuration, published scenarios, CRM commands, campaign lifecycle, knowledge versions, budgets, identity, and audit trails.
- **Voice Runtime** owns a single real-time media session: audio preparation, STT, dialogue orchestration, RAG/tool requests, TTS, interruption handling, and human handoff.
- Voice Runtime submits idempotent commands to the Control API. It does not write directly into CRM or business storage.

## Main flow

1. Telephony or file upload provides audio and metadata.
2. The audio pipeline normalizes media, separates DTMF events, and sends speech to STT.
3. The orchestration layer uses the pinned scenario, prompt, knowledge, model, voice, and policy versions.
4. A safe RAG/tool layer provides approved context or returns a fallback/handoff decision.
5. Control API persists CRM, campaign, billing, and audit state through idempotent commands and durable events.
6. Analytics and operations consume normalized events and expose dashboards, reports, and diagnostics.

## Data and reliability

- Transactional data, cache, durable queues, and distributed locks have separate responsibilities.
- Outbox/inbox patterns, retries, circuit breakers, dead-letter queues, tracing, and runbooks protect cross-service delivery.
- Performance and disaster-recovery characteristics are deployment-specific and must be proven by capacity and recovery tests.

## Public boundary

This repository provides documentation and a synthetic mock API. Production runtime, telephony media infrastructure, customer data, and credentials remain private.
