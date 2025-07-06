<script lang="ts">
  import { onMount } from "svelte";
  import type { PageProps } from "./$types";

  let { data }: PageProps = $props();

  onMount(() => {
    if (data.session) {
      window.location.href = "/dashboard";
    }
  });
</script>

<a class="btn mx-auto my-auto btn-lg btn-primary" href="/auth/init">初次使用</a>
