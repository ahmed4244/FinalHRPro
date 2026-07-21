---
title: Debugging CORS errors without guessing
type: learning
created: 2026-06-24
tags: [debugging, http, cors]
---

# Debugging CORS errors without guessing

A CORS error is the **browser** refusing to hand your JS a response the server
already sent. The request usually *worked* — the block is on the read.

## The checklist
1. Read the exact console line — it names the missing header.
2. Is it a **preflight** (`OPTIONS`)? Then the server must answer `OPTIONS`
   with `Access-Control-Allow-Methods` + `-Headers`, not just the real verb.
3. `Allow-Origin` must match the *exact* origin (scheme + host + port), or `*`
   — but `*` can't be combined with credentials.

## The trap
It looks like a network bug; it's a **headers** bug. `curl` will happily succeed
while the browser blocks — because curl isn't enforcing CORS.

Related throttling headers: [[api-rate-limiting]].
