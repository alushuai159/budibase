<script>
  import { ActionButton } from "@budibase/bbui"
  import GoogleLogo from "/assets/google-logo.png"
</script>

<ActionButton>
  <a target="_blank" href="/api/admin/auth/google">
    <div class="inner">
      <img src={GoogleLogo} alt="google icon" />
      <p>Sign in with Google</p>
    </div>
  </a>
</ActionButton>

<style>
  .outer {
    border: 1px solid #494949;
    border-radius: 4px;
    width: 100%;
    background-color: var(--background-alt);
  }
  .inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: var(--spacing-xs);
    padding-bottom: var(--spacing-xs);
  }
  .inner img {
    width: 18px;
    margin: 3px 10px 3px 3px;
  }
  .inner p {
    margin: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
</style>
