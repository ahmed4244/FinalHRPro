<script>
  let { data } = $props();
  const a = data.artifact;
</script>

<a class="back" href="/projects/{a.project}">← {a.project}</a>
<h1 style="margin-top:10px">{a.title}</h1>
<div class="meta" style="margin-bottom:20px">
  <span class="chip">{a.kind}</span>
  <span class="chip">{a.status}</span>
  <span class="date">{a.created}</span>
</div>

<div class="note-body">{a.body}</div>
