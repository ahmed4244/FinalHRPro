---
title: Back up the database before every migration
type: learning
created: 2026-07-05
tags: [databases, habits]
---

# Back up the database before every migration

A migration changes the shape of your data in place. If it goes wrong halfway,
you want yesterday's copy, not an apology. One copy command before every
migration — the cost is seconds, the save is everything.

Related: [[why-sqlite-for-the-tracker]] — a single-file database makes the
backup literally one `cp`.
