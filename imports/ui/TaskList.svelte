<script>
  import { Meteor } from "meteor/meteor";
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { Tasks } from '../api/tasks.js'
  import { onMount } from 'svelte';

  import Task from './Task.svelte';

  export let currentRoute;
  export let params;

  onMount(async () => {
    Meteor.subscribe('tasks');
  });

  let newTask = "";

  function handleSubmit() {
    Tasks.insert({
      text: newTask,
      // createdAt: new Date()
    })

    newTask = "";
  }
  
  $: tasks = useTracker(() => Tasks.find({}, {sort: {createdAt: -1}}).fetch());
</script>
 
 
<div class="container">
  <header>
    <h1>Todo List</h1>

    <form class="new-task" on:submit|preventDefault={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new tasks"
        bind:value={newTask}
      />
    </form>
  </header>

  <ul>
  {#each $tasks as task}
    <Task
      key={task._id}
      task={task}
    />
  {/each}
  </ul>
</div>