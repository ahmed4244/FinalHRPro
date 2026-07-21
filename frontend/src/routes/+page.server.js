import { byZone, search } from '$lib/server/vault.js';

// Home: your recent settled (knowledge) notes, or search results when there's
// a ?q= in the URL. Pending proposals live on the Inbox page, not here.
export const load = ({ url }) => {
  const q = url.searchParams.get('q')?.trim() || '';
  return {
    q,
    recent: byZone('knowledge').slice(0, 8),
    results: q ? search(q) : null
  };
};
