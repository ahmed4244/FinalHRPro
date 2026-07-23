# Profession Ladder

A career-progression **tracker** for the **Software Engineer** cluster — our course
final project. It maps the path a software engineer climbs over ten years, from a
bachelor's degree to Staff Engineer, and tracks every requirement along the way as
an interactive, self-updating checklist.

> **Software Engineer** (today) → **Senior Software Engineer** (Year 5) → **Staff / Lead Software Engineer** (Year 10)

Built on a markdown **vault** (the research and the plan) with a **SvelteKit** face
that renders it as a live career profile at `/ladder`.

## What it does

- **Career profile & tracker** (`/ladder`) — a dashboard of your promotion path: an
  overall progress ring, per-promotion progress, and the full requirement checklist
  for each rung. Filter by status or category; tick a requirement and it saves.
- **Live checklist** — each requirement is a work item in the vault. Ticking it done
  writes to the vault; the progress rings and bars update on their own. Finish a task
  from the board or the terminal and the tracker reflects it too (it auto-syncs).
- **Grounded content** — the requirements (certifications, courses, projects,
  experience bands) are drawn from public engineering career ladders (Dropbox,
  GitLab, CircleCI), the FAANG level maps, and Will Larson's *Staff Engineer*.

## The two promotions

| Year | Rung | The jump | What it takes (in brief) |
|---|---|---|---|
| 0 | **Software Engineer** | you are here — a bachelor's, ~0 yrs | finish well-defined tasks |
| +5 | **Senior Software Engineer** | own a feature/service end-to-end | AWS SA-Associate · system design + DDIA · own a service · lead a project · mentor |
| +10 | **Staff / Lead Software Engineer** | set direction across teams | AWS SA-Professional · Staff-track reading · build a platform · lead a migration · own a strategy |

The full detail for each rung lives in `knowledge/`, and the concrete, trackable
checklist lives as work items under `projects/profession-ladder/`.

## Run it

```bash
cd frontend
npm install
npm run dev          # open the printed URL, then go to /ladder
```

To run the built server:

```bash
cd frontend && npm run build
VAULT_DIR=<path-to-this-repo> PORT=5180 node build
```

## How the tracker works

The checklist is not hardcoded — it reads the **live status** of the work items in
the vault:

- Each promotion requirement is a work item (`projects/profession-ladder/wi-*.md`)
  with a `status` (`backlog → done`).
- Tick a requirement on `/ladder` and the app writes `done` to that file through the
  vault engine; untick returns it to `backlog`.
- The page re-reads the vault every few seconds, so a requirement completed anywhere
  shows as done here automatically.

Every design choice is recorded as an **ADR** (`projects/profession-ladder/adr-*.md`),
and `doctor.sh` validates the whole vault (frontmatter, note types, kebab-case names,
no dangling links).

## Structure

```
knowledge/                     the career-ladder notes — the map and each rung
  software-engineer-career-ladder.md
  senior-software-engineer.md
  staff-software-engineer.md
  the-scope-ladder-task-to-org.md
  promotion-is-operating-at-the-next-level.md
projects/profession-ladder/    the trail: ADRs · plan · scopes · work items
frontend/                      the SvelteKit tracker (the /ladder view)
doctor.sh                      the vault validator
```

## Team

Built by our five-member team as the course final project.
