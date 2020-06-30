<script>
  import { Meteor } from "meteor/meteor"
  import { Mongo } from 'meteor/mongo'
  import { Tracker } from 'meteor/tracker'
  import { useTracker, useSession } from 'meteor/rdb:svelte-meteor-data'
  import { Songs as SongsUncached } from '../api/songs.js'
  import { onMount } from 'svelte'
  import { Ground } from 'meteor/ground:db'
  import { Session } from 'meteor/session'

  import SongSelect from './SongSelect.svelte'
  import Song from './Song.svelte'
  
  export let currentRoute
  export let params

  // TODO: move Songs into own file
  const Songs = new Ground.Collection('songs')
  Songs.observeSource(SongsUncached.find())
  let lastUpdatedAt = localStorage.getItem('songsLastUpdatedAt') || new Date('1900-01-01')

  let song

  onMount(async () => {
    Meteor.subscribe('songs', lastUpdatedAt)
  })

  Tracker.autorun(() => {
    lastSong = Songs.findOne({}, {sort: {updatedAt: -1}, fields: {updatedAt: 1}})
    if (lastSong && (lastSong.updatedAt > lastUpdatedAt)) {
      lastUpdatedAt = lastSong.updatedAt
      localStorage.setItem('songsLastUpdatedAt', lastUpdatedAt)
    }
  })

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