---
title: Tasks list newest first
type: adr
created: 2026-06-22
tags: [adr, product]
status: accepted
---

# ADR-002 — Tasks list newest first

## Status
accepted

## Context
A task list has one ordering question: what do you see first when you open it?

## Decision
The newest task sits at the top. No manual reordering in version 1.

## Consequences
- The task you just added is the one you see: add, then check, no scrolling.
- The list needs no "sort by" controls, so version 1 stays one screen.
- Ordering is implemented by [[wi-task-crud]] (list, newest first).
- Drag-to-reorder waits until real use proves we miss it.
