<script lang="ts">
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  onMount(() => {
    if (!data.session) {
      window.location.href = "/";
    }
  });

  let submitted = $state(false);
  let loginLink = $state<string | null>(null);

  const getLoginToken = async () => {
    submitted = true;
    const response = await fetch("/api/auth/link", {
      method: "POST",
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
  <button
    class="btn btn-lg btn-primary"
    onclick={getLoginToken}
    disabled={!!loginLink || submitted}>產生登入連結</button
  >

  {#if loginLink}
    <div class="flex flex-col gap-4">
      <p>請於24小時內使用以下連結登入：</p>
      <p>{loginLink}</p>
    </div>
  {/if}
</div>
