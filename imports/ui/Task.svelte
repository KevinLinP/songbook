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
 

<li class:checked="{task.checked}" class="mb-4 form-check">
  <label class="form-check-label">{ task.text }</label>
 
  <input
    type="checkbox"
    readonly
    checked={!!task.checked}    
    on:click={toggleChecked}
    class="form-check-input"
  />

  <button class="btn btn-light btn-sm" on:click={deleteTask}>
    ×
  </button>
</li>