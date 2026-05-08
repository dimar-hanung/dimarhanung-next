<template>
  <div
    class="min-h-screen min-w-screen grid place-items-center text-slate-400"
  >
    <div class="text-center space-y-3">
      <div
        class="w-16 h-16 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 mx-auto"
      >
        <font-awesome-icon :icon="['fa', 'cloud']" class="text-2xl" />
      </div>
      <h2 class="text-xl font-bold text-slate-200">Challenges</h2>
      <p class="text-sm">Select a challenge from the sidebar to get started.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
});
</script>