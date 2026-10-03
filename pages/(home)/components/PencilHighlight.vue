<template>
  <span
    ref="target"
    class="relative inline-block whitespace-nowrap"
    :class="{ 'is-drawn': isDrawn }"
    :style="{ '--pencil-delay': `${delay}ms` }"
  >
    <!-- Two rough graphite strokes behind the words, drawn once when they scroll into view -->
    <svg
      class="pointer-events-none absolute -left-[0.06em] top-[0.4em] h-[0.95em] w-[calc(100%+0.16em)]"
      :class="
        tone === 'negative'
          ? 'text-red-300 dark:text-red-900'
          : 'text-green-300 dark:text-green-800'
      "
      viewBox="0 0 300 40"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter :id="filterId" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
            seed="7"
            result="grain"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="grain"
            scale="5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
      <g
        :filter="`url(#${filterId})`"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
      >
        <path
          class="pencil-stroke"
          pathLength="1"
          stroke-width="16"
          opacity="0.75"
          d="M6 22 C 70 15, 150 24, 294 16"
        />
        <path
          class="pencil-stroke pencil-stroke-second"
          pathLength="1"
          stroke-width="11"
          opacity="0.55"
          d="M14 30 C 90 25, 190 32, 288 25"
        />
      </g>
    </svg>
    <span class="relative text-muted-900 dark:text-muted-100"><slot /></span>
  </span>
</template>

<script setup lang="ts">
// negative = red (what to avoid), positive = green (what you get instead)
withDefaults(
  defineProps<{ tone: "negative" | "positive"; delay?: number }>(),
  { delay: 0 }
);

const filterId = `pencil-${useId()}`;

// Draw once, the first time the words are on screen.
const target = ref<HTMLElement | null>(null);
const isDrawn = ref(false);

const { stop } = useIntersectionObserver(
  target,
  ([entry]) => {
    if (!entry?.isIntersecting) return;
    isDrawn.value = true;
    stop();
  },
  { threshold: 1 }
);
</script>

<style scoped>
.pencil-stroke {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}

.is-drawn .pencil-stroke {
  stroke-dashoffset: 0;
  transition: stroke-dashoffset 550ms cubic-bezier(0.23, 1, 0.32, 1)
    var(--pencil-delay);
}

.is-drawn .pencil-stroke-second {
  transition-delay: calc(var(--pencil-delay) + 180ms);
}

@media (prefers-reduced-motion: reduce) {
  .pencil-stroke,
  .is-drawn .pencil-stroke {
    stroke-dashoffset: 0;
    transition: none;
  }
}
</style>
