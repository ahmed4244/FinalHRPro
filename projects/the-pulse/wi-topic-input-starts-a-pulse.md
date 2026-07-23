---
title: "Topic input starts a pulse"
type: work-item
created: 2026-07-16
tags: [work-item]
status: planned
parent: "[[scope-the-glance]]"
---

# WI — Topic input starts a pulse

A single input takes a topic; submitting it asks our route for the pulse and
shows a calm loading state while it waits.

- Happy: type "falconry", hit go, the list fills in.
- Sad: an empty topic does nothing; a slow fetch shows loading, not a freeze.
