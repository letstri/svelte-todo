<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  let className = '';
  export let value = '';
  export let placeholder = '';
  export { className as class };

  const dispatch = createEventDispatcher();

  const onInput = (e: any) => {
    value = e.target.value;
  };
  const onKeydown = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      dispatch('enter');
    }
  };
</script>

<input
  type="text"
  {value}
  {placeholder}
  class={`input ${className}`}
  on:input={onInput}
  on:keydown={onKeydown}
>

<style lang="scss">
.input {
  padding: 10px 20px;
  border: 1px solid rgba(#000, 0.1);
  border-radius: 5px;
  outline: none;
}
</style>
