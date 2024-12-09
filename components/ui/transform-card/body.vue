<template>
  <div
    :class="cn('h-96 w-96', $props.class)"
    style="transform-style: preserve-3d"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  class: String,
});
</script>
