<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

<svelte:head>
  <title>Habit Tracker</title>
  <meta name="description" content="A simple habit tracker application." />
</svelte:head>

<main class="mx-auto flex min-h-dvh w-full max-w-128 flex-col md:py-8">
  {@render children()}
</main>
