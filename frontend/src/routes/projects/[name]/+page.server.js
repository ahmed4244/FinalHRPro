import { project } from '$lib/server/vault.js';
import { error } from '@sveltejs/kit';

export const load = ({ params }) => {
  const p = project(params.name);
  if (!p) throw error(404, `No project named “${params.name}”.`);
  const group = (k) => p.artifacts.filter((a) => a.kind === k);
  return {
    project: p,
    groups: [
      { kind: 'adr', label: 'Decisions (ADRs)', items: group('adr') },
      { kind: 'plan', label: 'Plans', items: group('plan') },
      { kind: 'scope', label: 'Scopes', items: group('scope') },
      { kind: 'task', label: 'Work items', items: group('task') }
    ].filter((g) => g.items.length)
  };
};
