<template>
  <div
    class="text-2xl cursor-pointer h-9 w-9 rounded-sm grid place-items-center hover:bg-muted-200/50 dark:hover:bg-muted-700 transition-all"
    @click="toggleDarkMode"
  >
    <Icon
      class="text-yellow-900"
      name="uil:sun"
      v-if="color.value == 'light'"
    ></Icon>
    <Icon
      class="text-yellow-500"
      v-else="color.value == 'dark'"
      name="uil:moon"
    ></Icon>
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
