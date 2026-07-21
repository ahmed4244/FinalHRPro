---
title: Environment variables and secrets
type: reference
created: 2026-06-27
tags: [security, config, secrets]
---

# Environment variables and secrets

Secrets never belong in source. They load from the environment at boot.

## The rules
- No API keys, tokens, or passwords hardcoded in files.
- `.env` is in `.gitignore` — always. Verify before the first commit.
- Never log a secret value — mask it in error messages.
- On the server only (see [[sveltekit-server-boundary]]) — never ship a secret
  to the client bundle.

## Quick check before committing
`git diff --staged` and scan for anything that looks like a key. The review gate
catches secrets too, not just logic.
