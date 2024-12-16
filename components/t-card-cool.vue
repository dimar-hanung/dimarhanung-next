<template>
  <div
    ref="wrapper"
    class="wrapper relative z-10 rounded-xl overflow-hidden p-[2px] hover:bg-primary-400 transition-colors duration-300 w-full"
    :style="{ '--x': x + 'px', '--y': y + 'px' }"
  >
    <div
      class="inner rounded-xl p-3 h-full w-full bg-muted-50 dark:bg-muted-800"
    >
      <slot> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const wrapper = ref<HTMLElement | null>(null);
const x = ref(-350);
const y = ref(-350);

function mouseMoveGradient(e: MouseEvent) {
  if (wrapper.value) {
    const rect = wrapper.value.getBoundingClientRect();
    const diffX = e.clientX - rect.x;
    const diffY = e.clientY - rect.y;

    x.value = diffX;
    y.value = diffY;
  }
}

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    document.addEventListener("mousemove", mouseMoveGradient, false);
  } else {
    document.removeEventListener("mousemove", mouseMoveGradient, false);
  }
});

onMounted(() => {
  if (wrapper.value) {
    observer.observe(wrapper.value);
  }
});

onUnmounted(() => {
  observer.disconnect();
});
</script>

<style scoped>
.wrapper:before {
  background: radial-gradient(
    250px circle at var(--x) var(--y),
    #40c371 0,
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
