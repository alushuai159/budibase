<script>
  import {
    Heading,
    Icon,
    Body,
    Layout,
    ActionMenu,
    MenuItem,
  } from "@budibase/bbui"
  import { gradient } from "actions"
  import { auth } from "stores/portal"

  export let app
  export let exportApp
  export let openApp
  export let deleteApp
  export let releaseLock
  export let deletable
</script>

<div class="wrapper">
  <Layout noPadding gap="XS" alignContent="start">
    <div class="preview" use:gradient={{ seed: app.name }} />
    <div class="title">
      <div class="name" on:click={() => openApp(app)}>
        <Heading size="XS">
          {app.name}
        </Heading>
      </div>
      <ActionMenu align="right">
        <Icon slot="control" name="More" hoverable />
        <MenuItem on:click={() => exportApp(app)} icon="Download">
          Export
        </MenuItem>
        {#if deletable}
          <MenuItem on:click={() => deleteApp(app)} icon="Delete">
            Delete
          </MenuItem>
        {/if}
        {#if app.lockedBy && app.lockedBy?.email === $auth.user?.email}
          <MenuItem on:click={() => releaseLock(app.appId)} icon="LockOpen">
            Release Lock
          </MenuItem>
        {/if}
      </ActionMenu>
    </div>
    <div class="status">
      <Body size="S">
        Edited {Math.floor(1 + Math.random() * 10)} months ago
      </Body>
      {#if app.lockedBy}
        <Icon name="LockClosed" />
      {/if}
    </div>
  </Layout>
</div>

<style>
  .wrapper {
    overflow: hidden;
  }
  .preview {
    height: 135px;
    border-radius: var(--border-radius-s);
    margin-bottom: var(--spacing-s);
  }

  .title,
  .status {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .name {
    text-decoration: none;
    flex: 1 1 auto;
    width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-right: var(--spacing-m);
  }
  .title :global(h1) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .title :global(h1:hover) {
    color: var(--spectrum-global-color-blue-600);
    cursor: pointer;
    transition: color 130ms ease;
  }
</style>
