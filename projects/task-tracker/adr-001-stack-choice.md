---
title: Stack choice — SvelteKit + SQLite
type: adr
created: 2026-06-20
tags: [adr, stack]
status: shipped
---

# ADR-001 — Stack choice: SvelteKit + SQLite

## Status
shipped

## Context
Single-user task app. Want one language end-to-end, a simple data store, and a
clean server boundary for later.

## Decision
SvelteKit (Node adapter) for the app; SQLite (`better-sqlite3`) for data.

## Consequences
- Server-only DB driver stays behind [[../../knowledge/sveltekit-server-boundary|the server boundary]].
- Zero-ops storage — see [[../../knowledge/why-sqlite-for-the-tracker|the decision note]].
- Revisit if it ever becomes multi-user (Postgres + a pool).
