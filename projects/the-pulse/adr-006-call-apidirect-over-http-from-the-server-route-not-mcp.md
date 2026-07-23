---
title: "Call apidirect over HTTP from the server route, not MCP"
type: adr
created: 2026-07-16
tags: [adr]
status: proposed
---

# ADR-006: Call apidirect over HTTP from the server route, not MCP

## Context
apidirect exposes two front doors: a REST API (`X-API-Key` + `GET /v1/...`) for
programs, and an MCP server for AI agents (Claude, Cursor, ChatGPT). The Pulse's
request path has no LLM in it — a topic goes in, a list comes out — so the only
question is which door the server route uses. Builds on
[[adr-003-api-key-stays-server-side]].

## Decision
The Pulse calls apidirect over plain **HTTP** (a server-side `fetch`) from the
route, not over MCP. MCP stays an optional developer convenience — querying
apidirect from a local Claude client while exploring — never part of the app.

## Why
MCP exists to let a model choose and call tools mid-conversation; nothing in The
Pulse's runtime is a model choosing tools. A direct fetch is simpler to test, and
it keeps caching and `429` backoff ([[adr-004-cache-and-back-off-on-429]]) under
our own control rather than behind a protocol.

## When I'd revisit
If The Pulse ever becomes agentic — a model reasoning over results and deciding
follow-up queries — MCP would earn its place.
