# Security and Data Handling

## Public repository boundary

This repository contains only synthetic examples and public-safe documentation. It must not contain production environment files, credentials, SIP configuration, customer recordings, transcripts, personal data, database dumps, or backup archives.

## Target production controls

- Server-side tenant isolation and role-based access control; callers never choose a tenant identifier as a trusted input.
- MFA/SSO, audit trails, approval workflows, and least-privilege service identities where required.
- Managed secret storage, encryption in transit and at rest, key rotation, and access auditing.
- Media access through short-lived signed URLs; masked personal data in standard UI and logs.
- Retention policies, legal hold, deletion workflows, and verified backup/restore procedures.
- SIP and webhook authentication, replay protection, rate limits, WAF controls, and payload validation.

## AI and knowledge safety

RAG access respects tenant, role, audience, and policy constraints. Semantic caching uses strict versioned keys and must be invalidated when knowledge, permissions, or policy versions change. Cached answers are revalidated before use.

## Publication checks

Run `scripts/scan_public_repo.sh` before publishing. Review the complete Git diff and history for secrets or personal data; a pattern scan is a guardrail, not a replacement for human review.
