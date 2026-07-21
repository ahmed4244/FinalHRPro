// ─────────────────────────────────────────────────────────────────────────
//  vault.js — the engine behind the face. The ONLY place that touches the
//  vault files. Pages ask it through the /api seam; they never read the disk.
//
//  Day-15 mechanics:  1·LOAD  2·LIST (in-memory index)  3·SEARCH  4·CHANGES
//  The Human Gate:  commit a proposed ADR or plan (proposed → accepted),
//  or reject it. Scopes & tasks live under their project, not in the gate.
// ─────────────────────────────────────────────────────────────────────────
import { readdirSync, readFileSync, writeFileSync, unlinkSync, statSync, existsSync, appendFileSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';

const VAULT_DIR = process.env.VAULT_DIR ? resolve(process.env.VAULT_DIR) : resolve(process.cwd(), '..');
const ZONES = ['inbox', 'knowledge'];

// ── the in-memory index (mechanic 2), refreshed only on change (mechanic 4) ──
let index = { notes: [], projects: [], stamp: '' };

function stamp() {
  let s = '';
  for (const z of [...ZONES, 'projects']) {
    const d = join(VAULT_DIR, z);
    if (existsSync(d)) s += z + statSync(d).mtimeMs + ';';
  }
  return s;
}

function parse(file) {
  const raw = readFileSync(file, 'utf-8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const body = (m ? m[2] : raw).trim();
  const fm = {};
  for (const line of (m ? m[1] : '').split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return { fm, body, excerpt: body.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))[0]?.slice(0, 150) || '' };
}

function noteFrom(file, zone) {
  const { fm, body, excerpt } = parse(file);
  const slug = basename(file, '.md');
  return {
    slug, zone, body, excerpt,
    title: fm.title || slug,
    type: fm.type || 'note',
    created: fm.created || '',
    status: fm.status || '',
    tags: (fm.tags || '').replace(/[[\]]/g, '').split(',').map((t) => t.trim()).filter(Boolean)
  };
}

// a project artifact: classify by filename prefix (adr- / plan- / scope- / wi-)
function kindOf(slug) {
  if (slug.startsWith('adr-')) return 'adr';
  if (slug.startsWith('plan-')) return 'plan';
  if (slug.startsWith('scope-')) return 'scope';
  if (slug.startsWith('wi-') || slug.startsWith('task-')) return 'task';
  return 'note';
}

function artFrom(file, project) {
  const { fm, body, excerpt } = parse(file);
  const slug = basename(file, '.md');
  return {
    project, slug, body, excerpt,
    kind: kindOf(slug),
    title: fm.title || slug,
    status: fm.status || '',
    created: fm.created || '',
    goal: fm.goal || ''
  };
}

// LOAD (mechanic 1): read everything once; re-read only when the vault changed.
function build() {
  const s = stamp();
  if ((index.notes.length || index.projects.length) && s === index.stamp) return index;

  const notes = [];
  for (const zone of ZONES) {
    const dir = join(VAULT_DIR, zone);
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir)) {
      if (f.endsWith('.md') && f !== 'index.md') notes.push(noteFrom(join(dir, f), zone));
    }
  }
  notes.sort((a, b) => (b.created || '').localeCompare(a.created || ''));

  const projects = [];
  const pdir = join(VAULT_DIR, 'projects');
  if (existsSync(pdir)) {
    for (const name of readdirSync(pdir)) {
      const dir = join(pdir, name);
      if (!existsSync(dir) || !statSync(dir).isDirectory()) continue;
      const arts = [];
      let home = null;
      for (const f of readdirSync(dir)) {
        if (!f.endsWith('.md')) continue;
        if (f === 'index.md') { home = parse(join(dir, f)); continue; }
        arts.push(artFrom(join(dir, f), name));
      }
      arts.sort((a, b) => (b.created || '').localeCompare(a.created || ''));
      projects.push({
        name,
        title: home?.fm.title || name,
        status: home?.fm.status || 'active',
        goal: home?.fm.goal || '',
        artifacts: arts
      });
    }
  }
  index = { notes, projects, stamp: s };
  return index;
}

