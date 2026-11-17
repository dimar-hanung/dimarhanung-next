<template>
  <!-- Retro desktop: the title bar of the hero window. Decorative; the page
       heading is still the h1 below it. Styled in public/home/themes/retro-os.css. -->
  <div data-retro-titlebar aria-hidden="true">
    <span>{{ t.themes.extras["retro-os"].heroTitle }}</span>
  </div>
</template>

<script setup lang="ts">
const { t } = useHomeI18n();
</script>
