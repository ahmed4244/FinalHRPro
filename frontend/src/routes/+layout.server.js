import { counts } from '$lib/server/vault.js';

// Runs on the server for every page — gives the sidebar its live zone counts.
export const load = () => ({ counts: counts() });
