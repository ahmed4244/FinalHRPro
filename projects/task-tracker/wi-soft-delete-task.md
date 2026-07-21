---
title: Soft-delete a task
type: work-item
created: 2026-07-07
tags: [work-item, v1]
status: done
---

# WI — Soft-delete a task

Delete hides a task; nothing is erased — [[adr-003-soft-delete-tasks]] says so.

- Happy: delete hides it from the list.
- Sad: the task is hidden, not erased (inspect localStorage to prove it).
