<script>
  import { Icon } from "@budibase/bbui"
  import { automationStore } from "builderStore"
  import { database } from "stores/backend"
  import WebhookDisplay from "./WebhookDisplay.svelte"
  import { ModalContent } from "@budibase/bbui"
  import { onMount, onDestroy } from "svelte"

  const POLL_RATE_MS = 2500
  let interval
  let finished = false
  let schemaURL
  let propCount = 0

  $: instanceId = $database._id
  $: automation = $automationStore.selectedAutomation?.automation

  onMount(async () => {
    // save the automation initially
    await automationStore.actions.save({
      instanceId,
      automation,
    })
    interval = setInterval(async () => {
      await automationStore.actions.fetch()
      const outputs = automation?.definition?.trigger.schema.outputs?.properties
      // always one prop for the "body"
      if (Object.keys(outputs).length > 1) {
        propCount = Object.keys(outputs).length - 1
        finished = true
      }
    }, POLL_RATE_MS)
    schemaURL = automation?.definition?.trigger?.inputs.schemaUrl
  })

  onDestroy(() => {
    clearInterval(interval)
  })
</script>

<ModalContent
  title="Webhook Setup"
  confirmText="Finished"
  showConfirmButton={finished}
  cancelText="Skip"
>
  <p>
    Webhooks are for receiving data. To make them easier please use the URL
    shown below and send a
    <code>POST</code>
    request to it from your other application. If you're unable to do this now then
    you can skip this step, however we will not be able to configure bindings for
    your later actions!
  </p>
  <WebhookDisplay value={schemaURL} />
  {#if finished}
    <p class="finished-text">
      Request received! We found
      {propCount}
      bindable value{propCount > 1 ? "s" : ""}.
    </p>
  {/if}
  <a
    slot="footer"
    target="_blank"
    href="https://docs.budibase.com/automate/steps/triggers"
  >
    <Icon name="InfoOutline" />
    <span>Learn about webhooks</span>
  </a>
</ModalContent>

<style>
  a {
    color: var(--ink);
    font-size: 14px;
    vertical-align: middle;
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  a span {
    text-decoration: underline;
    margin-left: var(--spectrum-alias-item-padding-s);
  }
  p {
    margin: 0;
    text-align: justify;
  }
  .finished-text {
    font-weight: 500;
    text-align: center;
    color: var(--blue);
  }
  code {
    padding: 1px 4px 1px 4px;
    font-size: 14px;
    color: var(--grey-7);
    background-color: var(--grey-4);
    border-radius: 2px;
  }
</style>
