import ladder from '$lib/ladder.json';
import { project, trackRequirement } from '$lib/server/vault.js';
import { fail } from '@sveltejs/kit';

const PROJECT = 'profession-ladder';
// show the checklist in a readable order regardless of file mtime
const CAT_ORDER = { certification: 0, course: 1, project: 2, leadership: 3 };
const categoryOf = (tags) => (tags || []).find((t) => t !== 'work-item') || 'task';

// Build the career profile: each rung's metadata (from the one JSON, ADR-004)
// merged with the LIVE status of its work items (the vault, ADR-005). Tick a
// requirement done anywhere — board, terminal, or the ladder — and it shows here.
function profile() {
  const proj = project(PROJECT);
  const items = proj ? proj.artifacts.filter((a) => a.kind === 'task') : [];

  const rungs = ladder.rungs.map((r) => {
    const requirements = items
      .filter((w) => w.parent === r.scopeSlug)
      .map((w) => ({
        slug: w.slug,
        title: w.title,
        excerpt: w.excerpt,
        category: categoryOf(w.tags),
        done: (w.status || '').toLowerCase() === 'done'
      }))
      .sort((a, b) => (CAT_ORDER[a.category] ?? 9) - (CAT_ORDER[b.category] ?? 9) || a.title.localeCompare(b.title));
    const doneCount = requirements.filter((x) => x.done).length;
    return { ...r, requirements, doneCount, total: requirements.length, complete: requirements.length > 0 && doneCount === requirements.length };
  });

  const total = rungs.reduce((n, r) => n + r.total, 0);
  const done = rungs.reduce((n, r) => n + r.doneCount, 0);
  // the rung you're working toward = the first not-yet-complete one
  const nextRung = rungs.find((r) => !r.complete) || null;

  return { cluster: ladder.cluster, tagline: ladder.tagline, start: ladder.start, rungs, progress: { done, total }, nextRung };
}

export const load = () => ({ profile: profile() });

// The one governed write this page makes: tick a requirement done, or untick it.
export const actions = {
  toggle: async ({ request }) => {
    const f = await request.formData();
    const slug = String(f.get('slug') || '');
    const done = String(f.get('done')) === 'true';
    try {
      trackRequirement(PROJECT, slug, done);
      return { ok: true, slug, done };
    } catch (e) {
      return fail(400, { error: e.message });
    }
  }
};
