<template>
  <WaveSurface
    as="span"
    class="more-projects-btn inline-flex items-center justify-center px-8 py-3 text-base font-semibold text-white rounded-lg bg-primary-600 hover:bg-primary-700"
  >
    <slot />
  </WaveSurface>
</template>

<script lang="ts" setup></script>

<style scoped>
.more-projects-btn {
  transition:
    background-color 180ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 140ms cubic-bezier(0.23, 1, 0.32, 1);
}

.more-projects-btn:active {
  transform: scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .more-projects-btn {
    transition: none;
  }

  .more-projects-btn:active {
    transform: none;
  }
}
</style>
