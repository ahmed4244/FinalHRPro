import { recent, search, captures, fileCapture } from '$lib/server/vault.js';
import { fail } from '@sveltejs/kit';

export const load = ({ url }) => {
  const q = url.searchParams.get('q')?.trim() || '';
  return {
    q,
    recent: recent(6),
    results: q ? search(q) : null,
    captures: captures()
  };
};

// Filing a quick capture into knowledge — the lighter, non-gate flow.
export const actions = {
  file: async ({ request }) => {
    const slug = String((await request.formData()).get('slug') || '');
    try { fileCapture(slug); return { filed: slug }; }
    catch (e) { return fail(400, { error: e.message }); }
  }
};
