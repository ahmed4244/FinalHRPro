---
title: Task Tracker — project index
type: project
created: 2026-06-20
tags: [project, task-tracker]
status: active
---

# Task Tracker

A small personal task app — my sandbox for the patterns in `knowledge/`.
Version 1 shipped on Day 8; version 2 shipped on Day 12. The app itself lives
at `~/todo-app/todo.html` — code outside the vault, the trail inside it.

## Decisions
- [[adr-001-stack-choice]] — SvelteKit + SQLite (the version-3 target)
- [[adr-002-newest-first]] — the newest task sits at the top
- [[adr-003-soft-delete-tasks]] — deleted means hidden, never erased
- [[adr-004-version-1-in-one-file]] — v1 is one HTML file, localStorage
- [[adr-005-version-2-scope]] — v2 adds edit-in-place + an open-only filter

## Plans
- [[plan-version-3-sync]] — the same list on every device (proposed)
  - [[scope-one-true-copy]] — the server keeps the list
  - [[scope-devices-through-the-api]] — clients read/write through the API

## Work items — version 1 (all done, Day 8)
- [[wi-add-task]]
- [[wi-complete-task]]
- [[wi-soft-delete-task]]
- [[wi-survive-refresh]]
- [[wi-open-count]]
- [[wi-task-crud]] — the old catch-all, split into the five above

## Work items — version 2 (all done, Day 12)
- [[wi-edit-task-words]]
- [[wi-filter-open-only]]

## Work items — open
- [[wi-sync-across-devices]] — the version-3 catch-all, under the plan

## Related knowledge
- [[../../knowledge/why-sqlite-for-the-tracker|Why SQLite]]
- [[../../knowledge/sveltekit-server-boundary|The server boundary]]
- [[../../knowledge/env-vars-and-secrets|Secrets handling]]
