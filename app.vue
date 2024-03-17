<template>
  <div :class="[color.value]">
    <NuxtPage />
  </div>
</template>
<script setup>
const color = useColorMode();
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
