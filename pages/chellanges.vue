<template>
  <NuxtPage />
</template>

<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
});
</script>
