<script>
  import { Meteor } from "meteor/meteor"
  import { useTracker } from 'meteor/rdb:svelte-meteor-data'
  import { Songs as SongsUncached } from '../api/songs.js'
  import { onMount } from 'svelte'
  import { Ground } from 'meteor/ground:db'

  import Song from './Song.svelte'

  export let currentRoute
  export let params

  const Songs = new Ground.Collection('songs')
  Songs.observeSource(SongsUncached.find())

  onMount(async () => {
    Meteor.subscribe('songs')
  })

  $: songs = useTracker(() => Songs.find({}, {sort: {title: 1}}).fetch())
</script>
 
 
<header class="my-5">
  <h1>Songs</h1>
</header>

<ul class="list-unstyled">
{#each $songs as song}
  <Song
    key={song._id}
    song={song}
  />
{/each}
</ul>