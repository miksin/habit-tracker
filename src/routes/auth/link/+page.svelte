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
    } else {
      console.error("Failed to create login link");
    }
  };
</script>

<button class="btn" onclick={getLoginToken} disabled={!!loginLink || submitted}
  >產生登入連結</button
>

{#if loginLink}
  <div class="flex flex-col">
    <p>請使用以下連結登入：</p>
    <p class="text-2xl">{loginLink}</p>
  </div>
{/if}
