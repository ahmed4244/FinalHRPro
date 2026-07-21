<script>
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { onMount } from 'svelte';

  let { data, form } = $props();

  // MECHANIC 4 — respond to changes: every few seconds, re-ask the vault.
  // Capture a note from the terminal and watch it appear here on its own.
  onMount(() => {
    const t = setInterval(invalidateAll, 4000);
    return () => clearInterval(t);
  });
</script>

<h1>Inbox — the Human Gate</h1>
<p class="sub">
  Every proposal waits here for your decision. <span class="live">· refreshing live</span>
</p>

{#if form?.done}
  <div class="flash">
    {form.done === 'approved'
      ? `Approved “${form.slug}” — routed into your knowledge.`
      : `Rejected “${form.slug}” — logged and cleared.`}
  </div>
{:else if form?.error}
  <div class="flash">Couldn't do that: {form.error}</div>
{/if}

{#if data.proposals.length === 0}
  <div class="empty">Nothing to review right now. 🎉<br />New captures land here automatically.</div>
{:else}
  {#each data.proposals as p (p.slug)}
    <div class="proposal">
      <div class="p-title">{p.title}</div>
      <div class="p-why">
        <strong>What:</strong> {p.excerpt || p.title}
        &nbsp;·&nbsp; <strong>Where:</strong> knowledge/
        &nbsp;·&nbsp; <strong>Type:</strong> {p.type}
      </div>
      <div class="actions">
        <form method="POST" action="?/approve" use:enhance>
          <input type="hidden" name="slug" value={p.slug} />
          <button class="btn approve" type="submit">Approve</button>
        </form>
        <form method="POST" action="?/reject" use:enhance>
          <input type="hidden" name="slug" value={p.slug} />
          <button class="btn reject" type="submit">Reject</button>
        </form>
      </div>
    </div>
  {/each}
{/if}
