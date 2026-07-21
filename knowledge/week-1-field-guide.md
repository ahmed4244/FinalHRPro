---
title: Week 1 Field Guide
type: reference
created: 2026-06-20
tags: [week-1, reference, onboarding]
---

# UAEN Full-Stack AI · Week 1 Field Guide

*Your reference for everything we built in Week 1 — the concepts, the words, the examples, and where every file lives. Keep it open on Day 4. If you like, drop it into your new vault as your first reference note.*

---

## 1 · The big picture

Everything this week rests on four ideas. If you remember only these, you're fine.

- **The vault is one home for what you know.** Plain text files (markdown) in one folder, tracked by git. No database, no lock-in — you can read every file yourself.
- **The AI works through a doorway.** You ask in plain language; the AI *proposes* a change (a new note, an edited file). Nothing lands until you say so.
- **You review every write — the auditability line.** Before anything is saved for good, you look at it (`git diff`) and commit it. The AI drafts; **you** are the gate. This never changes, from a warehouse to a knowledge base to a whole team.
- **Readable by humans, consumable by AI.** The same note serves both. You can read it; the AI can walk it. That dual-use is the whole point of the shape we build.

> **The one-line model:** *The vault is the surface. The CLI is the doorway. You review every write.*

---

## 2 · The two homes — where everything lives

Two folders matter. One holds **what you know**. The other holds **how the AI behaves**.

### `~/vault` — your knowledge

```
~/vault/
├─ inbox/          raw captures — unsorted, temporary
├─ knowledge/      your real notes live here
│   └─ index.md    the front door — where the AI starts
├─ projects/       one folder per project
├─ templates/      ready-made note shapes you copy
└─ CLAUDE.md       this vault's rules (project level)
```

*Everything here is yours, in plain text, under git. Delete the AI tomorrow and your knowledge is untouched.*

### `~/.claude` — how the AI behaves

```
~/.claude/
├─ CLAUDE.md              GLOBAL rules — load in EVERY session, any folder
└─ skills/
    └─ <skill-name>/
        └─ SKILL.md       one capability the AI can run on its own
```

*This folder configures the assistant itself — not your knowledge. Your skills and your global rules live here.*

### Which file does what

| File | Where | What it does |
|---|---|---|
| **Note** | `~/vault/knowledge/*.md` | A single thing you know, with frontmatter + links |
| **`index.md`** | `~/vault/knowledge/` | The hub the AI reads first, then follows links out |
| **Template** | `~/vault/templates/*.md` | A blank note shape you copy for consistency |
| **Vault `CLAUDE.md`** | `~/vault/CLAUDE.md` | Rules for *this vault only* (note types, structure) |
| **Global `CLAUDE.md`** | `~/.claude/CLAUDE.md` | Standing rules for *every* session (where your vault is, how to treat any note) |
| **`SKILL.md`** | `~/.claude/skills/<name>/` | A capability + the words that trigger it |

---

## 3 · Glossary — every word we used

| Term | What it is | Tiny example |
|---|---|---|
| **Vault** | One folder that holds all your notes, under git | `~/vault` |
| **Note** | One markdown file = one thing you know | `gx-200-gearbox.md` |
| **Frontmatter** | The `---` block at the top of a note; structured labels the AI can filter on | `type: part`<br>`nato_class: 3110` |
| **Wikilink `[[ ]]`** | A link from one note to another by name; the thread the AI follows | `[[gx-200-gearbox]]` |
| **Index** | The hub note; where the AI starts before walking out | `knowledge/index.md` |
| **Template** | A ready-made note shape you copy so every note looks the same | `templates/part.md` |
| **Orphan** | A note nothing links to — invisible to the graph | *(a note missing from the index)* |
| **Dangling link** | A `[[link]]` pointing at a note that doesn't exist — breaks trust | `[[warehouse-b]]` when there's no `warehouse-b.md` |
| **Knowledge graph** | All your notes + the links between them; what the AI walks to answer | index → assembly → parts |
| **Skill** | A capability the AI runs on its own — a command that can trigger itself | `/add-part` |
| **Trigger** | The words in a skill's description that wake it | *"add this part…"* |
| **Global `CLAUDE.md`** | Rules that load in **every** session, any folder | `~/.claude/CLAUDE.md` |
| **Vault `CLAUDE.md`** | Rules for **this vault only** | `~/vault/CLAUDE.md` |
| **kebab-case** | Lowercase words joined by hyphens — one predictable naming style | `gx-200-gearbox`, not `GX 200 Gearbox` |
| **The doorway / review gate** | You review the AI's write before it's saved | `git diff` before `git commit` |
| **Auditability line** | The rule that no change lands without your review | *you* commit, not the AI |
| **NATO supply class** *(mission term)* | The 4-digit code that classifies a spare part | bearings `3110`, pumps `4320` |

---

## 4 · The eight moves (what you did all week)

Every hands-on step this week was one of these eight. Day 4 is the same eight — pointed at a new subject.

