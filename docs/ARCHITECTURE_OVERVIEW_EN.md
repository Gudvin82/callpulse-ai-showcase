# CallPulse AI Architecture Overview

## Purpose

CallPulse AI is a unified voice-automation platform for sales, contact-centre, and service operations. The target architecture covers call analysis, inbound Voice AI, outbound AI campaigns, CRM execution, knowledge retrieval, billing, and operational controls.

## Product domains

1. **Call Intelligence** ingests telephony recordings or uploaded files, preprocesses audio, transcribes, analyses quality and risk, and produces auditable outcomes and next actions. Long recordings use an asynchronous job pipeline rather than an HTTP request lifecycle.
2. **Inbound Voice AI** receives a telephony media session, streams audio through STT, orchestrates the dialogue, retrieves approved knowledge, synthesizes TTS responses, and can hand off to a human agent.
3. **Outbound AI Campaigns** apply scenario, local-time, consent/DNC, attempt-limit, and budget rules before every call attempt, then record attempt, conversation, handoff, and next-action states separately.

## Architectural boundaries

The **Voice Runtime** is a real-time session processor. It does not write directly to CRM or business storage. It sends idempotent commands to the **Control API**, which owns CRM changes, campaigns, version publication, billing rules, and audit logging.

Every active call is pinned to a published set of scenario, prompt, knowledge, model, voice, and policy versions. This prevents a configuration update from changing an in-progress conversation.

## Knowledge and safety

RAG retrieval is tenant-scoped and permission-aware. It enforces source selection, relevance thresholds, citations, policy checks, and safe fallback. Dynamic business data, such as prices, availability, and booking slots, comes from protected server-side APIs rather than from static RAG text. Semantic cache keys include tenant, language, scenario, channel, permissions, region, and applicable knowledge/prompt/policy versions.

## Reliability and operations

The target design uses independently managed cache, durable queue, and distributed lock functions; idempotency keys; transactional outbox/inbox delivery; timeouts; circuit breakers; fallback policies; dead-letter queues; tracing; and runbooks. Performance, recovery, and availability claims are validated in the actual deployment through capacity and disaster-recovery testing.

## Public repository boundary

This repository documents the architecture and exposes a synthetic mock API for safe integration walkthroughs. It does not publish the production voice runtime, telephony credentials, customer data, call recordings, or operational infrastructure.
