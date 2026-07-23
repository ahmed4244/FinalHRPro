---
title: "The data path"
type: scope
created: 2026-07-16
tags: [scope]
status: proposed
parent: "[[plan-a-scannable-one-topic-pulse-view]]"
---

# The data path

The server side of [[plan-a-scannable-one-topic-pulse-view]]: one server route
that takes a topic, calls apidirect for the core platforms, and returns a single
unified list. The key lives here, never in the browser
([[adr-003-api-key-stays-server-side]]), and so do the caching and backoff
([[adr-004-cache-and-back-off-on-429]]). It speaks the one unified shape from
[[../../knowledge/one-shape-across-platforms|one shape across platforms]], so the
source stays replaceable ([[adr-005-use-apidirect-io-as-the-data-source]]).
