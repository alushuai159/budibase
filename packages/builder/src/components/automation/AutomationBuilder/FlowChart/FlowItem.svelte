<script>
  import { automationStore } from "builderStore"
  import AutomationBlockTagline from "./AutomationBlockTagline.svelte"
  import { Icon } from "@budibase/bbui"

  export let onSelect
  export let block
  let selected

  $: selected = $automationStore.selectedBlock?.id === block.id
  $: steps =
    $automationStore.selectedAutomation?.automation?.definition?.steps ?? []
  $: blockIdx = steps.findIndex(step => step.id === block.id)
  $: allowDeleteTrigger = !steps.length

  function deleteStep() {
    console.log("Running")
    automationStore.actions.deleteAutomationBlock(block)
  }
</script>

<div
  class={`block ${block.type} hoverable`}
  class:selected
  on:click={() => onSelect(block)}
>
  <header>
    {#if block.type === "TRIGGER"}
      <Icon name="Light" />
      <span>When this happens...</span>
    {:else if block.type === "ACTION"}
      <Icon name="FlashOn" />
      <span>Do this...</span>
    {:else if block.type === "LOGIC"}
      <Icon name="Branch2" />
      <span>Only continue if...</span>
    {/if}
    <div class="label">
      {#if block.type === "TRIGGER"}Trigger{:else}Step {blockIdx + 1}{/if}
    </div>
    {#if block.type !== "TRIGGER" || allowDeleteTrigger}
      <div on:click|stopPropagation={deleteStep}><Icon name="Close" /></div>
    {/if}
  </header>
  <hr />
  <p>
    <AutomationBlockTagline {block} />
  </p>
</div>

<style>
  .block {
    width: 360px;
    padding: 20px;
    border-radius: var(--border-radius-m);
    transition: 0.3s all ease;
    box-shadow: 0 4px 30px 0 rgba(57, 60, 68, 0.08);
    font-size: 16px;
    background-color: var(--spectrum-global-color-gray-50);
    color: var(--grey-9);
  }
  .block.selected,
  .block:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 30px 0 rgba(57, 60, 68, 0.15);
  }

  header {
    font-size: 16px;
    font-weight: 500;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: var(--spacing-xs);
  }
  header span {
    flex: 1 1 auto;
  }
  header .label {
    font-size: 14px;
    padding: var(--spacing-s);
    border-radius: var(--border-radius-m);
    background-color: var(--grey-2);
    color: var(--grey-8);
  }
  header i {
    font-size: 20px;
  }
  header i.delete {
    opacity: 0.5;
  }
  header i.delete:hover {
    cursor: pointer;
    opacity: 1;
  }
</style>
