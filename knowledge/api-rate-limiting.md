---
title: API rate limiting — the basics
type: reference
created: 2026-06-25
tags: [api, http, reliability]
---

# API rate limiting — the basics

Rate limiting protects a service from being overwhelmed and gives callers a
predictable contract.

## What to send back
- `429 Too Many Requests` when the caller is over budget.
- `Retry-After` (seconds) so a well-behaved client knows when to try again.
- `X-RateLimit-Remaining` so clients can self-pace before they get blocked.

## Calling someone else's API
- Respect their `Retry-After`.
- Use **exponential backoff** on 429/503, not a tight retry loop.

Ties into readable failures — [[readable-error-messages]].
