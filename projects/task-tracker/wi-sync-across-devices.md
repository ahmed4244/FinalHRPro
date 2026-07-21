---
title: Work item — sync across devices
type: work-item
created: 2026-06-23
tags: [work-item, sync]
status: planned
parent: "[[plan-version-3-sync]]"
---

# WI — Sync across devices

The version-3 catch-all, attached directly to [[plan-version-3-sync]]. It
retires the moment the plan's scopes ([[scope-one-true-copy]],
[[scope-devices-through-the-api]]) split it into finer work items — the same
retirement [[wi-task-crud]] had on Day 8.

## Scope
- [ ] The server keeps the list in SQLite (the one true copy)
- [ ] Each device reads and writes through the API
- [ ] A change on one device shows on the other after a refresh

## Notes
Two devices talking to one API is where cross-origin rules bite — see
[[../../knowledge/debugging-cors|CORS note]]. Server code stays behind the
boundary: [[../../knowledge/sveltekit-server-boundary|server boundary note]].
