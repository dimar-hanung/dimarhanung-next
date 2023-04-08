<template>
  <div
    v-if="$route.query.preview !== 'full'"
    class="p-4 bg-slate-800 text-white flex justify-between"
  >
    <ClientOnly>
      <div><font-awesome-icon :icon="['fa', 'home-alt']" /> Home</div>
    </ClientOnly>
    <ClientOnly><font-awesome-icon :icon="['fa', 'times']" /></ClientOnly>
  </div>
  <NuxtPage />
</template>

<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
});

useSeoMeta({
  title: "FrontEnd Mentor (●'◡'●)",
});
</script>
