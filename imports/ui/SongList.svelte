<script>
  import { Meteor } from "meteor/meteor"
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'
  import { Songs as SongsUncached } from '../api/songs.js'
  import { onMount } from 'svelte'
  import { Ground } from 'meteor/ground:db'
  import Select from 'svelte-select'

  import Song from './Song.svelte'

  export let currentRoute
  export let params

  const Songs = new Ground.Collection('songs')
  Songs.observeSource(SongsUncached.find())

  onMount(async () => {
    Meteor.subscribe('songs')
  })

  let selectedSong = null

  const selectProps = {
    isVirtualList: true,
    // optionIdentifier: '_id',
    // getOptionLabel: (option, filterText) => option.title,
    // getSelectionLabel: (option) => option.title,
  }

  $: songs = useTracker(() => Songs.find({}, {sort: {title: 1}}).fetch())
  $: songSelectItems = $songs.map((s) => { return {label: s.title, value: s._id} })
  $: console.log('ss', selectedSong)
</script>

<div class="mt-5">
  <Select items={songSelectItems} {...selectProps} bind:selectedSong></Select>
</div>

 
<header class="my-5">
  <h1>
  {#if selectedSong}
    { selectedSong.title }
  {/if}
  </h1>
</header>

<ul class="list-unstyled">
{#each $songs as song}
  <Song
    song={song}
  />
{/each}
</ul>