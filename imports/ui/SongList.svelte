<script>
  import { Meteor } from "meteor/meteor"
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'
  import { Songs as SongsUncached } from '../api/songs.js'
  import { onMount } from 'svelte'
  import { Ground } from 'meteor/ground:db'
  import Select from 'svelte-select'

  import Song from './Song.svelte'
  
  // TODO: init with random song

  export let currentRoute
  export let params

  const Songs = new Ground.Collection('songs')
  Songs.observeSource(SongsUncached.find())

  onMount(async () => {
    Meteor.subscribe('songs')
  })

  const selectProps = {
    isVirtualList: true,
    placeholder: 'Search ...',
    optionIdentifier: '_id',
    getOptionLabel: (option, filterText) => option.title,
    getSelectionLabel: (option) => option.title,
  }

  let selectedValue = undefined;

  $: songs = useTracker(() => Songs.find({}, {sort: {title: 1}}).fetch())

  const MarkdownIt = require('markdown-it')
  const md = new MarkdownIt()
  $: mainContentHtml = selectedValue ? md.render(selectedValue.mainContentMarkdown) : null
</script>

<div class="mt-5">
  <Select items={$songs} {...selectProps} bind:selectedValue></Select>
</div>

 
<header class="my-5">
  <h1>
  {#if selectedValue}
    { selectedValue.title }
  {/if}
  </h1>
</header>

{#if mainContentHtml }
  <div>{@html mainContentHtml }</div>
{/if}