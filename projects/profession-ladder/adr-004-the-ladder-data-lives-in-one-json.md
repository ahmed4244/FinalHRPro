---
title: "The ladder data lives in one JSON"
type: adr
created: 2026-07-23
tags: [adr]
status: accepted
---

# ADR-004: The ladder data lives in one JSON

## Context
The app is **powered by Svelte** and has to *show* the ladder — the rungs, and for
each the requirements, certs, courses and projects. That content needs one home the
face can render, without the UI hard-coding facts that will change.

## Decision
The ladder's structured content lives in a single file,
**`frontend/src/lib/ladder.json`**: one array of rungs, each with its year mark,
scope, and lists of requirements / certifications / courses / projects. The
`/ladder` route imports it and renders it. The **prose** stays in the knowledge
notes; the **JSON is the render-ready mirror** of it.

## Why
One JSON keeps the UI a pure view over data — any team member can update a rung by
editing one file, and the render code never changes. It respects the SvelteKit
server boundary (a static import, no secrets) and it makes ADR-002's promise real: swap the rubric and you edit JSON,
not components. It is the same "data in one place, the view just reads it" move as
the rest of this command center.

## Why not read the vault Markdown directly
The face already reads the vault notes for the Knowledge and Projects pages. The
`/ladder` view wants a *designed*, at-a-glance layout (a visual ladder with badges
per rung), so a small purpose-shaped JSON beats parsing prose at render time. The
two stay in sync by hand — the notes are the source, the JSON is the mirror.

## When I'd revisit
If we outgrow a static file (per-user ladders, editing in the UI), we move the data
behind the vault engine's `/api` seam like the rest of the app.

Formalised in [[plan-reach-staff-in-ten-years]]
