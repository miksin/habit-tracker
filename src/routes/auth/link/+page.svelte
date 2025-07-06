<script lang="ts">
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";
  import { Turnstile } from "svelte-turnstile";
  import { qr } from "@svelte-put/qr/svg";

  let { data }: PageProps = $props();

  onMount(() => {
    if (!data.session) {
      window.location.href = "/";
    }
  });

  let submitted = $state(false);
  let turnstileToken = $state<string | null>(null);
  let loginLink = $state<string | null>(null);

  const getLoginToken = async () => {
    if (!turnstileToken) {
      console.error("Turnstile token is required");
      return;
    }
    submitted = true;
    const response = await fetch("/api/auth/link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        turnstileToken,
      }),
    });

    if (response.ok) {
      const { token } = await response.json();
      loginLink = `${window.location.origin}/api/auth/link/${token}`;
      navigator.clipboard.writeText(loginLink);
    } else {
      console.error("Failed to create login link");
    }
  };
</script>

<div class="flex flex-col gap-4">
  <Turnstile
    siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
    on:callback={(e) => (turnstileToken = e.detail.token)}
    size="flexible"
  />

  <button
    class="btn btn-lg btn-primary"
    onclick={getLoginToken}
    disabled={!!loginLink || !turnstileToken || submitted}>產生登入連結</button
  >

  {#if loginLink}
    <div class="flex flex-col gap-4">
      <p>請於24小時內使用以下連結登入：</p>
      <p>{loginLink}</p>
      <svg
        use:qr={{
          data: loginLink,
          logo: "/icon.svg",
          shape: "square",
        }}
      />
    </div>
  {/if}
</div>
