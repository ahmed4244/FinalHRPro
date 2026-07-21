# Projects — zone rules

Rules that apply to everything under `projects/`. These stack on top of the
vault's root CLAUDE.md.

## Required frontmatter
- `created` — YYYY-MM-DD, always.
- `type` — one of: project · adr · work-item.

## Conventions
- Each project is a folder with an `index.md` hub.
- Decisions are ADRs: `adr-NNN-<slug>.md`, numbered per project, status one of
  proposed · accepted · shipped.
- Work items are `wi-<slug>.md` and link back to the ADR they implement.
