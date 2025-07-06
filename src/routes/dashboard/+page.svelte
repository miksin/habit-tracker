<script lang="ts">
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  onMount(() => {
    if (!data.session) {
      window.location.href = "/";
    }
  });
</script>

<p>Dashboard</p>
