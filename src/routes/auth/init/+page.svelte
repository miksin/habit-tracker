<script lang="ts">
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import { Turnstile } from "svelte-turnstile";

  let { data }: PageProps = $props();

  onMount(() => {
    if (data.session) {
      window.location.href = "/dashboard";
    }
  });

  let submitted = $state(false);
  let turnstileToken = $state<string | null>(null);

  const createAccount = async () => {
    if (!turnstileToken) {
      console.error("Turnstile token is required");
      return;
    }
    submitted = true;
    const response = await fetch("/api/auth/init", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        turnstileToken,
      }),
    });

    if (response.ok) {
      window.location.href = "/dashboard";
    } else {
      console.error("Failed to create account");
    }
  };
</script>

<Turnstile
  siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
  on:callback={(e) => (turnstileToken = e.detail.token)}
  size="flexible"
/>

<button
  class="btn btn-lg btn-primary"
  onclick={createAccount}
  disabled={!turnstileToken || submitted}>創立帳號</button
>
