---
title: "Version 3 — sync across devices"
type: plan
created: 2026-07-14
tags: [plan]
status: proposed
goal: "The same task list on the laptop and on the phone, kept by one server"
---

# Version 3 — sync across devices

## Goal
The same task list on the laptop and on the phone, kept by one server.

## Why now
Version 2 shipped ([[adr-005-version-2-scope]]) and the one annoyance no
one-file app can fix is the list being trapped in one browser. Sync needs the
[[adr-001-stack-choice]] stack — one place where the truth lives.

## Shape
Two slices: [[scope-one-true-copy]] (the server side) and
[[scope-devices-through-the-api]] (the clients). The old catch-all
[[wi-sync-across-devices]] sits directly under this plan until the scopes
split it into finer work items — same retirement the task-crud catch-all had
on Day 8.
