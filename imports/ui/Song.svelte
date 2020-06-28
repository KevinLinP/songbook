<script>
  const MarkdownIt = require('markdown-it')

  export let song

  const md = new MarkdownIt()
  $: mainContentHtml = md.render(song.mainContentMarkdown)
  // $: console.log(song)
</script>

<header class="mt-4 mb-4">
  <h1 class="display-4">{ song.title }</h1>
  {#if song.tune}
    <p class="text-muted" style="font-size: 0.9rem;">tune: {song.tune}</p>
  {/if}
</header>

<div>{@html mainContentHtml}</div>

<div class="mt-4 mb-3" style="font-size: 0.8rem;">
  <p class="text-muted">
    source:
    <a href={song.url} target="_blank" class="text-decoration-none text-muted">
      {song.url.replace(/https?\:\/\//, '')}
    </a>
  </p>
</div>