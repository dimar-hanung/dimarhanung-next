<template>
  <img
    class="illo"
    :src="illustration.src"
    :alt="illustration.alt"
    :aria-hidden="illustration.alt ? undefined : 'true'"
    :width="illustration.width"
    :height="illustration.height"
    loading="lazy"
    decoding="async"
  >
</template>

<script setup lang="ts">
import type { SrsIllustration } from "../data";

defineProps<{
  illustration: SrsIllustration;
}>();
</script>

<style scoped>
/* The parent sets the rendered height with `--illo-height` (padding included);
   the width follows the width/height attributes, so the slot never shifts
   while loading. Backdrops and dark-mode dimming are up to each placement. */
.illo {
  display: block;
  width: auto;
  max-width: 100%;
  height: var(--illo-height, 8rem);
  object-fit: contain;
}
</style>
