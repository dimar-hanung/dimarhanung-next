<template>
  <div class="min-h-screen min-w-screen grid place-items-center">
    <div class="text-2xl">
      Under Development.x.. (●'◡'●)x{{ $route.params.slug }}
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
});
</script>
