---
title: "A scannable one-topic pulse view"
type: plan
created: 2026-07-16
tags: [plan]
status: proposed
goal: "A scannable one-topic pulse view"
---

# A scannable one-topic pulse view

## Goal
Type a topic and see, in one glance, what people are saying about it right now
across the core platforms — a recency-sorted, source-labelled list you can read
in 30 seconds.

## Why now
The decisions are set: the data source
([[adr-005-use-apidirect-io-as-the-data-source]]), how we fetch and shape it
([[adr-001-fetch-and-shape]]), and what the view shows
([[adr-002-mvp-shows-volume-and-voices]]). This plan turns those decisions into
the smallest shippable build.

## Shape
Two slices: [[scope-the-data-path]] — the server route that fetches, merges, and
caches — and [[scope-the-glance]] — the one screen that renders it. The data path
holds the key ([[adr-003-api-key-stays-server-side]]) and the caching
([[adr-004-cache-and-back-off-on-429]]); the glance holds the 30-second promise
([[../../knowledge/scannable-in-30-seconds|scannable in 30 seconds]]).
