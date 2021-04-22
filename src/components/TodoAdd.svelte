<script lang="ts">
  import { list } from '../store/todo';
  import Input from './Input.svelte';
  import Button from './Button.svelte';

  let title = '';

  const add = () => {
    if (!title) {
      return;
    }

    list.add({ title, id: new Date().valueOf(), created: new Date() });
    title = '';
  };
</script>

<div class="todo-add">
  <Input
    bind:value={title}
    on:enter={add}
  />

  <Button
    on:click={add}
    disabled={!title}
  >
    Add
  </Button>
</div>

<style lang="scss">
  .todo-add {
    :global(.input) {
      width: 300px;
    }
  }
</style>
