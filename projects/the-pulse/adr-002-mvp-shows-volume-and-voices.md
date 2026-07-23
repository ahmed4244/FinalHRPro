---
title: "MVP shows volume and voices"
type: adr
created: 2026-07-16
tags: [adr]
status: accepted
---

# ADR-002: MVP shows volume and voices

## Context
[[../../knowledge/social-listening|Social listening]] names four signals a pulse
could show — volume, voices, sentiment, themes. The Pulse cannot build all four
on day one, and every extra signal costs build time and clutters the 30-second
glance ([[../../knowledge/scannable-in-30-seconds|scannable in 30 seconds]]).
This decision fixes what v1 shows. It builds on the fetch-and-shape spine in
[[adr-001-fetch-and-shape]].

## Decision
v1 shows exactly two signals:
- **Volume** — how many recent posts came back, and a loud/quiet read.
- **Voices** — the top few posts, ranked, each labelled by its `source`.

Sentiment and themes are deferred.

## Why
This is the smallest honest pulse: volume + voices already answers the glance
question ("is this topic loud, and what are the loudest voices saying?") without
a model or extra UI. Holding the line here keeps the first build shippable.

## When I'd revisit
Add **sentiment** first — it is a parameter, not a build: apidirect's
`get_sentiment` returns it on demand
([[../../knowledge/apidirect-io-in-practice|apidirect in practice]]). Add
**themes** once the core view feels right.
