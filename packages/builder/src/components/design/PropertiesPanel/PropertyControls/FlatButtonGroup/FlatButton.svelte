<script>
  export let value = ""
  export let text = ""
  export let icon = ""
  export let onClick = () => {}
  export let selected = false

  $: useIcon = !!icon
</script>

<div class="flatbutton" class:selected on:click={() => onClick(value || text)}>
  {#if useIcon}
    <i class={icon} />
  {:else}
    <span>
      {@html text}
    </span>
  {/if}
</div>

<style>
  .flatbutton {
    cursor: pointer;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background: var(--background);
    color: var(--grey-7);
    border-radius: var(--border-radius-m);
    font-size: var(--spectrum-global-dimension-font-size-75);
    font-weight: 500;
    transition: all 0.3s;
    text-rendering: optimizeLegibility;
  }

  .selected {
    background: var(--grey-2);
    color: var(--ink);
  }

  i {
    font-size: 16px;
  }
</style>