1. **Capture** — get a thought into a file (`inbox/`, then a real note).
2. **Frontmatter** — add the `---` labels so the AI can filter and sort.
3. **Link** — connect notes with `[[wikilinks]]`. No orphans, no dangling links.
4. **Index** — build the hub note the AI reads first.
5. **Template** — make a reusable shape so every note is consistent.
6. **Convention** — write a rule in `CLAUDE.md` so you don't repeat yourself.
7. **Skill** — teach the AI a capability it can run on its own.
8. **Retrieve** — ask a question; watch the AI walk *your* links and cite *your* notes.

---

## 5 · The transfer map — warehouse → knowledge base

Everything you learned on the warehouse maps one-to-one onto a knowledge base. Same moves, new subject.

| Warehouse (you learned) | Knowledge base (you build) |
|---|---|
| The vault | Same — one home for everything |
| A part note | A knowledge note — a learning, a decision, a reference |
| `nato_class` | `type` + `tags` |
| An assembly (groups parts) | A topic or project (groups notes) |
| The index | `knowledge/index.md` |
| The part template | A note template (learning / decision / reference) |
| The `add-part` skill | A "capture note" skill — "save this to my KB" |
| Warehouse `CLAUDE.md` | Your vault `CLAUDE.md` — this vault's rules |
| Walk the graph | Ask your KB a question — it walks your notes |
| **You review every write** | **Still you, at the doorway — unchanged** |

---

## 6 · Worked examples

Small, real examples of each shape. Read them to remember the form — then build your own.

### A note (with frontmatter + a link)

```markdown
---
type: part
part_no: GX-200-04
name: Bearing set (front)
nato_class: 3110
warehouse: A
supplier: RollTech
assembly: gx-200-gearbox
---
Front bearing set for the GX-200 gearbox.

## Links
- assembly: [[gx-200-gearbox]]
```

*The frontmatter is labels the AI filters on (`supplier: RollTech` → "show me everything from RollTech"). The `[[wikilink]]` is the thread it walks.*

### An index (the hub)

```markdown
# Warehouse A — index

## Assemblies
- [[gx-200-gearbox]]

## Warehouses
- [[warehouse-a]]
```

### Global `CLAUDE.md` — loads in every session

```markdown
# My rules

My knowledge vault lives at ~/vault. When working there:
- Non-sensitive content only.
- Dates YYYY-MM-DD. Names in kebab-case.
- Frontmatter on every note. Keep index.md updated. Link notes — no orphans.
```

### Vault `CLAUDE.md` — rules for this vault only

```markdown
# Vault rules
1. Only ever work with non-sensitive content.
2. Note types: learning, decision, reference, project. One template per type.
```

### A skill (`~/.claude/skills/add-part/SKILL.md`)

```markdown
---
name: add-part
description: Use when the user says "add this part" with a part number, name,
  and supplier. Creates an inventory note with correct frontmatter and a
  proposed NATO class, ready for review.
---
When the user asks to add a part:
1. Create inventory/<PART_NO>.md with the right frontmatter.
2. Propose the 4-digit NATO class from the item type. If unsure, write "?" and say so.
3. Show what you created and STOP — the user reviews and commits.
```

*The `description` is the **trigger** — the words that wake the skill. The body is what it does. Notice the last line: it stops at the doorway.*

---

## 7 · Terminal cheat-sheet

The only commands you need. You learned these on Day 1–2; nothing new is required.

| Command | What it does |
|---|---|
| `cd ~/vault` | Go into a folder |
| `ls` | List what's in the current folder |
| `code .` | Open the current folder in VS Code (edit files here) |
| `mkdir knowledge` | Make a new folder |
| `git init` | Start tracking a folder with git |
| `git add -A` | Stage all your changes |
| `git diff` | **See what changed — the review gate** |
| `git commit -m "..."` | Save your changes for good (with a message) |
| `git status` / `git log` | See what's changed / your history |
| `claude` | Start the AI |

> **All file creation and editing happens in VS Code** — right-click a folder → New File → name it → paste → **⌘S**. The terminal is only for `cd`, `git`, `code`, and `claude`.

---

## 8 · Using this guide on Day 4

On Day 4 you archive the warehouse and build your **own** knowledge base from scratch — same eight moves, your subject. Two ways this guide helps:

1. **As a reference.** Keep it open. When you forget what a wikilink is or where the global `CLAUDE.md` lives, it's all here.
2. **As your first note (optional).** Want a real note in your vault on minute one? Save this file into `~/vault/knowledge/`, add a frontmatter block at the top, and link it from your index:

   ```markdown
   ---
   type: reference
   title: Week 1 Field Guide
   tags: [week-1, reference, onboarding]
   created: 2026-07-02
   ---
   ```

   Then add `- [[week-1-field-guide]]` to `knowledge/index.md`. Now your very first note is already in the graph — no orphan.

---

*You built the shape on a warehouse. On Day 4 you point it at your own knowledge. The moves don't change — and neither does the rule that you review every write.*
