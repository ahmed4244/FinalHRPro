import { getNote } from '$lib/server/vault.js';
import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
  const note = getNote(params.slug);
  if (!note) throw error(404, `No note named “${params.slug}”.`);
  return { note };
};
