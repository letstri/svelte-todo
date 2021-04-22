<script lang="ts">
  import { list, selection } from '../store/todo';
  import Button from './Button.svelte';
  import TodoAdd from './TodoAdd.svelte';
  import TodoItem from './TodoItem.svelte';

  const removeSelected = () => {
    $selection.forEach(list.remove);
  };
</script>

<h1 class="title">
  TODO
</h1>
<div class="header">
  <div>
    <TodoAdd />
  </div>
  <div>
    {#if $list.length}
      <Button
        on:click={removeSelected}
        type="danger"
        disabled={!$selection.length}
      >
        Remove
        {#if $selection.length}
          ({$selection.length})
        {/if}
      </Button>
      <Button
        on:click={list.removeAll}
        type="danger"
      >
        Remove all
        ({$list.length})
      </Button>
    {/if}
  </div>
</div>

{#if $list.length}
  {#each $list as item}
    <TodoItem {item} />
  {/each}
{:else}
  <div class="empty">
    List is empty
  </div>
{/if}

<style lang="scss">
  .title {
    font-size: 100px;
    margin: 0;
  }

  .empty {
    font-size: 20px;
    margin: 40px 0;
    text-align: center;
  }

  .header {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(#000, 0.1);
  }
</style>
