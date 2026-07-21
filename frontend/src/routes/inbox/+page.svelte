<script>
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { onMount } from 'svelte';

  let { data, form } = $props();

  // MECHANIC 4 — respond to changes: re-ask the vault every few seconds, so a
  // decision the AI proposes from the terminal appears here on its own.
  onMount(() => {
    const t = setInterval(invalidateAll, 4000);
    return () => clearInterval(t);
  });
</script>

<h1>Inbox — the Human Gate</h1>
<p class="sub">
  The AI's decisions and plans wait here for your <strong>commit</strong>. <span class="live">· refreshing live</span>
</p>

{#if form?.done}
  <div class="flash">
    {form.done === 'committed'
      ? `Committed “${form.slug}” — greenlit for implementation.`
      : `Rejected “${form.slug}” — logged.`}
  </div>
{:else if form?.error}
  <div class="flash">Couldn't do that: {form.error}</div>
{/if}

{#if data.pending.length === 0}
  <div class="empty">Nothing waiting on you. 🎉<br />Proposed ADRs and plans land here for your call.</div>
{:else}
  {#each data.pending as a (a.project + '/' + a.slug)}
    <div class="proposal">
      <div class="meta" style="margin-bottom:6px">
        <span class="chip">{a.kind === 'adr' ? 'decision' : 'plan'}</span>
        <span class="chip">{a.project}</span>
      </div>
      <a class="p-title" href="/projects/{a.project}/{a.slug}" style="display:block">{a.title}</a>
      <div class="p-why">{a.goal || a.excerpt}</div>
      <div class="actions">
        <form method="POST" action="?/commit" use:enhance>
          <input type="hidden" name="project" value={a.project} />
          <input type="hidden" name="slug" value={a.slug} />
          <button class="btn approve" type="submit">Commit</button>
        </form>
        <form method="POST" action="?/reject" use:enhance>
          <input type="hidden" name="project" value={a.project} />
          <input type="hidden" name="slug" value={a.slug} />
          <button class="btn reject" type="submit">Reject</button>
        </form>
      </div>
    </div>
  {/each}
{/if}
