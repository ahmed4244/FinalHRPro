<script>
  let { data } = $props();
  const L = data.ladder;
</script>

<h1>Profession Ladder</h1>
<p class="sub">{L.tagline}</p>

<div class="timeline">
  <!-- where you stand today -->
  <div class="node start">
    <div class="rail">
      <span class="dot now"></span>
    </div>
    <div class="body">
      <div class="year">Year {L.start.year}</div>
      <div class="startcard">
        <div class="st-head"><strong>{L.start.title}</strong> <span class="chip you">you are here</span></div>
        <p>{L.start.note}</p>
      </div>
    </div>
  </div>

  {#each L.rungs as r}
    <div class="node">
      <div class="rail">
        <span class="dot"><span class="n">{r.n}</span></span>
      </div>
      <div class="body">
        <div class="year">Year {r.year} · Promotion {r.n}</div>
        <div class="rung">
          <div class="rung-head">
            <div>
              <div class="rung-title">{r.title}</div>
              <div class="rung-scope">{r.scope}</div>
            </div>
            <span class="theme">{r.theme}</span>
          </div>

          <div class="exp">🕑 {r.experience}</div>

          <div class="reqs">
            <section>
              <h3>🎓 Certifications</h3>
              <ul>{#each r.certifications as c}<li>{c}</li>{/each}</ul>
            </section>
            <section>
              <h3>📚 Courses &amp; reading</h3>
              <ul>{#each r.courses as c}<li>{c}</li>{/each}</ul>
            </section>
            <section>
              <h3>🚀 Projects to ship</h3>
              <ul>{#each r.projects as p}<li>{p}</li>{/each}</ul>
            </section>
          </div>

          <div class="evald"><strong>How it's decided:</strong> {r.evaluated}</div>

          <div class="links">
            <a class="go" href="/note/{r.noteSlug}">Read the full rung →</a>
            <a class="go ghost" href="/projects/profession-ladder/{r.scopeSlug}">See the plan of work →</a>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>

<p class="foot">
  The decisions behind this ladder live in the
  <a href="/projects/profession-ladder">Profession Ladder project</a>; the map in prose is the
  <a href="/note/software-engineer-career-ladder">career-ladder note</a>.
</p>

<style>
  .timeline { margin-top: 18px; }
  .node { display: grid; grid-template-columns: 44px 1fr; }
  .rail { display: flex; flex-direction: column; align-items: center; }
  .rail::before, .rail::after {
    content: ""; width: 2px; flex: 1; background: var(--line);
  }
  .node:first-child .rail::before { background: transparent; }
  .node:last-child .rail::after { background: transparent; }
  .dot {
    width: 26px; height: 26px; border-radius: 50%; background: var(--accent);
    display: flex; align-items: center; justify-content: center; color: #fff;
    font-size: 12px; font-weight: 700; flex: 0 0 auto; box-shadow: 0 0 0 4px var(--bg);
  }
  .dot.now { background: var(--accent-2); width: 16px; height: 16px; }
  .dot .n { line-height: 1; }

  .body { padding: 4px 0 26px 14px; min-width: 0; }
  .year { font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); font-weight: 700; margin-bottom: 8px; }

  .startcard { border: 1px dashed var(--line); border-radius: var(--radius); padding: 12px 15px; background: var(--card); }
  .startcard p { margin: 6px 0 0; color: var(--muted); font-size: 13px; }
  .chip.you { font-size: 11px; background: var(--accent-2); color: #fff; border-radius: 20px; padding: 1px 9px; }

  .rung { border: 1px solid var(--line); border-left: 3px solid var(--accent); border-radius: var(--radius); padding: 16px 18px; background: var(--card); }
  .rung-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
  .rung-title { font-size: 17px; font-weight: 700; color: var(--accent); }
  .rung-scope { color: var(--ink); font-size: 13.5px; margin-top: 3px; }
  .theme { flex: 0 0 auto; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: var(--accent-2); border: 1px solid var(--accent-2); border-radius: 20px; padding: 3px 11px; }

  .exp { font-size: 12.5px; color: var(--muted); margin: 12px 0 4px; }

  .reqs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 14px 0 4px; }
  .reqs h3 { font-size: 12px; margin: 0 0 7px; color: var(--ink); text-transform: none; letter-spacing: 0; }
  .reqs ul { margin: 0; padding-left: 16px; }
  .reqs li { font-size: 12px; color: var(--muted); line-height: 1.5; margin-bottom: 6px; }

  .evald { margin-top: 12px; font-size: 12.5px; line-height: 1.55; background: color-mix(in srgb, var(--accent-2) 9%, transparent); border-radius: 8px; padding: 10px 13px; }

  .links { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 14px; }
  .go { font-size: 13px; font-weight: 600; color: var(--accent); }
  .go.ghost { color: var(--muted); }
  .go:hover { text-decoration: underline; }

  .foot { margin-top: 10px; color: var(--muted); font-size: 12.5px; }
  .foot a { color: var(--accent); text-decoration: underline; }

  @media (max-width: 720px) {
    .reqs { grid-template-columns: 1fr; }
  }
</style>
