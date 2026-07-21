---
title: apidirect.io quickstart
type: reference
created: 2026-07-16
tags: [reference, api, apidirect]
---

# apidirect.io quickstart

One standard API across LinkedIn, X, Reddit, YouTube, Instagram, TikTok and more —
the data helper for the Day-12 build. A helper, not a rule: bring your own data
source if you'd rather.

## Auth
One header: `X-API-Key: <your-key>`. Keep the key in an env var
(`export APIDIRECT_KEY=...`) — never in code. See [[env-vars-and-secrets]].

## The one call
```
GET https://apidirect.io/v1/{platform}/posts?query=<topic>&sort_by=most_recent
```

## The unified result
Every platform returns the same shape:
```
{ "results": [ { title, url, date, author, snippet, source }, … ] }
```

## Free tier + etiquette
$5 credit + 50 requests / endpoint each month · no card to start · daily spend caps.
Cache a result while you iterate; a `429` means slow down — see [[api-rate-limiting]].

Used by [[../projects/the-pulse/index|The Pulse]].
