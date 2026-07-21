---
title: Version 2 adds editing a task's words and a show-open-only filter
type: adr
created: 2026-07-14
tags: [adr, scope]
status: shipped
---

# ADR-005 — Version 2 adds editing a task's words and a show-open-only filter

## Status
shipped — version 2 built and demoed on Day 12

## Context
A week of real use filled the vault with captured annoyances. The two that
came up most: a typo in a task cannot be fixed without delete-and-retype, and
a long list buries the open tasks under the completed ones. This brief wrote
itself while the week was lived.

## Decision
Version 2 adds exactly two features: edit a task's words in place, and a
filter that shows open tasks only. Everything else waits.

## Consequences
- Version-1 behavior is untouched — every v2 change is tested against the
  five v1 features ([[adr-004-version-1-in-one-file]]).
- The filter respects [[adr-003-soft-delete-tasks]]: deleted tasks show in
  neither view.
- Still one file, still localStorage; sync remains the version-3 goal.
