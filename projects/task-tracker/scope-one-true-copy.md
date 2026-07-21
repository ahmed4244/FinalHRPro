---
title: "One true copy — the server keeps the list"
type: scope
created: 2026-07-14
tags: [scope]
status: proposed
parent: "[[plan-version-3-sync]]"
---

# One true copy — the server keeps the list

The server side of [[plan-version-3-sync]]: the list moves from the browser's
localStorage into SQLite behind a small API ([[adr-001-stack-choice]]), so
there is exactly one place where the truth lives. Server code stays behind
the boundary — [[../../knowledge/sveltekit-server-boundary|the server
boundary note]].
