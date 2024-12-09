<template>
  <div class="p-4">
    <main class="h-full">
      <h3 class="text-center font-bold text-4xl">Tech Stack</h3>
      <section class="grid grid-cols-2 gap-8 mt-4">
        <div
          v-for="i in Array.from({ length: 3 })"
          ref="wrapper"
          class="wrapper relative z-10 rounded-xl overflow-hidden p-[2px] hover:bg-primary-600 transition-colors duration-300 w-full h-44"
          style="--x: -350px; --y: -350px"
        >
          <div
            class="inner bg-muted-100 dark:bg-muted-800 rounded-xl p-3 h-full"
          >
            <h3 class="text-3xl font-bold">Card Title</h3>
            <p>Content inside</p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
const wrapper = ref<Array<HTMLElement | null>>([]);

function mouseMoveGradient(e: MouseEvent) {
  for (let i = 0; i < wrapper.value.length; i++) {
    const rect = wrapper.value[i]?.getBoundingClientRect();

    if (rect) {
      const x = e.clientX;
      const y = e.clientY;

      const diffX = x - rect.x;
      const diffY = y - rect.y;

      wrapper.value[i]?.style.setProperty("--x", `${diffX}px`);
      wrapper.value[i]?.style.setProperty("--y", `${diffY}px`);
    }
  }
}

onMounted(() => {
  document.addEventListener("mousemove", mouseMoveGradient, false);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", mouseMoveGradient, false);
});
</script>

<style scoped>
.wrapper:before {
  background: radial-gradient(
    250px circle at var(--x) var(--y),
    rgb(var(--color-primary-600)) 0,
    transparent 100%
  );
  will-change: background;
  content: "";
  display: block;
  position: absolute;
  left: -2px;
  top: -2px;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  z-index: -1;
}
</style>
