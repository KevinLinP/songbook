<script>
  import { Meteor } from "meteor/meteor"
  import { Mongo } from 'meteor/mongo'
  import { useTracker, useSession } from 'meteor/rdb:svelte-meteor-data'
  import { Songs as SongsUncached } from '../api/songs.js'
  import { onMount } from 'svelte'
  import { Ground } from 'meteor/ground:db'
  import { Session } from 'meteor/session'

  import SongSelect from './SongSelect.svelte'
  import Song from './Song.svelte'
  
  // TODO: init with random song

  export let currentRoute
  export let params

  const Songs = new Ground.Collection('songs')
  Songs.observeSource(SongsUncached.find())

  let song

  onMount(async () => {
    Meteor.subscribe('songs')
  })

  $: songs = useTracker(() => Songs.find({}, {sort: {title: 1}}).fetch())
  $: currentSongId = new Mongo.ObjectID(currentRoute.namedParams.id)
  $: song = useTracker(() => Songs.findOne(currentSongId))
</script>

<div class="mt-5">
  <SongSelect {songs}/>
</div>

{#if $song}
  <Song song={$song}/>
{/if}