<script>
  let { data } = $props();
  const p = data.project;
  // colour the status chip: proposed = your call, done/shipped = settled
  const cls = (s) => (s === 'proposed' ? 'st-proposed' : s === 'done' || s === 'shipped' || s === 'accepted' ? 'st-done' : '');
</script>

<a class="back" href="/projects">← projects</a>
<h1 style="margin-top:10px">{p.title}</h1>
<p class="sub">{p.goal || `status: ${p.status}`}</p>

{#each data.groups as g}
  <h2>{g.label}</h2>
  <div class="rows">
    {#each g.items as a}
      <a class="row" href="/projects/{p.name}/{a.slug}">
        <span class="row-title">{a.title}</span>
        <span class="chip {cls(a.status)}">{a.status}</span>
      </a>
    {/each}
  </div>
{/each}
