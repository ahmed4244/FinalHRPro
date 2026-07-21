import { projects } from '$lib/server/vault.js';

export const load = () => ({ projects: projects() });
