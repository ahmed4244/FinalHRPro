---
title: Version 1 ships as one HTML file using localStorage
type: adr
created: 2026-07-07
tags: [adr, scope]
status: shipped
---

# ADR-004 — Version 1 ships as one HTML file using localStorage

## Status
shipped — version 1 built and demoed on Day 8

## Context
Version 1 must ship in one build day, be testable by opening a file in a
browser, and need zero setup on a locked-down machine. The SvelteKit + SQLite
stack ([[adr-001-stack-choice]]) is right for sync, but sync is version 3.

## Decision
Version 1 is a single `todo.html` — plain HTML, CSS and JavaScript, saving to
localStorage (the browser's own small notebox). No server. The SvelteKit and
SQLite choice stays as the later target for [[wi-sync-across-devices]].

## Consequences
- Anyone can run it: double-click the file.
- The list lives in one browser on one machine — that limit is what
  [[wi-sync-across-devices]] exists to remove.
- All five version-1 features fit one readable file.
