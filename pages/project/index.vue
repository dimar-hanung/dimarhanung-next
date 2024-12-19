<template>
  <t-nav class="z-10" />
  <div class="dark:bg-muted-900 dark:text-slate-100 pb-32 pt-12 min-h-screen">
    <h1 class="text-3xl text-center font-bold uppercase">Projects</h1>

    <HomeProject :showFilter="true" :showAll="true" class="mt-8"></HomeProject>
  </div>
</template>

<script setup lang="ts">
const theme = useColorMode();
</script>
