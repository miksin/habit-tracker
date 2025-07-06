<script lang="ts">
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  onMount(() => {
    if (data.session) {
      window.location.href = "/dashboard";
    }
  });

  const createAccount = async () => {
    const response = await fetch("/api/auth/init", {
      method: "POST",
    });

    if (response.ok) {
      window.location.href = "/dashboard";
    } else {
      console.error("Failed to create account");
    }
  };
</script>

<button class="btn btn-lg btn-primary" onclick={createAccount}>創立帳號</button>
