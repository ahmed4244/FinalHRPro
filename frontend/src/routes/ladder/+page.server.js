import { project, trackRequirement } from '$lib/server/vault.js';
import { fail } from '@sveltejs/kit';

// The paths registry: one JSON per major under src/lib/paths/. Drop a new one in
// (the /addpath skill does) and it shows up here as a new tab — no code change.
const files = import.meta.glob('../../lib/paths/*.json', { eager: true });
const REGISTRY = Object.values(files)
  .map((m) => m.default)
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99) || a.cluster.localeCompare(b.cluster));
const KNOWN_PROJECTS = new Set(REGISTRY.map((p) => p.project));

const CAT_ORDER = { certification: 0, course: 1, project: 2, leadership: 3 };
const categoryOf = (tags) => (tags || []).find((t) => t !== 'work-item') || 'task';

// Merge a path's rung metadata (JSON) with the LIVE status of its work items
// (the vault project it points at). Tick a requirement → it shows done here.
function buildPath(def) {
  const proj = project(def.project);
  const items = proj ? proj.artifacts.filter((a) => a.kind === 'task') : [];

  const rungs = def.rungs.map((r) => {
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
  const nextRung = rungs.find((r) => !r.complete) || null;
  return { slug: def.slug, project: def.project, cluster: def.cluster, tagline: def.tagline, start: def.start, rungs, progress: { done, total }, nextRung };
}

export const load = () => ({ paths: REGISTRY.map(buildPath) });

// The one governed write: tick a requirement done / undone, on whichever path.
export const actions = {
  toggle: async ({ request }) => {
    const f = await request.formData();
    const projectName = String(f.get('project') || '');
    const slug = String(f.get('slug') || '');
    const done = String(f.get('done')) === 'true';
    if (!KNOWN_PROJECTS.has(projectName)) return fail(400, { error: 'unknown path' });
    try {
      trackRequirement(projectName, slug, done);
      return { ok: true, slug, done };
    } catch (e) {
      return fail(400, { error: e.message });
    }
  }
};
