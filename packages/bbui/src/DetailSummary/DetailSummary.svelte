<script>
  import Icon from "../Icon/Icon.svelte"
  import { createEventDispatcher } from "svelte"

  const dispatch = createEventDispatcher()

  export let thin = false
  export let name,
    show = false

  const onHeaderClick = () => {
    show = !show
    if (show) {
      dispatch("open")
    }
  }
</script>

<div class="property-group-container" class:thin>
  <div class="property-group-name" on:click={onHeaderClick}>
    <div class:thin class="name">{name}</div>
    <div class="icon">
      <Icon size="S" name={show ? "Remove" : "Add"} />
    </div>
  </div>
  <div class="property-panel" class:show>
    <slot />
  </div>
</div>

<style>
  .property-group-container {
    display: flex;
    flex-direction: column;
    height: auto;
    justify-content: center;
    border-radius: var(--border-radius-m);
    font-family: var(--font-sans);
  }

  .property-group-name {
    cursor: pointer;
    display: flex;
    flex-flow: row nowrap;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .name {
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.14px;
    color: var(--ink);
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: capitalize;
    white-space: nowrap;
    user-select: none;
  }
  .name.thin {
    font-size: var(--spectrum-global-dimension-font-size-75);
  }

  .icon {
    flex: 0 0 20px;
    text-align: center;
  }

  .property-panel {
    /* height: 0px;
    overflow: hidden; */
    display: none;
  }

  .show {
    /* overflow: auto;
    height: auto; */
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-top: var(--spacing-m);
  }
</style>
