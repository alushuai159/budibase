<script>
  import { Input, Label, Link } from "@budibase/bbui"
  import api from "builderStore/api"
  import { notifications } from "@budibase/bbui"
  import { database } from "stores/backend"
  import analytics from "analytics"

  let keys = { budibase: "" }

  async function updateKey([key, value]) {
    if (key === "budibase") {
      const isValid = await analytics.identifyByApiKey(value)
      if (!isValid) {
        notifications.error("Your API Key is invalid.")
        keys = { ...keys }
        return
      }
    }
    const response = await api.put(`/api/keys/${key}`, { value })
    const res = await response.json()
    keys = { ...keys, ...res }
    notifications.success("API Key saved.")
  }

  // Get Keys
  async function fetchKeys() {
    const response = await api.get(`/api/keys/`)
    const res = await response.json()
    // dont want this to ever be editable, as its fetched based on Api Key
    if (res.userId) delete res.userId
    keys = res
  }

  fetchKeys()
</script>

<div class="container">
  <Input
    on:change={e => updateKey(["budibase", e.detail])}
    value={keys.budibase}
    label="Budibase Cloud API Key"
  />
  <Link primary href="https://portal.budi.live">
    Log in to the Budibase Hosting Portal to get your API Key. →
  </Link>
  <div>
    <Label extraSmall grey>Instance ID (Webhooks)</Label>
    <span>{$database._id}</span>
  </div>
</div>

<style>
  .container {
    display: grid;
    grid-gap: var(--spacing-xl);
  }

  span {
    font-size: var(--font-size-xs);
    font-weight: 500;
  }
</style>
