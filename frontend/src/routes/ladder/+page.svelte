<script>
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { onMount } from 'svelte';

  let { data, form } = $props();
  const P = $derived(data.profile);

  // Auto-track: re-read the vault every few seconds, so a requirement finished on
  // the board or from the terminal marks itself done here on its own.
  onMount(() => {
    const t = setInterval(invalidateAll, 4000);
    return () => clearInterval(t);
  });

  const pct = (d, t) => (t ? Math.round((d / t) * 100) : 0);
</script>

<h1>My Career Profile</h1>
<p class="sub">{P.tagline}</p>

<div class="profile">
  <div class="pf-grid">
    <div><span class="pf-label">Cluster</span><span class="pf-val">{P.cluster}</span></div>
    <div><span class="pf-label">Current rung</span><span class="pf-val">{P.start.title}</span></div>
    <div>
      <span class="pf-label">Working toward</span>
      <span class="pf-val">{P.nextRung ? `${P.nextRung.title} · Year ${P.nextRung.year}` : 'All promotions complete'}</span>
    </div>
  </div>
  <div class="pf-progress">
    <div class="bar"><span style="width:{pct(P.progress.done, P.progress.total)}%"></span></div>
    <div class="bar-cap">{P.progress.done} of {P.progress.total} requirements complete across both promotions</div>
  </div>
</div>

