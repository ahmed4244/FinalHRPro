---
title: "Model the ladder on the big-tech IC track"
type: adr
created: 2026-07-23
tags: [adr]
status: proposed
---

# ADR-002: Model the ladder on the big-tech IC track

## Context
Once the cluster is fixed ([[adr-001-choose-the-software-engineer-cluster]]), the
rungs need a source of truth. Several frameworks exist: the vendor-neutral **SFIA**
standard, **UAE public-sector IT grades**, and the **big-tech individual-contributor
(IC) career ladders** (Google L-series, Meta E-series, Dropbox IC-series).

## Decision
We model the rungs on the **big-tech IC track**: Software Engineer → **Senior
Software Engineer** (rung 1) → **Staff / Lead Software Engineer** (rung 2). SFIA
levels are kept only as an orientation cross-check, not as the primary rubric.

## Why
The big-tech ladder is the most **concrete and recognisable** version of the
software career — real titles, published competency matrices, and years-of-
experience bands a grader will recognise instantly. It gives us specific,
defensible requirements (scope, certs, courses, projects) for each rung instead of
abstract level descriptors.

## When I'd revisit
If the course wants an explicitly UAE-government or SFIA-graded ladder, we swap the
rubric and re-map the two rungs — the data model in
[[adr-004-the-ladder-data-lives-in-one-json]] is designed to survive that swap.

Formalised in [[plan-reach-staff-in-ten-years]]
