import { proposed, approve, reject } from '$lib/server/vault.js';
import { fail } from '@sveltejs/kit';

// The Human-Gate queue: every proposal waiting for your yes or no.
export const load = () => ({ proposals: proposed() });

// The two decisions. These are the only writes the face makes — and they go
// through this one governed door, never straight to the files from the browser.
export const actions = {
  approve: async ({ request }) => {
    const slug = String((await request.formData()).get('slug') || '');
    try {
      approve(slug);
      return { done: 'approved', slug };
    } catch (e) {
      return fail(400, { error: e.message });
    }
  },
  reject: async ({ request }) => {
    const slug = String((await request.formData()).get('slug') || '');
    try {
      reject(slug);
      return { done: 'rejected', slug };
    } catch (e) {
      return fail(400, { error: e.message });
    }
  }
};
