# The face of your command center

A small **SvelteKit** app that gives your vault a face — a read surface + the
Human-Gate inbox. It reads the vault files next to it, keeps them in an
in-memory index, and lets you approve or reject proposals through one governed door.

## Run it

```bash
cd frontend
npm install
npm run dev
```

Then open **http://localhost:5180**.

By default it reads the vault in the folder above `frontend/` (this repo). To
point it at a vault somewhere else:

```bash
VAULT_DIR=~/vault npm run dev
```

## What's inside (the four mechanics of Day 15)

| File | Mechanic |
|---|---|
| `src/lib/server/vault.js` | **load** the vault · keep an **index** · **search** it · re-read only on **change** |
| `src/routes/+page.*` | Home — recent notes + search |
| `src/routes/note/[slug]/+page.*` | read one note |
| `src/routes/inbox/+page.*` | the **Human Gate** — approve routes a proposal into `knowledge/`, reject logs it |
| `src/app.css` (`:root`) | your **design tokens** — change 4 lines to re-brand the whole face |

The pages never touch the disk themselves — they ask `vault.js` through the
`/api` seam. That one boundary is what keeps the face and the engine apart.

## Make it yours (homework / stretch)

- Change the four tokens in `src/app.css` to your Day-14 palette.
- Add a **projects** view. Add a **graph** of your links. Add filters.
- Deploy it (the Node adapter builds with `npm run build` → `npm run preview`).
