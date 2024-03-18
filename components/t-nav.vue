<template>
  <div class="p-4 sticky top-0 dark:text-white">
    <div
      class="container mx-auto bg-white dark:bg-muted-900 dark:shadow-2xl shadow-xl p-3 rounded flex justify-between border-2 border-transparent dark:border-primary-300 dark:shadow-primary-400"
    >
      <div></div>

      <div class="flex gap-4 place-items-center">
        <NuxtLink to="https://dimar-hanung.netlify.app/"
          ><div><button>Blog</button></div></NuxtLink
        >
        {{ color.value }}
        <!-- <div><button>Contact me</button></div> -->
        <t-switch-color></t-switch-color>
        <t-switch-dark-mode></t-switch-dark-mode>
      </div>
    </div>
  </div>
</template>
<script setup>
const color = useColorMode();
</script>
