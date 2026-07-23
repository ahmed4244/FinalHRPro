---
title: "Use apidirect.io as the data source"
type: adr
created: 2026-07-16
tags: [adr]
status: accepted
---

# ADR-005: Use apidirect.io as the data source

## Context
The Pulse needs live posts about one topic across several platforms. The options
were: call each platform's official API directly, use a third-party aggregator,
scrape the platforms ourselves, or narrow to a single source. Official APIs are
fragmented and mostly closed to a small builder; scraping is ours to build and
defend. apidirect.io offers one key, one call, and one shape across ~9 platforms
([[../../knowledge/apidirect-io-in-practice|apidirect in practice]],
[[../../knowledge/apidirect-quickstart|apidirect quickstart]]). This decision
picks the source; [[adr-001-fetch-and-shape]] then decides how we call it.

## Decision
The Pulse uses **apidirect.io** as its data source — one `X-API-Key`, one
`GET /v1/{platform}/posts` call per platform, one unified result shape. We
knowingly **accept its caveat**: apidirect does not disclose how it sources the
officially-closed platforms (Instagram, TikTok, LinkedIn), so that data is
treated as **best-effort**, never relied upon.

## Why
It buys back the whole point of the day: our time goes to the build, not to nine
OAuth dances and rate-limit regimes. The unified shape makes merging trivial
([[../../knowledge/one-shape-across-platforms|one shape across platforms]]), and
the reliable spine — X, Reddit, YouTube — stands on its own even if the
best-effort platforms go thin.

## When I'd revisit
If apidirect's reliability, pricing, or terms stop fitting — or if The Pulse ever
needs guarantees on the closed platforms — swap the data source. Because the
fetch lives behind a server route ([[adr-003-api-key-stays-server-side]]) and
everything downstream speaks the one unified shape, the source is replaceable
without touching the view.
