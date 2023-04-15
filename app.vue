<template>
  <div
    :class="[
      darkMode ? 'dark' : 'light',
      'transition-all',
      'duration-700',
      'antialiased',
    ]"
  >
    <NuxtPage />
  </div>
</template>
<script setup>
import "@/assets/css/tailwind.css";

const darkMode = useDarkMode();
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
