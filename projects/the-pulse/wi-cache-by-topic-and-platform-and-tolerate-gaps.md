---
title: "Cache by topic and platform, and tolerate gaps"
type: work-item
created: 2026-07-16
tags: [work-item]
status: planned
parent: "[[scope-the-data-path]]"
---

# WI — Cache by topic and platform, and tolerate gaps

Cache each `(topic, platform)` result for a short TTL; on a `429`, back off and
return the partial results already in hand
([[adr-004-cache-and-back-off-on-429]], [[../../knowledge/api-rate-limiting|rate limiting]]).

- Happy: a repeated topic is served from cache, spending nothing.
- Sad: one platform rate-limited → the others still render; nothing blanks.
