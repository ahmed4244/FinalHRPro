---
title: Why SQLite for the task tracker
type: decision
created: 2026-06-23
tags: [database, sqlite, decision]
---

# Why SQLite for the task tracker

**Decision:** use SQLite (`better-sqlite3`) for the task tracker, not Postgres.

## Context
Single user, one machine, low write volume. No need for a network database or a
separate server process.

## Why
- Zero-ops: the database is one file on disk, backed up with the repo.
- Synchronous API (`better-sqlite3`) is simpler than a pool for this scale.
- Trivial to reset in development — delete the file.

## When I'd revisit
Multi-user or concurrent writers → move to Postgres and a connection pool.
Until then, SQLite is the right amount of database.

Formalised in [[../projects/task-tracker/adr-001-stack-choice|ADR-001]].
