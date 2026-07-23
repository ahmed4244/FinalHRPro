---
name: addpath
description: Add a new career-ladder path (major/cluster) to the tracker. Use when
  the user says "/addpath <major>", "add a path", "add a new major", "create a
  ladder for <field>" — e.g. "/addpath cyber security", "/addpath data science".
  It researches the field's two promotions over ten years and generates the path
  JSON + the vault project so a new tab appears on /ladder.
---

Goal: given a major/cluster (the argument), generate a complete new **career-ladder
path** — a `frontend/src/lib/paths/<slug>.json` plus a vault project of work items —
so it shows up as a new tab on the `/ladder` tracker and its requirements are
trackable. Two paths already exist as worked examples to copy exactly: **Software
Engineer** (`profession-ladder`) and **Cyber Security** (`cyber-security-ladder`).

Work from the repo root (the vault). All paths render at `/ladder`.

## 1 — Derive the names (one major in → four names)
From the argument (e.g. `cyber security`):
- **slug** = kebab-case of the major → `cyber-security`
- **cluster** = Title Case display name → `Cyber Security`
- **project** = `<slug>-ladder` → `cyber-security-ladder` (the vault folder)
- **order** = the next free integer (count existing `frontend/src/lib/paths/*.json` + 1)

The model is always the same: start at the **entry rung** (bachelor's, ~0 yrs), then
**two promotions, one every five years** (Year 5 and Year 10).

## 2 — Research the ladder
Gather, for this field, the real progression (use web search when available):
- The **three rung titles**: entry → first promotion (Year 5) → second promotion (Year 10).
- For each promotion: a one-word **theme**, a one-line **scope** (the jump), the
  typical **experience** band, and how the promotion is **evaluated**.
- **~6 requirements per promotion**, each tagged with a **category** — use these four:
  `certification`, `course`, `project`, `leadership`. Name *real* certs, books/courses,
  and concrete project types (not vague filler). Mirror the mix in the examples
  (roughly: 1 certification, 1 course, 3 projects, 1 leadership per rung).

## 3 — Create the files
Copy the structure of `cyber-security-ladder` / `cyber-security.json` exactly, with
the new field's content. Filenames are **kebab-case**; every note has frontmatter
`title, type, created` (today's date, YYYY-MM-DD), `tags`.

**a. Path JSON** — `frontend/src/lib/paths/<slug>.json`:
```json
{
  "slug": "<slug>", "project": "<slug>-ladder", "order": <n>,
  "cluster": "<Cluster>", "horizonYears": 10, "cadenceYears": 5,
  "tagline": "<one line>",
  "start": { "title": "<entry title>", "year": 0, "note": "You are here — ..." },
  "rungs": [
    { "n": 1, "title": "<rung1>", "year": 5, "theme": "<word>", "scope": "...",
      "experience": "...", "noteSlug": "<rung1-note>",
      "scopeSlug": "scope-promotion-1-<slug-ish>", "evaluated": "..." },
    { "n": 2, "title": "<rung2>", "year": 10, "theme": "<word>", "scope": "...",
      "experience": "...", "noteSlug": "<rung2-note>",
      "scopeSlug": "scope-promotion-2-<slug-ish>", "evaluated": "..." }
  ]
}
```

**b. Vault project** — `projects/<slug>-ladder/`:
- `index.md` — `type: project, status: active`; links every ADR/plan/scope/work item.
- `plan-<...>.md` — `type: plan, status: proposed`, and a **`goal:`** line (required).
- `scope-promotion-1-<...>.md` and `scope-promotion-2-<...>.md` — `type: scope,
  status: proposed`, and a **`parent: "[[plan-<...>]]"`** line (required). Their
  filenames MUST equal the `scopeSlug` values in the JSON.
- **~6 `wi-<...>.md` per scope** — `type: work-item, status: backlog`,
  `tags: [work-item, <category>]` (the category drives the coloured chip),
  `parent: "[[scope-promotion-N-<...>]]"`. Keep each to a few lines + a "Done when:".

**c. Knowledge notes** (so "Read the full rung" links work) — `type: reference`:
- `knowledge/<slug>-career-ladder.md` (the map) and one note per rung
  (`knowledge/<rung1-note>.md`, `knowledge/<rung2-note>.md`), matching the JSON's
  `noteSlug`s. Link them into `knowledge/index.md`. (If you skip these, omit
  `noteSlug` from the JSON — the tracker just drops that one link.)

**Wiring is by convention, so double-check these three match up:**
- JSON `project` === the `projects/<...>/` folder name.
- JSON `scopeSlug` === the scope filename === each work item's `parent`.
- JSON `noteSlug` === a real `knowledge/<...>.md` filename.

## 4 — Validate
Run `bash doctor.sh` from the repo root. It must print **clean bill of health**
(frontmatter present, known types, kebab-case, no dangling links, plans have a goal,
scopes have a parent). Fix anything it flags — usually a wikilink whose target file
doesn't exist.

## 5 — Report
Tell the user the new tab is live: `cd frontend && npm run dev`, open `/ladder`, and
the new major appears as a tab with its own checklist. New work items start at
`status: backlog` (unticked). Nothing needs wiring in code — the registry picks the
JSON up automatically.

> Note: if the `vault-write-guard` hook is installed (it blocks hand-writing vault
> files), create the `projects/` + `knowledge/` content through the `vault` command
> verbs instead (`vault plan/scope/task`, `vault capture`); the JSON under
> `frontend/` is app code, so it's written directly either way.
