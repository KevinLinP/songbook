<script>
  const MarkdownIt = require('markdown-it')

  export let song

  const md = new MarkdownIt()
  $: mainContentHtml = md.render(song.mainContentMarkdown)
</script>

<header class="my-5">
  <h1>{ song.title }</h1>
</header>

{#if mainContentHtml }
  <div>{@html mainContentHtml}</div>
{/if}