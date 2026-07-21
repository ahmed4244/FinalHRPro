import { byZone } from '$lib/server/vault.js';

export const load = () => ({ notes: byZone('knowledge') });
