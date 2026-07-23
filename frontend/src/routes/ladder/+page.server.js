import ladder from '$lib/ladder.json';

// The ladder view reads one JSON (ADR-004) — a render-ready mirror of the
// knowledge notes. No disk walk, no secrets: just static data for the face.
export const load = () => ({ ladder });
