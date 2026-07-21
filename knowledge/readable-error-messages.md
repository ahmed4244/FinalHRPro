---
title: Error messages are a UI
type: learning
created: 2026-06-28
tags: [errors, ux, debugging]
---

# Error messages are a UI

The error message is the interface your future self debugs against. Write it for
the person who has to read it at 2am.

## What a good error says
1. **What** failed (the operation), not just "error".
2. **Which** input caused it (the id, the field) — never dump a raw stack.
3. **What to do** next, if you know.

## In practice
Every API exit path returns structured JSON — `{ "error": "..." }` — never a raw
traceback. Wrap DB calls in try/except and produce a clean message.

Pairs with [[debugging-cors]] and [[api-rate-limiting]] — most "mystery" bugs are
just an error nobody bothered to make readable.
