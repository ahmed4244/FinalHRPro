# hooks/

`vault-write-guard.sh` is the **live guard** as it stands at the end of Week 3 —
not a stub. Three laws:

1. **Committing is the human's signature** (Day 6) — `git commit` / `git push`
   from the AI are blocked with exit 2.
2. **Notes go through the doorway** (Day 10) — `Write`/`Edit` into
   `knowledge/`, `projects/`, `templates/`, `inbox/` are blocked; the door sign
   points at the `vault` command. Tool files (`bin/vault`, `doctor.sh`) stay on
   the bench: the AI may edit them, your diff review covers them.
3. **Deleting in the vault needs your hands** (Day 6, make-it-yours).

It is registered in `settings.json` as a `PreToolUse` hook watching
`Bash|Write|Edit`. The install script stages both files; restart Claude after
installing so the wiring loads.
