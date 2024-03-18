<template>
  <nav class="p-4 sticky top-0 dark:text-white">
    <div
      class="container mx-auto bg-white dark:bg-muted-800 dark:shadow-2xl shadow-xl p-3 rounded-2xl flex justify-between max-w-max"
    >
      <div></div>

      <div class="flex place-items-center">
        <!-- <NuxtLink to="https://dimar-hanung.netlify.app/"
          ><div><button>Blog</button></div></NuxtLink
        > -->

        <!-- <div><button>Contact me</button></div> -->
        <t-switch-color></t-switch-color>
        <t-switch-dark-mode></t-switch-dark-mode>
      </div>
    </div>
  </nav>
</template>
<script setup>
const color = useColorMode();
</script>
