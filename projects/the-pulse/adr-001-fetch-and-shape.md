---
title: How The Pulse fetches and shapes results
type: decision
created: 2026-07-16
tags: [decision, the-pulse]
status: accepted
---

# ADR-001 — How The Pulse fetches and shapes results

> This is a **skeleton**. The Context is written for you; the judgment is yours.
> Fill in the Decision, Why, and Revisit sections — that's the point of today.

## Context
The Pulse needs live data about one topic across social platforms. apidirect.io
offers one API — `X-API-Key` header → `GET /v1/{platform}/posts?query=<topic>` —
returning a unified `{ title, url, date, author, snippet, source }`. This decision
records how the app gets that data and turns it into one clean view.
See [[../../knowledge/apidirect-quickstart|the apidirect quickstart]].

## Decision
_Fill in: which platform(s) for the core? one call or several? where does the key
live (an env var)? how do you shape the response into your "one clean view"?_

## Why
_Fill in: why this is the smallest thing that solves the problem today._

## When I'd revisit
_Fill in: what would push you to add platforms, a search box, filters, or a backend._
