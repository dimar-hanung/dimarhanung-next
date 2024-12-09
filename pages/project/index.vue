<template>
  <div class="dark:bg-muted-900 dark:text-slate-100">
    <t-nav class="z-10" />

    <h1 class="text-3xl text-center font-bold uppercase mt-8">Projects</h1>

    <HomeSProject></HomeSProject>
  </div>
</template>

<script setup lang="ts">
const theme = useColorMode();
</script>
