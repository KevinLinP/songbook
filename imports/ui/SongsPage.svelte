<script>
  import { Mongo } from 'meteor/mongo'
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'

  import Songs from './songs.js'
  import SongSelect from './SongSelect.svelte'
  import Song from './Song.svelte'
  
  export let currentRoute
  export let params

  $: songs = useTracker(() => Songs.find({}, {sort: {title: 1}}).fetch())
  $: currentSongId = currentRoute.namedParams.id
  $: song = useTracker(() => Songs.findOne(new Mongo.ObjectID(currentSongId)))
</script>

<div class="my-3">
  <SongSelect {songs}/>
</div>

{#if currentSongId}
  {#if $song}
    <Song song={$song}/>
  {/if}
{:else}
  <header class="mt-4 mb-4">
    <h1 class="display-5">Hash House Harriers Songbook</h1>
  </header>

  <p class="mb-5">Search to begin.</p>
  <p class="text-muted">Add this page to your homescreen and your phone will try to remember the songs for a few days.</p>
{/if}