---
title: Soft-delete tasks instead of hard-deleting
type: adr
created: 2026-07-06
tags: [adr, product]
status: accepted
---

# ADR-003 — Soft-delete tasks instead of hard-deleting

## Status
accepted

## Context
Delete is the one action a user cannot check before doing: once a row is gone,
so is the proof it existed. A task list is also a record of what you decided
not to do.

## Decision
Deleting a task hides it — it is marked deleted, never erased. Nothing the
user typed is destroyed by a single click.

## Consequences
- The open count ignores deleted tasks (see [[wi-open-count]]).
- "Undelete" becomes possible later without a data migration.
- Storage keeps growing slowly; acceptable at personal scale
  (see [[../../knowledge/why-sqlite-for-the-tracker|the storage note]]).
