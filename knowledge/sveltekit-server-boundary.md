---
title: The SvelteKit server boundary
type: reference
created: 2026-06-22
tags: [sveltekit, architecture, security]
---

# The SvelteKit server boundary

Code under `src/lib/server/**` is **never** bundled into the client. That is the
seam that keeps secrets, DB drivers, and privileged logic off the browser.

## The rule
The UI talks to the server **only through `/api/*`** (HTTP fetch) — it never
imports `$lib/server` into client code. Keep that boundary and the frontend can
later deploy to a different host without a rewrite.

## Why it matters here
- `better-sqlite3` is server-only — it must stay behind the boundary.
- API keys load server-side (see [[env-vars-and-secrets]]).

This is the same shape the Task Tracker uses — see [[../projects/task-tracker/index|Task Tracker]].
