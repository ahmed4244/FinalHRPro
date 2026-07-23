---
title: "Proxy apidirect behind a server route"
type: work-item
created: 2026-07-16
tags: [work-item]
status: planned
parent: "[[scope-the-data-path]]"
---

# WI — Proxy apidirect behind a server route

The client calls our own route; the route calls apidirect with the key from
`$APIDIRECT_KEY` ([[adr-003-api-key-stays-server-side]],
[[adr-005-use-apidirect-io-as-the-data-source]]).

- Happy: the browser never sees the key; a topic in, a JSON list out.
- Sad: a missing key fails fast on the server with a readable message, not a leak.
