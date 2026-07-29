# AI Design (Public Showcase)

## Runtime pipeline

`Telephony -> audio preprocessing -> STT -> dialogue orchestrator -> RAG/tools -> LLM -> TTS -> telephony`

For offline call analysis, the same audio preprocessing is used in an asynchronous job pipeline: `uploaded -> validating -> preprocessing -> transcribing -> analysing -> completed/failed`.

## Dialogue orchestration

The orchestrator uses finite-state rules for mandatory stages, structured fields, confidence thresholds, consent requirements, escalation, and next actions. Long conversations use sliding-window summarisation with separately persisted business-critical state such as consent, promises, decisions, and unfinished actions.

## Knowledge and guardrails

- Retrieval is tenant- and permission-aware and uses knowledge, scenario, language, channel, region, and policy context.
- Responses require approved sources, calibrated relevance thresholds, citations when applicable, and policy validation.
- Dynamic data such as price, availability, and booking slots comes from protected server-side tools rather than static RAG text.
- Low confidence, policy denial, an explicit human request, or a critical sales/service trigger results in a safe fallback or human handoff.

## Versioning and evaluation

Every call is pinned to published scenario, prompt, knowledge, model, voice, and policy versions. Changes can be tested in simulation and canary modes before rollout. Regression sets cover safe-answer, retrieval, tool-call, and dialogue-state behaviour.

## Public boundary

The mock API does not invoke STT, TTS, LLM, or telephony providers. It represents public-safe contracts only.
