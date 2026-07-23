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

  // ── interactive filters (client-side, instant) ──
  let statusFilter = $state('all');   // all | todo | done
  let catFilter = $state('all');      // all | certification | course | project | leadership

  const CATS = ['certification', 'course', 'project', 'leadership'];
  const matches = (w) =>
    (statusFilter === 'all' || (statusFilter === 'done' ? w.done : !w.done)) &&
    (catFilter === 'all' || w.category === catFilter);

  const pct = (d, t) => (t ? Math.round((d / t) * 100) : 0);
  const shownCount = $derived(
    P.rungs.reduce((n, r) => n + r.requirements.filter(matches).length, 0)
  );

  // progress-ring geometry
  const R = 44, C = 2 * Math.PI * R;
  const dash = (p) => `${C} ${C}`;
  const offset = (p) => C * (1 - p / 100);
</script>

{#snippet ring(p, size)}
  <svg class="ring" viewBox="0 0 100 100" width={size} height={size} aria-hidden="true">
    <circle class="ring-track" cx="50" cy="50" r={R} />
    <circle class="ring-fill" cx="50" cy="50" r={R}
      style="stroke-dasharray:{dash(p)}; stroke-dashoffset:{offset(p)}" />
  </svg>
{/snippet}

<div class="head">
  <div>
    <h1>My Career Profile</h1>
    <p class="sub">{P.tagline}</p>
  </div>
  <span class="sync"><span class="dot-live"></span>Auto-syncing</span>
</div>

<!-- ── dashboard hero ── -->
<section class="hero">
  <div class="hero-ring">
    <div class="ring-wrap">
      {@render ring(pct(P.progress.done, P.progress.total), 132)}
      <div class="ring-num">
        <strong>{pct(P.progress.done, P.progress.total)}%</strong>
        <span>complete</span>
      </div>
    </div>
  </div>
  <div class="stats">
    <div class="stat">
      <span class="s-label">Requirements done</span>
      <span class="s-val">{P.progress.done}<span class="s-of"> / {P.progress.total}</span></span>
    </div>
    <div class="stat">
      <span class="s-label">Current rung</span>
      <span class="s-val sm">{P.start.title}</span>
    </div>
    <div class="stat">
      <span class="s-label">Working toward</span>
      <span class="s-val sm">{P.nextRung ? P.nextRung.title : 'All complete'}</span>
      {#if P.nextRung}<span class="s-sub">Year {P.nextRung.year}</span>{/if}
    </div>
    <div class="stat">
      <span class="s-label">Remaining</span>
      <span class="s-val">{P.progress.total - P.progress.done}</span>
    </div>
  </div>
</section>

<!-- ── interactive controls ── -->
<div class="controls">
  <div class="seg" role="tablist" aria-label="Filter by status">
    <button class:on={statusFilter === 'all'} onclick={() => (statusFilter = 'all')}>All <span>{P.progress.total}</span></button>
    <button class:on={statusFilter === 'todo'} onclick={() => (statusFilter = 'todo')}>To&nbsp;do <span>{P.progress.total - P.progress.done}</span></button>
    <button class:on={statusFilter === 'done'} onclick={() => (statusFilter = 'done')}>Done <span>{P.progress.done}</span></button>
  </div>
  <div class="cats">
    <button class="fchip" class:on={catFilter === 'all'} onclick={() => (catFilter = 'all')}>All types</button>
    {#each CATS as c}
      <button class="fchip cat-{c}" class:on={catFilter === c} onclick={() => (catFilter = catFilter === c ? 'all' : c)}>{c}</button>
    {/each}
  </div>
</div>

{#if form?.error}
  <div class="flash">Couldn't update that requirement: {form.error}</div>
{/if}

<!-- ── the ladder ── -->
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
    {@const shown = r.requirements.filter(matches)}
    <div class="node">
      <div class="rail"><span class="dot" class:done={r.complete}>{r.n}</span></div>
      <div class="body">
        <div class="year">Year {r.year} · Promotion {r.n}</div>
        <div class="rung" class:complete={r.complete}>
          <div class="rung-head">
            <div class="rh-left">
              <div class="rung-title">{r.title}</div>
              <div class="rung-scope">{r.scope}</div>
            </div>
            <div class="rh-right">
              <div class="mini-ring">
                {@render ring(pct(r.doneCount, r.total), 56)}
                <span class="mini-num">{pct(r.doneCount, r.total)}%</span>
              </div>
              <span class="theme">{r.theme}</span>
            </div>
          </div>

          <div class="exp">{r.experience}</div>

          <div class="pbar">
            <div class="bar"><span style="width:{pct(r.doneCount, r.total)}%"></span></div>
            <div class="bar-cap" class:ok={r.complete}>
              {#if r.complete}
                All requirements complete — ready to put yourself up for promotion
              {:else}
                {r.doneCount} of {r.total} requirements complete
              {/if}
            </div>
          </div>

          {#if shown.length === 0}
            <div class="none">No requirements match this filter.</div>
          {:else}
            <ul class="checklist">
              {#each shown as w (w.slug)}
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
          {/if}

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
</p>

<style>
  .head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
  h1 { font-size: 27px; margin: 0 0 4px; }
  .sub { font-size: 15px; margin: 0; }
  .sync { flex: 0 0 auto; display: inline-flex; align-items: center; gap: 7px; font-size: 12px; color: var(--muted); border: 1px solid var(--line); border-radius: 20px; padding: 5px 12px; background: var(--card); }
  .dot-live { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 60%, transparent); animation: pulse 2s infinite; }
  @keyframes pulse { 0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 55%, transparent); } 70% { box-shadow: 0 0 0 6px transparent; } 100% { box-shadow: 0 0 0 0 transparent; } }

  /* ── hero dashboard ── */
  .hero { display: grid; grid-template-columns: auto 1fr; gap: 26px; align-items: center; margin: 18px 0 6px; padding: 22px 24px; border: 1px solid var(--line); border-radius: 14px; background: var(--card); box-shadow: 0 1px 3px rgba(0,0,0,.05), 0 8px 24px -16px rgba(0,0,0,.18); }
  .ring-wrap { position: relative; width: 132px; height: 132px; display: grid; place-items: center; }
  .ring { transform: rotate(-90deg); }
  .ring-track { fill: none; stroke: color-mix(in srgb, var(--line) 70%, transparent); stroke-width: 9; }
  .ring-fill { fill: none; stroke: var(--accent); stroke-width: 9; stroke-linecap: round; transition: stroke-dashoffset .5s cubic-bezier(.4,0,.2,1); }
  .ring-num { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .ring-num strong { font-size: 30px; line-height: 1; color: var(--ink); }
  .ring-num span { font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); margin-top: 3px; }

  .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .stat { display: flex; flex-direction: column; gap: 3px; padding-left: 14px; border-left: 2px solid var(--line); }
  .s-label { font-size: 11px; text-transform: uppercase; letter-spacing: .05em; color: var(--muted); }
  .s-val { font-size: 26px; font-weight: 700; color: var(--ink); line-height: 1.15; }
  .s-val.sm { font-size: 15px; font-weight: 650; }
  .s-of { font-size: 16px; font-weight: 600; color: var(--muted); }
  .s-sub { font-size: 12px; color: var(--accent-2); font-weight: 600; }

  /* ── controls ── */
  .controls { display: flex; flex-wrap: wrap; gap: 12px 18px; align-items: center; margin: 18px 0 6px; }
  .seg { display: inline-flex; border: 1px solid var(--line); border-radius: 9px; overflow: hidden; background: var(--card); }
  .seg button { border: 0; background: none; padding: 8px 15px; font-size: 13.5px; color: var(--muted); cursor: pointer; display: inline-flex; align-items: center; gap: 7px; border-right: 1px solid var(--line); }
  .seg button:last-child { border-right: 0; }
  .seg button span { font-size: 11px; background: var(--line); color: var(--muted); border-radius: 20px; padding: 0 7px; }
  .seg button:hover { color: var(--ink); }
  .seg button.on { background: var(--accent); color: #fff; }
  .seg button.on span { background: rgba(255,255,255,.25); color: #fff; }

  .cats { display: inline-flex; flex-wrap: wrap; gap: 7px; }
  .fchip { border: 1px solid var(--line); background: var(--card); color: var(--muted); border-radius: 20px; padding: 6px 13px; font-size: 12.5px; font-weight: 600; text-transform: capitalize; cursor: pointer; transition: .12s; }
  .fchip:hover { border-color: var(--accent-2); color: var(--ink); }
  .fchip.on { background: var(--accent); border-color: var(--accent); color: #fff; }

  .flash { background: color-mix(in srgb, var(--accent-2) 15%, transparent); border: 1px solid var(--accent-2); border-radius: 8px; padding: 10px 14px; font-size: 14px; margin: 12px 0; }

  /* ── timeline ── */
  .timeline { margin-top: 22px; }
  .node { display: grid; grid-template-columns: 46px 1fr; }
  .rail { display: flex; flex-direction: column; align-items: center; }
  .rail::before, .rail::after { content: ""; width: 2px; flex: 1; background: var(--line); }
  .node:first-child .rail::before { background: transparent; }
  .node:last-child .rail::after { background: transparent; }
  .dot { width: 30px; height: 30px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; font-weight: 700; flex: 0 0 auto; box-shadow: 0 0 0 4px var(--bg); }
  .dot.now { background: var(--accent-2); width: 18px; height: 18px; }
  .dot.done { background: var(--accent-2); }

  .body { padding: 4px 0 30px 16px; min-width: 0; }
  .year { font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); font-weight: 700; margin-bottom: 9px; }

  .startcard { border: 1px dashed var(--line); border-radius: 12px; padding: 14px 16px; background: var(--card); }
  .st-head { font-size: 16px; }
  .startcard p { margin: 7px 0 0; color: var(--muted); font-size: 14px; }
  .chip.you { font-size: 12px; background: var(--accent-2); color: #fff; border-radius: 20px; padding: 2px 10px; }

  .rung { border: 1px solid var(--line); border-radius: 14px; padding: 20px 22px; background: var(--card); box-shadow: 0 1px 3px rgba(0,0,0,.04), 0 10px 30px -20px rgba(0,0,0,.22); }
  .rung.complete { border-color: var(--accent-2); background: color-mix(in srgb, var(--accent-2) 5%, var(--card)); }
  .rung-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
  .rh-left { min-width: 0; }
  .rung-title { font-size: 20px; font-weight: 700; color: var(--accent); }
  .rung-scope { color: var(--ink); font-size: 15px; margin-top: 4px; line-height: 1.5; }
  .rh-right { display: flex; align-items: center; gap: 14px; flex: 0 0 auto; }
  .mini-ring { position: relative; width: 56px; height: 56px; display: grid; place-items: center; }
  .mini-num { position: absolute; font-size: 12.5px; font-weight: 700; color: var(--ink); }
  .theme { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: var(--accent-2); border: 1px solid var(--accent-2); border-radius: 20px; padding: 4px 12px; white-space: nowrap; }

  .exp { font-size: 14px; color: var(--muted); margin: 13px 0 0; }
  .pbar { margin: 14px 0 4px; }
  .bar { height: 10px; background: color-mix(in srgb, var(--line) 60%, transparent); border-radius: 20px; overflow: hidden; }
  .bar span { display: block; height: 100%; background: var(--accent); border-radius: 20px; transition: width .5s cubic-bezier(.4,0,.2,1); }
  .bar-cap { font-size: 13px; color: var(--muted); margin-top: 7px; }
  .bar-cap.ok { color: var(--accent); font-weight: 650; }
  .none { font-size: 13px; color: var(--muted); border: 1px dashed var(--line); border-radius: 9px; padding: 14px; text-align: center; margin: 14px 0 4px; }

  .checklist { list-style: none; margin: 14px 0 4px; padding: 0; display: flex; flex-direction: column; gap: 8px; }
  .checklist li { display: flex; align-items: flex-start; gap: 13px; padding: 12px 14px; border: 1px solid var(--line); border-radius: 10px; background: var(--bg); transition: border-color .12s, background .12s, transform .12s; }
  .checklist li:hover { border-color: var(--accent-2); transform: translateX(2px); }
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
  .fchip.cat-certification.on { background: #b4832a; border-color: #b4832a; }
  .fchip.cat-course.on { background: #3f7a51; border-color: #3f7a51; }
  .fchip.cat-project.on { background: #47588c; border-color: #47588c; }
  .fchip.cat-leadership.on { background: #8a5178; border-color: #8a5178; }

  .evald { margin-top: 15px; font-size: 14px; line-height: 1.6; background: color-mix(in srgb, var(--accent-2) 9%, transparent); border-radius: 8px; padding: 12px 15px; }
  .links { display: flex; gap: 18px; flex-wrap: wrap; margin-top: 16px; }
  .go { font-size: 14px; font-weight: 600; color: var(--accent); }
  .go.ghost { color: var(--muted); }
  .go:hover { text-decoration: underline; }
  .foot { margin-top: 12px; color: var(--muted); font-size: 13.5px; line-height: 1.6; }
  .foot a { color: var(--accent); text-decoration: underline; }

  @media (max-width: 760px) {
    .hero { grid-template-columns: 1fr; justify-items: center; text-align: center; }
    .stats { grid-template-columns: repeat(2, 1fr); }
    .stat { border-left: 0; padding-left: 0; align-items: center; }
  }
</style>
