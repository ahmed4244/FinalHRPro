---
name: my-vault
description: The vault tool. Use when the user says "save this",
  "record this decision", "we decided", "plan this", "break this down",
  or asks "what do I know about...". Reads run free. Every write goes
  through the vault command and stops for review.
---
Four verbs. Pick by what the user asked. Writes go through the counter
(the `vault` command) — the doctor checks the form; a clean form is accepted
first time.

CAPTURE (write) · "save this / capture this..."
1. Call: vault capture "<title>" --type <learning|reference> --zone <inbox/|knowledge/>
2. Always give a real title and a known type. Default zone is inbox/ — use
   knowledge/ only when the user says it belongs in the knowledge base.
3. It records status: proposed. Show the receipt, then STOP. The human signs at the gate.

RECORD A DECISION (write) · "record this decision", "we decided..."
1. Call: vault adr <project> "<the decision in words>"
2. The counter finds the next free number, writes type adr, status proposed,
   and links it from the project index.
3. Show the receipt, then STOP. The user reviews and commits.

BREAK DOWN A PROJECT (write) · "plan this", "break this down..."
1. Plan first: vault plan <project> "<the outcome>" --goal "<one line>"
2. Slice it:  vault scope <project> <plan-slug> "<the slice>"  (one per slice)
3. First steps: vault task <project> "<the work>" --scope <scope-slug>
4. Everything lands status: proposed / planned. Show the receipts and
   `vault tree <project>`, then STOP. The user reviews and commits.

RECALL (read) · "what do I know about..."
1. Read knowledge/index.md and follow its links, into projects too.
   (vault recent, vault search, and vault tree are quick entry points.)
2. Answer and cite the notes you used. Read only. No writes.