function forget() { index = { notes: [], projects: [], stamp: '' }; }

// ── reads (run free) ──
export const recent = (n = 8) => build().notes.filter((x) => x.zone === 'knowledge').slice(0, n);
export const byZone = (zone) => build().notes.filter((x) => x.zone === zone);
export const getNote = (slug) => build().notes.find((x) => x.slug === slug) || null;
export const captures = () => build().notes.filter((x) => x.zone === 'inbox' && x.status === 'proposed');

export const projects = () => build().projects;
export const project = (name) => build().projects.find((p) => p.name === name) || null;
export const getArtifact = (name, slug) => project(name)?.artifacts.find((a) => a.slug === slug) || null;

// The Human Gate queue: proposed ADRs and plans, across every project.
export function pendingDecisions() {
  const out = [];
  for (const p of build().projects)
    for (const a of p.artifacts)
      if ((a.kind === 'adr' || a.kind === 'plan') && a.status === 'proposed') out.push(a);
  return out;
}

export const counts = () => {
  const { notes } = build();
  return {
    knowledge: notes.filter((n) => n.zone === 'knowledge').length,
    projects: build().projects.length,
    inbox: pendingDecisions().length,
    captures: notes.filter((n) => n.zone === 'inbox' && n.status === 'proposed').length
  };
};

// SEARCH (mechanic 3): notes + project artifacts, by title / body.
export function search(q) {
  q = (q || '').toLowerCase().trim();
  if (!q) return [];
  const hit = (t, b) => t.toLowerCase().includes(q) || b.toLowerCase().includes(q);
  const notes = build().notes.filter((n) => hit(n.title, n.body)).map((n) => ({ ...n, href: `/note/${n.slug}` }));
  const arts = build().projects.flatMap((p) => p.artifacts).filter((a) => hit(a.title, a.body))
    .map((a) => ({ ...a, href: `/projects/${a.project}/${a.slug}` }));
  return [...notes, ...arts];
}

// ── the Human Gate: the governed writes ──
function artFile(name, slug) { return join(VAULT_DIR, 'projects', name, slug + '.md'); }

// COMMIT: greenlight a proposed ADR or plan for implementation (→ accepted).
export function commit(name, slug) {
  const file = artFile(name, slug);
  if (!existsSync(file)) throw new Error(`no such item: ${name}/${slug}`);
  const a = getArtifact(name, slug);
  if (a && a.kind !== 'adr' && a.kind !== 'plan') throw new Error('only ADRs and plans are committed here');
  writeFileSync(file, readFileSync(file, 'utf-8').replace(/^status:.*$/m, 'status: accepted'));
  forget();
  return { name, slug, status: 'accepted' };
}

// REJECT: log a decision to say no (→ rejected).
export function rejectDecision(name, slug) {
  const file = artFile(name, slug);
  if (!existsSync(file)) throw new Error(`no such item: ${name}/${slug}`);
  writeFileSync(file, readFileSync(file, 'utf-8').replace(/^status:.*$/m, 'status: rejected'));
  forget();
  return { name, slug, status: 'rejected' };
}

// FILE a quick capture into knowledge (the lighter, non-gate flow).
export function fileCapture(slug) {
  const src = join(VAULT_DIR, 'inbox', slug + '.md');
  if (!existsSync(src)) throw new Error(`no capture named "${slug}"`);
  const dest = join(VAULT_DIR, 'knowledge', slug + '.md');
  if (existsSync(dest)) throw new Error(`"${slug}" is already in knowledge`);
  writeFileSync(dest, readFileSync(src, 'utf-8').replace(/^status:.*$/m, 'status: accepted'));
  unlinkSync(src);
  appendFileSync(join(VAULT_DIR, 'knowledge', 'index.md'), `- [[${slug}]]\n`);
  forget();
  return { slug, to: 'knowledge' };
}

export const vaultDir = () => VAULT_DIR;
