<script>
  import { Tasks } from "../api/tasks.js";
  export let key;
  export let task;

  function toggleChecked() {
    Tasks.update(task._id, {
      $set: { checked: !task.checked }
    })
  }

  function deleteTask() {
    Tasks.remove(task._id);
  }
</script>
 

<li class:checked="{task.checked}">
  <button class="delete" on:click={deleteTask}>
    ×
  </button>
 
  <input
    type="checkbox"
    readonly
    checked={!!task.checked}    
    on:click={toggleChecked}
  />
 
  <span class="text">{ task.text }</span>
</li>