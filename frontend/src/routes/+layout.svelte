<script>
  import '../app.css';
  import { page } from '$app/stores';
  let { data, children } = $props();
</script>

<div class="app">
  <aside class="sidebar">
    <div class="brand">Profession Ladder</div>
    <nav>
      <a href="/ladder" class:active={$page.url.pathname.startsWith('/ladder')}>Career</a>
    </nav>
  </aside>

  <main class:wide={$page.url.pathname.includes('/plan/')}>
    {@render children()}
  </main>
</div>
