// ─────────────────────────────────────────────────────────────────────────
//  vault.js — the engine behind the face.
//  This is the ONLY place that touches your vault files. The pages never read
//  the disk themselves; they ask this module through the /api seam.
//
//  It does the four mechanics of Day 15:
//    1 · LOAD    — read the vault files into memory
//    2 · LIST    — keep an in-memory index so listing is instant
//    3 · SEARCH  — query that index
//    4 · CHANGES — only re-read when the vault actually changed
//  ...plus the Human Gate: approve routes a note; reject logs it.
// ─────────────────────────────────────────────────────────────────────────
import { readdirSync, readFileSync, writeFileSync, unlinkSync, statSync, existsSync, appendFileSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';

// WHERE your vault lives. Defaults to this repo's root (the folder next to
// /frontend). Point it anywhere with the VAULT_DIR environment variable.
const VAULT_DIR = process.env.VAULT_DIR
  ? resolve(process.env.VAULT_DIR)
  : resolve(process.cwd(), '..');

const ZONES = ['inbox', 'knowledge'];

// ── the in-memory index (mechanic 2) ──
// We read the vault once and keep it here. We only read it again when a zone
// folder's timestamp changes — so listing and searching never touch the disk.
let index = { notes: [], stamp: '' };

function zonesStamp() {
  // a cheap fingerprint of the vault: the newest change across the zones
  let s = '';
  for (const z of ZONES) {
    const dir = join(VAULT_DIR, z);
    if (existsSync(dir)) s += z + statSync(dir).mtimeMs + ';';
  }
  return s;
}

function parseNote(file, zone) {
  const raw = readFileSync(file, 'utf-8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const front = m ? m[1] : '';
  const body = (m ? m[2] : raw).trim();
  const fm = {};
  for (const line of front.split('\n')) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  const slug = basename(file, '.md');
  return {
    slug,
    zone,
    title: fm.title || slug,
    type: fm.type || 'note',
    created: fm.created || '',
    status: fm.status || '',
    tags: (fm.tags || '').replace(/[[\]]/g, '').split(',').map((t) => t.trim()).filter(Boolean),
    body,
    excerpt: body.split('\n').map((l) => l.trim()).filter(Boolean)[0]?.slice(0, 150) || ''
  };
}

// LOAD (mechanic 1) + CHANGES (mechanic 4): re-read only when the vault changed.
export function loadVault() {
  const stamp = zonesStamp();
  if (index.notes.length && stamp === index.stamp) return index.notes; // unchanged → serve the index
  const notes = [];
  for (const zone of ZONES) {
    const dir = join(VAULT_DIR, zone);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir)) {
      if (!file.endsWith('.md') || file === 'index.md') continue;
      notes.push(parseNote(join(dir, file), zone));
    }
  }
  notes.sort((a, b) => (b.created || '').localeCompare(a.created || '')); // newest first
  index = { notes, stamp };
  return notes;
}

function forget() { index = { notes: [], stamp: '' }; } // force a fresh read next time

// ── reads (run free) ──
export const recent = (n = 8) => loadVault().slice(0, n);
export const byZone = (zone) => loadVault().filter((n) => n.zone === zone);
export const proposed = () => loadVault().filter((n) => n.zone === 'inbox' && n.status === 'proposed');
export const getNote = (slug) => loadVault().find((n) => n.slug === slug) || null;
export const counts = () => {
  const all = loadVault();
  return {
    knowledge: all.filter((n) => n.zone === 'knowledge').length,
    inbox: all.filter((n) => n.zone === 'inbox' && n.status === 'proposed').length
  };
};

// SEARCH (mechanic 3): query the index — title, body, or tags.
export function search(q) {
  q = (q || '').toLowerCase().trim();
  if (!q) return [];
  return loadVault().filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      n.body.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q))
  );
}

// ── the Human Gate: the only writes the face makes ──
// APPROVE: route a proposal from inbox/ into knowledge/ (the governed move) —
// set its status to accepted and add it to the knowledge front door.
export function approve(slug) {
  const src = join(VAULT_DIR, 'inbox', slug + '.md');
  if (!existsSync(src)) throw new Error(`no proposal named "${slug}"`);
  const dest = join(VAULT_DIR, 'knowledge', slug + '.md');
  if (existsSync(dest)) throw new Error(`"${slug}" is already in knowledge`);

  const routed = readFileSync(src, 'utf-8').replace(/^status:.*$/m, 'status: accepted');
  writeFileSync(dest, routed);
  unlinkSync(src); // it now lives in knowledge/
  appendFileSync(join(VAULT_DIR, 'knowledge', 'index.md'), `- [[${slug}]]\n`); // join the front door
  forget();
  return { slug, to: 'knowledge' };
}

// REJECT: keep the note but mark it rejected — it drops out of the queue,
// and stays as an honest record of a decision you made.
export function reject(slug) {
  const src = join(VAULT_DIR, 'inbox', slug + '.md');
  if (!existsSync(src)) throw new Error(`no proposal named "${slug}"`);
  writeFileSync(src, readFileSync(src, 'utf-8').replace(/^status:.*$/m, 'status: rejected'));
  forget();
  return { slug, status: 'rejected' };
}

export const vaultDir = () => VAULT_DIR;
