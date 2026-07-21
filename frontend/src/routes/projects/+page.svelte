<script>
  let { data } = $props();
  const count = (p, k) => p.artifacts.filter((a) => a.kind === k).length;
</script>

<h1>Projects</h1>
<p class="sub">Your work, by the method — decisions, plans, scopes, and tasks.</p>

{#if data.projects.length === 0}
  <div class="empty">No projects yet. Start one from the terminal: <code>vault plan &lt;name&gt; "the outcome"</code></div>
{:else}
  <div class="cards">
    {#each data.projects as p}
      <a class="card" href="/projects/{p.name}">
        <div class="title">{p.title}</div>
        {#if p.goal}<div class="ex">{p.goal}</div>{/if}
        <div class="meta">
          <span class="chip">{count(p, 'adr')} decisions</span>
          <span class="chip">{count(p, 'plan')} plans</span>
          <span class="chip">{count(p, 'task')} tasks</span>
          <span class="date">{p.status}</span>
        </div>
      </a>
    {/each}
  </div>
{/if}
