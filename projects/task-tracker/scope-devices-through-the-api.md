---
title: "Devices through the API"
type: scope
created: 2026-07-14
tags: [scope]
status: proposed
parent: "[[plan-version-3-sync]]"
---

# Devices through the API

The client side of [[plan-version-3-sync]]: laptop and phone each read and
write through the API only — no device keeps a private truth. Two devices
talking to one API is where cross-origin rules bite:
[[../../knowledge/debugging-cors|the CORS note]].
