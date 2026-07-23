---
title: "Cache and back off on 429"
type: adr
created: 2026-07-16
tags: [adr]
status: accepted
---

# ADR-004: Cache and back off on 429

## Context
apidirect's free tier is $5 credit plus **50 requests per endpoint per month**,
and a `429` means slow down
([[../../knowledge/apidirect-io-in-practice|apidirect in practice]],
[[../../knowledge/api-rate-limiting|API rate limiting]]). A one-topic view that
re-fetches on every keystroke would burn the month in minutes. Builds on
[[adr-003-api-key-stays-server-side]] — the server route is where this lives.

## Decision
- **Cache** each `(topic, platform)` result for a short TTL and serve the cache
  while iterating, so repeated looks cost nothing.
- On **429**, use exponential backoff, and show the partial results already in
  hand rather than failing the whole view.

## Why
Caching turns the scarce free tier into enough headroom to build against, and
backoff is basic etiquette that keeps access healthy. Both live in the server
route from [[adr-003-api-key-stays-server-side]], out of the client's reach.

## When I'd revisit
When real freshness needs appear, or when you move off the free tier and can
afford to re-fetch more often.
