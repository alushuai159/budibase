<script>
  import { Icon, Button, Input } from "@budibase/bbui"

  export let defaults
  export let object = defaults || {}
  export let readOnly

  let fields = Object.entries(object).map(([name, value]) => ({ name, value }))

  $: object = fields.reduce(
    (acc, next) => ({ ...acc, [next.name]: next.value }),
    {}
  )

  function addEntry() {
    fields = [...fields, {}]
  }

  function deleteEntry(idx) {
    fields.splice(idx, 1)
    fields = fields
  }
</script>

<!-- Builds Objects with Key Value Pairs. Useful for building things like Request Headers. -->
<div class="container" class:readOnly>
  {#each fields as field, idx}
    <Input placeholder="Key" bind:value={field.name} />
    <Input placeholder="Value" bind:value={field.value} />
    {#if !readOnly}
      <Icon hoverable name="Close" on:click={() => deleteEntry(idx)} />
    {/if}
  {/each}
</div>
{#if !readOnly}
  <div>
    <Button secondary thin outline on:click={addEntry}>Add</Button>
  </div>
{/if}

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr 20px;
    grid-gap: var(--spacing-m);
    align-items: center;
    margin-bottom: var(--spacing-m);
  }

  .ri-close-circle-fill {
    cursor: pointer;
  }
</style>
