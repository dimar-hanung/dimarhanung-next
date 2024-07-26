<template>
  <div :class="containerClasses">
    <div
      class="relative flex w-full flex-1 items-center justify-center isolate z-0"
    >
      <div
        :class="[
          'absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-cyan-400 blur-2xl',
          { 'animate-blink': isBlinking },
        ]"
        :initial="{ width: '8rem' }"
        :enter="{ width: '16rem' }"
        :transition="{ delay: 300, duration: 800 }"
      ></div>

      <div
        :class="[
          'absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-cyan-400',
          { 'animate-blink': isBlinking },
        ]"
        :initial="{ width: '15rem' }"
        :enter="{ width: '30rem' }"
        :transition="{ delay: 300, duration: 800 }"
      ></div>
      <div
        v-motion
        :initial="{ opacity: 0.5, width: '15rem' }"
        :enter="{ opacity: 1, width: '30rem' }"
        :transition="{ delay: 300, duration: 800 }"
        :style="conicGradientStyle"
        :class="[
          'absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]',
          { 'animate-blink': isBlinking },
        ]"
      >
        <div
          class="absolute w-[100%] left-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"
        ></div>
        <div
          class="absolute w-40 h-[100%] left-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]"
        ></div>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0.5, width: '15rem' }"
        :enter="{ opacity: 1, width: '30rem' }"
        :transition="{ delay: 300, duration: 800 }"
        :style="conicGradientStyle"
        :class="[
          'absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]',
          { 'animate-blink': isBlinking },
        ]"
      >
        <div
          class="absolute w-40 h-[100%] right-0 bg-slate-950 bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]"
        ></div>
        <div
          class="absolute w-[100%] right-0 bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]"
        ></div>
      </div>

      <div
        class="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl"
      ></div>
      <div
        class="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"
      ></div>
      <div
        :class="[
          'absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-cyan-500 opacity-50 blur-3xl',
          { 'animate-blink': isBlinking },
        ]"
      ></div>

      <div
        class="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-slate-950"
      ></div>
    </div>

    <div class="relative z-50">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";

interface Props {
  className?: string;
  randomBlink?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  className: "",
  randomBlink: true,
});

const containerClasses = computed(() => [
  "relative  bg-slate-950 w-full rounded-md z-0 py-4",
  props.className,
]);

const conicGradientStyle = {
  backgroundImage:
    "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
};

const isBlinking = ref(false);
let blinkInterval: number | null = null;

const randomBlink = () => {
  if (Math.random() < 0.1) {
    // 10% chance to start blinking
    isBlinking.value = true;
    setTimeout(() => {
      isBlinking.value = false;
    }, Math.random() * 300 + 100); // Blink for 100-400ms
  }
};

onMounted(() => {
  if (props.randomBlink) {
    blinkInterval = setInterval(randomBlink, 300) as unknown as number; // Check every 1000ms (1 second)
  }
});

onUnmounted(() => {
  if (blinkInterval) {
    clearInterval(blinkInterval);
  }
});
</script>

<script lang="ts">
// This is needed to make the component usable with a default slot
export default {
  name: "LampContainer",
};
</script>

<style scoped>
@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-blink {
  animation: blink 0.3s ease-in-out;
}
</style>
