<template>
  <div
    class="text-2xl text-yellow-500 cursor-pointer h-9 w-9 rounded grid place-items-center hover:bg-muted-200 dark:hover:bg-muted-700 hover:bg-opacity-50 transition-all"
    @click="toggleDarkMode"
  >
    <Icon name="uil:sun" v-if="color.value == 'light'"></Icon>
    <Icon v-else="color.value == 'dark'" name="uil:moon"></Icon>
  </div>
</template>

<script setup lang="ts">
const color = useColorMode();

const toggleDarkMode = () => {
  if (color.value === "light") {
    color.value = "dark";
    color.preference = "dark";
    return;
  }
  color.value = "light";
  color.preference = "light";
};
</script>
