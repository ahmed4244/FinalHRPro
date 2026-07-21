# The Week-4 Starter Vault — Day 13

The shared vault every student adopts on the morning of Day 13, so the whole
room starts Week 4 from the same known-good ground: a governed vault that has
already lived through Weeks 2 and 3. This repo root **is** the vault — the
installer places it at `~/vault`.

Coming from Week 3 with your own vault intact? You may keep yours. This repo
levels the room: anyone whose vault broke, drifted, or stayed thin adopts it
and stands exactly where everyone else stands.

## Install (Day 13, 09:00)

```bash
git clone https://github.com/jneaimi/command-center-starter-week4.git
bash command-center-starter-week4/install.sh
```

That's it. The installer archives your previous vault to `~/archive` (nothing
is deleted — it is your proof of Weeks 1–3), places this one at `~/vault`,
stages the `~/.claude` side, puts the `vault` command on your PATH, restores
the todo app if yours is missing, and **verifies everything** — you should see
`All checks passed`. Then open a **new** terminal:

```bash
cd ~/vault && claude
```

## What's inside — everything Weeks 2–3 built

```
CLAUDE.md                     the vault rules (now 8 — the doctor enforces them)
bin/vault                     Day 9-11: the doorway — capture (doctor-checked),
                              adr, plan, scope, task, done + the reads:
                              recent, search, tree
doctor.sh                     Day 7: the read-only check-up for the whole vault
knowledge/                    15 interlinked notes + index — incl. the Week 2-3 learnings
projects/task-tracker/        the full trail: adr-001…005, v1+v2 work items closed,
                              and version 3 already planned the work-model way:
                              plan-version-3-sync -> two scopes -> the open catch-all
inbox/                        4 captures at status: proposed — waiting for Day 14
templates/                    one per note type
setup/dot-claude/             the ~/.claude side (installer stages it):
                                CLAUDE.md        global rules
                                settings.json    the guard registered on Bash|Write|Edit
                                hooks/           vault-write-guard.sh — all three laws
                                skills/my-vault  the skill, rewired to the counter
setup/todo-app/todo.html      the task tracker, v2 (restore copy)
```

## Validate the adoption

In a Claude session started inside `~/vault`, say:

```
Run the doctor on my vault, then try: vault capture "" — and tell me what
happened in both cases. Read only otherwise, change nothing.
```

Expected: **clean bill of health**, and the empty capture **refused with a
clear reason** (exit 2). Two more, felt by hand:

```
write a file at knowledge/side-door-test.md with just a title line in it
```

→ blocked: *notes go through the doorway.* The wall holds.

```
save this to my vault: week four starts from known ground
```

→ the skill hands it to `vault capture`, the doctor passes it, it lands in
`inbox/` at `status: proposed`, and the AI stops. You review, you sign.

```
vault tree task-tracker
```

→ the work model on one screen: the version-3 plan, its two scopes, the open
catch-all under it — plan → scope → task, each with its status.

## The rules that never move

Non-sensitive content only. Reads run free; writes wait for your review. The
write path you own from memory: **sentence → skill → counter → doctor → vault
(`proposed`) → your signature.** This week, that path gets a face.
