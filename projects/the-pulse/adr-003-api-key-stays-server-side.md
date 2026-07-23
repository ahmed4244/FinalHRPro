---
title: "API key stays server-side"
type: adr
created: 2026-07-16
tags: [adr]
status: proposed
---

# ADR-003: API key stays server-side

## Context
apidirect authenticates with one header, `X-API-Key`
([[../../knowledge/apidirect-io-in-practice|apidirect in practice]]). Any secret
shipped to the browser is a leaked secret
([[../../knowledge/env-vars-and-secrets|env vars and secrets]]). The Pulse is a
web app, so it needs a place to hold that key the client never sees. Builds on
[[adr-001-fetch-and-shape]].

## Decision
The `X-API-Key` never reaches the browser. The Pulse calls apidirect from a
**server route** — a SvelteKit server endpoint / thin proxy
([[../../knowledge/sveltekit-server-boundary|the server boundary]]) — reading the
key from `$APIDIRECT_KEY`. The client calls only our own route, never apidirect
directly.

## Why
It is the one rule that never moves: a client-side key can be read by anyone and
spends your credit. Routing through the server keeps the key on the server and
gives one place to add caching and backoff later.

## When I'd revisit
Never for the rule itself. The proxy's shape (serverless function, edge, a small
API) can change freely.
