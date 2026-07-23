---
title: "The ladder tracks live work-item status"
type: adr
created: 2026-07-23
tags: [adr]
status: proposed
---

# ADR-005: The ladder tracks live work-item status

## Context
The `/ladder` view first rendered a **static** checklist from
[[adr-004-the-ladder-data-lives-in-one-json|the JSON]]. But the 12 work items
under the two promotion scopes **are** the promotion requirements, and this repo
already gives every work item a lifecycle status (`backlog → … → done`). A static
list can't tell you what you've actually finished — it can't be a *tracker*.

## Decision
The career-profile checklist reads the **live status of the work items** from the
vault engine, not a hardcoded list. A requirement shows **done** when its work
item's `status` is `done`. The page also writes: ticking a requirement calls a
new governed engine function (`trackRequirement`) that sets the work item to
`done` (untick → `backlog`), through the same single seam every other write uses.
The JSON ([[adr-004-the-ladder-data-lives-in-one-json]]) now holds only **rung
metadata** (title, year, theme, scope, experience, how-it's-judged); the
**checklist and progress come from the work items**.

## Why
- **It becomes a real tracker.** Finish a requirement anywhere — the board, the
  `vault` terminal command, or a tick on the ladder — and the checklist and the
  progress bars update on their own (the page re-reads the vault every few
  seconds, the same live-refresh the Inbox uses).
- **One source of truth.** The work items were always the requirements; now the
  view mirrors them instead of duplicating them, so they can never drift.
- **Ticking is a human move.** Marking a real-world requirement complete is the
  human's call, so it lives on the face — the same side of the gate as approving
  a task ([[../../knowledge/promotion-is-operating-at-the-next-level]]).

## When I'd revisit
If requirements should flow through `review` before counting as done (an approval
hop), or if a per-user profile means the status can't live on one shared work item.

Refines [[adr-004-the-ladder-data-lives-in-one-json]]; formalised in
[[plan-reach-staff-in-ten-years]].
