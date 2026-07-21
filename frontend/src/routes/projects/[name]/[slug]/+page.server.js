import { getArtifact } from '$lib/server/vault.js';
import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
  const a = getArtifact(params.name, params.slug);
  if (!a) throw error(404, `No item “${params.slug}” in ${params.name}.`);
  return { artifact: a };
};
