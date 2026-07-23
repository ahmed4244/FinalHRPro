---
title: The Pulse — project index
type: project
created: 2026-07-16
tags: [project, the-pulse]
status: active
---

# The Pulse

Your Day-12 build. A small app that takes a topic and shows, in one clean view,
what people are saying about it right now across platforms — so you can scan it
in 30 seconds instead of 30 minutes.

The app's code lives at `~/the-pulse/` (outside the vault). The **trail** — the
decision, the plan, the tasks — lives here. You drive the build through the
command center; the AI writes the code; you hold the judgment.

## Decisions
- [[adr-001-fetch-and-shape]] — how The Pulse fetches from apidirect + shapes results *(a skeleton — fill it in)*

## Plans
_Add yours: `vault plan the-pulse "a scannable one-topic pulse view"`_

## Work items
_Add 3–4 under the scope: `vault task the-pulse "fetch posts for a topic" --scope <scope-slug>`_

## Related knowledge
- [[../../knowledge/apidirect-quickstart|apidirect.io quickstart]]
- [[adr-002-mvp-shows-volume-and-voices]]
- [[adr-003-api-key-stays-server-side]]
- [[adr-004-cache-and-back-off-on-429]]
- [[adr-005-use-apidirect-io-as-the-data-source]]
- [[plan-a-scannable-one-topic-pulse-view]]
- [[scope-the-data-path]]
- [[scope-the-glance]]
- [[wi-proxy-apidirect-behind-a-server-route]]
- [[wi-fetch-the-core-platforms-and-merge-into-one-recency-list]]
- [[wi-cache-by-topic-and-platform-and-tolerate-gaps]]
- [[wi-topic-input-starts-a-pulse]]
- [[wi-the-ranked-list-labelled-by-source]]
- [[wi-volume-at-a-glance]]
- [[adr-006-call-apidirect-over-http-from-the-server-route-not-mcp]]
