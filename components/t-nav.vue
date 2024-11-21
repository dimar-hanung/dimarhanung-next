<template>
  <nav
    :class="[
      'sticky top-0 dark:text-white transition-all',
      isTop ? 'p-0' : 'p-4',
    ]"
  >
    <div
      :class="[
        'bg-white p-3 flex justify-between border-b dark:border-transparent transition-all mx-auto',
        'dark:bg-muted-950 ',
        isTop ? 'w-full' : 'shadow-xl dark:shadow-2xl rounded-2xl',
      ]"
    >
      <div></div>

      <div class="flex place-items-center justify-center">
        <t-switch-color></t-switch-color>
        <t-switch-dark-mode></t-switch-dark-mode>
      </div>
    </div>
  </nav>
</template>
<script setup>
const color = useColorMode();

// listen scroll on top or not
const isTop = ref(true);

const onScroll = () => {
  isTop.value = window.scrollY < 10;
};

onMounted(() => {
  window.addEventListener("scroll", onScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>
