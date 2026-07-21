import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    // Node adapter: your face runs as a small server on your computer,
    // reading your vault off the disk. (ADR-004 — SvelteKit + Node.)
    adapter: adapter()
  }
};

export default config;