{#if form?.error}
  <div class="flash">Couldn't update that requirement: {form.error}</div>
{/if}

<div class="timeline">
  <div class="node start">
    <div class="rail"><span class="dot now"></span></div>
    <div class="body">
      <div class="year">Year {P.start.year}</div>
      <div class="startcard">
        <div class="st-head"><strong>{P.start.title}</strong> <span class="chip you">you are here</span></div>
        <p>{P.start.note}</p>
      </div>
    </div>
  </div>

  {#each P.rungs as r}
    <div class="node">
      <div class="rail"><span class="dot" class:done={r.complete}>{r.n}</span></div>
      <div class="body">
        <div class="year">Year {r.year} · Promotion {r.n}</div>
        <div class="rung" class:complete={r.complete}>
          <div class="rung-head">
            <div>
              <div class="rung-title">{r.title}</div>
              <div class="rung-scope">{r.scope}</div>
            </div>
            <span class="theme">{r.theme}</span>
          </div>

          <div class="exp">{r.experience}</div>

          <div class="pbar">
            <div class="bar"><span style="width:{pct(r.doneCount, r.total)}%"></span></div>
            <div class="bar-cap" class:ok={r.complete}>
              {#if r.complete}
                Requirements complete — ready to put yourself up for promotion
              {:else}
                {r.doneCount} of {r.total} requirements complete
              {/if}
            </div>
          </div>

          <ul class="checklist">
            {#each r.requirements as w (w.slug)}
              <li class:done={w.done}>
                <form method="POST" action="?/toggle" use:enhance>
                  <input type="hidden" name="slug" value={w.slug} />
                  <input type="hidden" name="done" value={String(!w.done)} />
                  <label class="check" title={w.done ? 'Mark not done' : 'Mark done'}>
                    <input type="checkbox" checked={w.done} onchange={(e) => e.currentTarget.form.requestSubmit()} />
                    <span class="box"></span>
                  </label>
                </form>
                <span class="ci">
                  <a class="ci-title" href="/projects/profession-ladder/{w.slug}">{w.title}</a>
                  <span class="ci-ex">{w.excerpt}</span>
                </span>
                <span class="cat cat-{w.category}">{w.category}</span>
              </li>
            {/each}
          </ul>

          <div class="evald"><strong>How the promotion is decided:</strong> {r.evaluated}</div>

          <div class="links">
            <a class="go" href="/note/{r.noteSlug}">Read the full rung</a>
            <a class="go ghost" href="/projects/profession-ladder/{r.scopeSlug}">See the plan of work</a>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>

<p class="foot">
  Decisions behind this ladder: <a href="/projects/profession-ladder">the Profession Ladder project</a>.
  Full map in prose: <a href="/note/software-engineer-career-ladder">the career-ladder note</a>.
  Tick a requirement and it saves to your vault instantly — the checklist and progress update on their own.
</p>

<style>
  /* bigger, more readable type than the default cards */
  h1 { font-size: 27px; }
  .sub { font-size: 15px; }

  .profile { border: 1px solid var(--line); border-radius: var(--radius); background: var(--card); padding: 18px 20px; margin-bottom: 8px; }
  .pf-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 16px; }
  .pf-label { display: block; font-size: 12px; text-transform: uppercase; letter-spacing: .05em; color: var(--muted); margin-bottom: 3px; }
  .pf-val { font-size: 16px; font-weight: 650; color: var(--ink); }

  .bar { height: 10px; background: color-mix(in srgb, var(--line) 60%, transparent); border-radius: 20px; overflow: hidden; }
  .bar span { display: block; height: 100%; background: var(--accent); border-radius: 20px; transition: width .25s ease; }
  .bar-cap { font-size: 13px; color: var(--muted); margin-top: 7px; }
  .bar-cap.ok { color: var(--accent); font-weight: 650; }

  .flash { background: color-mix(in srgb, var(--accent-2) 15%, transparent); border: 1px solid var(--accent-2); border-radius: 8px; padding: 10px 14px; font-size: 14px; margin: 12px 0; }

  .timeline { margin-top: 20px; }
  .node { display: grid; grid-template-columns: 46px 1fr; }
  .rail { display: flex; flex-direction: column; align-items: center; }
  .rail::before, .rail::after { content: ""; width: 2px; flex: 1; background: var(--line); }
  .node:first-child .rail::before { background: transparent; }
  .node:last-child .rail::after { background: transparent; }
  .dot {
    width: 30px; height: 30px; border-radius: 50%; background: var(--accent);
    display: flex; align-items: center; justify-content: center; color: #fff;
    font-size: 14px; font-weight: 700; flex: 0 0 auto; box-shadow: 0 0 0 4px var(--bg);
  }
  .dot.now { background: var(--accent-2); width: 18px; height: 18px; }
  .dot.done { background: var(--accent-2); }

  .body { padding: 4px 0 30px 16px; min-width: 0; }
  .year { font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); font-weight: 700; margin-bottom: 9px; }

  .startcard { border: 1px dashed var(--line); border-radius: var(--radius); padding: 14px 16px; background: var(--card); }
  .st-head { font-size: 16px; }
  .startcard p { margin: 7px 0 0; color: var(--muted); font-size: 14px; }
  .chip.you { font-size: 12px; background: var(--accent-2); color: #fff; border-radius: 20px; padding: 2px 10px; }

  .rung { border: 1px solid var(--line); border-left: 4px solid var(--accent); border-radius: var(--radius); padding: 18px 20px; background: var(--card); }
  .rung.complete { border-color: var(--accent-2); border-left-color: var(--accent-2); background: color-mix(in srgb, var(--accent-2) 5%, var(--card)); }
  .rung-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; }
  .rung-title { font-size: 20px; font-weight: 700; color: var(--accent); }
  .rung-scope { color: var(--ink); font-size: 15px; margin-top: 4px; line-height: 1.5; }
  .theme { flex: 0 0 auto; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: var(--accent-2); border: 1px solid var(--accent-2); border-radius: 20px; padding: 4px 12px; }

  .exp { font-size: 14px; color: var(--muted); margin: 13px 0 0; }
  .pbar { margin: 14px 0 4px; }

  .checklist { list-style: none; margin: 14px 0 4px; padding: 0; display: flex; flex-direction: column; gap: 8px; }
  .checklist li { display: flex; align-items: flex-start; gap: 13px; padding: 12px 14px; border: 1px solid var(--line); border-radius: 9px; background: var(--bg); transition: border-color .12s, background .12s; }
  .checklist li:hover { border-color: var(--accent-2); }
  .checklist li.done { background: color-mix(in srgb, var(--accent) 7%, var(--card)); border-color: color-mix(in srgb, var(--accent) 30%, var(--line)); }
  .checklist form { margin: 0; flex: 0 0 auto; }

  .check { display: block; cursor: pointer; margin-top: 1px; }
  .check input { position: absolute; opacity: 0; width: 0; height: 0; }
  .box { display: block; width: 22px; height: 22px; border: 2px solid var(--muted); border-radius: 6px; background: var(--card); position: relative; transition: .12s; }
  .check input:checked + .box { background: var(--accent); border-color: var(--accent); }
  .check input:checked + .box::after { content: ""; position: absolute; left: 6px; top: 2px; width: 6px; height: 11px; border: solid #fff; border-width: 0 3px 3px 0; transform: rotate(45deg); }
  .check input:focus-visible + .box { box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 32%, transparent); }

  .ci { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
  .ci-title { font-size: 15px; font-weight: 650; color: var(--ink); text-decoration: none; }
  .ci-title:hover { color: var(--accent); text-decoration: underline; }
  li.done .ci-title { color: var(--muted); text-decoration: line-through; }
  .ci-ex { font-size: 13px; color: var(--muted); line-height: 1.45; }

  .cat { flex: 0 0 auto; align-self: center; font-size: 11.5px; font-weight: 600; text-transform: capitalize; border-radius: 20px; padding: 2px 10px; border: 1px solid var(--line); color: var(--muted); background: var(--card); }
  .cat-certification { color: #7a5b12; border-color: #d8b45f; background: #fbf3df; }
  .cat-course { color: #2f5a3a; border-color: #96c2a2; background: #e9f4ec; }
  .cat-project { color: #3a4a72; border-color: #9aa9d6; background: #eaeef8; }
  .cat-leadership { color: #6d3a5f; border-color: #cf9dc0; background: #f7ecf4; }

  .evald { margin-top: 15px; font-size: 14px; line-height: 1.6; background: color-mix(in srgb, var(--accent-2) 9%, transparent); border-radius: 8px; padding: 12px 15px; }

  .links { display: flex; gap: 18px; flex-wrap: wrap; margin-top: 16px; }
  .go { font-size: 14px; font-weight: 600; color: var(--accent); }
  .go.ghost { color: var(--muted); }
  .go:hover { text-decoration: underline; }

  .foot { margin-top: 12px; color: var(--muted); font-size: 13.5px; line-height: 1.6; }
  .foot a { color: var(--accent); text-decoration: underline; }

  @media (max-width: 720px) {
    .pf-grid { grid-template-columns: 1fr; gap: 10px; }
  }
</style>
