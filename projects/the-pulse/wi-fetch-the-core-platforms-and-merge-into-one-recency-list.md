---
title: "Fetch the core platforms and merge into one recency list"
type: work-item
created: 2026-07-16
tags: [work-item]
status: planned
parent: "[[scope-the-data-path]]"
---

# WI — Fetch the core platforms and merge into one recency list

For a topic, call apidirect for X, Reddit and YouTube (`sort_by=most_recent`) and
merge the results into one list, newest first, each item keeping its `source`
([[adr-001-fetch-and-shape]], [[../../knowledge/one-shape-across-platforms|one shape]]).

- Happy: one merged list, sorted by date, sources visible.
- Sad: a platform that returns nothing is simply absent from the list.
