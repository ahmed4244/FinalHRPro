import { pendingDecisions, commit, rejectDecision } from '$lib/server/vault.js';
import { fail } from '@sveltejs/kit';

// The Human-Gate queue: proposed ADRs and plans waiting to be committed.
export const load = () => ({ pending: pendingDecisions() });

// Commit greenlights a decision/plan for implementation; reject logs a no.
// These are the only writes the face makes — through this one governed door.
export const actions = {
  commit: async ({ request }) => {
    const f = await request.formData();
    const project = String(f.get('project') || '');
    const slug = String(f.get('slug') || '');
    try { commit(project, slug); return { done: 'committed', slug }; }
    catch (e) { return fail(400, { error: e.message }); }
  },
  reject: async ({ request }) => {
    const f = await request.formData();
    const project = String(f.get('project') || '');
    const slug = String(f.get('slug') || '');
    try { rejectDecision(project, slug); return { done: 'rejected', slug }; }
    catch (e) { return fail(400, { error: e.message }); }
  }
};
