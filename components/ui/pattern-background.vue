<template>
  <div
    :class="
      cn(
        `h-[36rem] w-full  relative flex items-center justify-center overflow-clip`,
        ` ${animate ? 'move-' + direction : ''} `,
        $props.class
      )
    "
  >
    <!-- <div
      class="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-muted-900 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]"
    ></div> -->

    <div class="absolute pointer-events-none inset-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
        <!-- Definitions for gradients and masks -->
        <defs>
          <!-- Radial gradient for feathering effect -->
          <radialGradient id="featherGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="white" stop-opacity="1" />
            <stop offset="100%" stop-color="white" stop-opacity="0" />
          </radialGradient>

          <!-- Mask for feathered oval -->
          <mask id="featherMask">
            <ellipse
              cx="200"
              cy="110"
              rx="150"
              ry="180"
              fill="url(#featherGradient)"
            />
          </mask>
        </defs>

        <!-- Grid pattern with mask applied -->
        <g mask="url(#featherMask)">
          <!-- Vertical lines -->
          <g stroke="#e9ecef" stroke-width="0.1">
            <path d="M 20 0 V 300" />
            <path d="M 40 0 V 300" />
            <path d="M 60 0 V 300" />
            <path d="M 80 0 V 300" />
            <path d="M 100 0 V 300" />
            <path d="M 120 0 V 300" />
            <path d="M 140 0 V 300" />
            <path d="M 160 0 V 300" />
            <path d="M 180 0 V 300" />
            <path d="M 200 0 V 300" />
            <path d="M 220 0 V 300" />
            <path d="M 240 0 V 300" />
            <path d="M 260 0 V 300" />
            <path d="M 280 0 V 300" />
            <path d="M 300 0 V 300" />
            <path d="M 320 0 V 300" />
            <path d="M 340 0 V 300" />
            <path d="M 360 0 V 300" />
            <path d="M 380 0 V 300" />
          </g>

          <!-- Horizontal lines -->
          <g stroke="#e9ecef" stroke-width="0.1">
            <path d="M 0 20 H 400" />
            <path d="M 0 40 H 400" />
            <path d="M 0 60 H 400" />
            <path d="M 0 80 H 400" />
            <path d="M 0 100 H 400" />
            <path d="M 0 120 H 400" />
            <path d="M 0 140 H 400" />
            <path d="M 0 160 H 400" />
            <path d="M 0 180 H 400" />
            <path d="M 0 200 H 400" />
            <path d="M 0 220 H 400" />
            <path d="M 0 240 H 400" />
            <path d="M 0 260 H 400" />
            <path d="M 0 280 H 400" />
          </g>
        </g>
      </svg>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

type Direction =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

defineProps({
  class: String,
  animate: {
    type: Boolean,
    default: () => false,
  },
  direction: {
    type: String as PropType<Direction>,
    default: () => "top",
  },
});
</script>

<style scoped>
@keyframes to-top {
  0% {
    background-position: 0 100%;
  }
  100% {
    background-position: 0 0;
  }
}
@keyframes to-bottom {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 0 100%;
  }
}
@keyframes to-right {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 0;
  }
}
@keyframes to-left {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}
@keyframes to-top-right {
  0% {
    background-position: 0 100%;
  }
  100% {
    background-position: 100% 0;
  }
}
@keyframes to-top-left {
  0% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0 0;
  }
}
@keyframes to-bottom-right {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
}
@keyframes to-bottom-left {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 100%;
  }
}

.move-top {
  animation: to-top 10s linear infinite;
}
.move-bottom {
  animation: to-bottom 10s linear infinite;
}
.move-right {
  animation: to-right 10s linear infinite;
}
.move-left {
  animation: to-left 10s linear infinite;
}
.move-top-right {
  animation: to-top-right 10s linear infinite;
}
.move-top-left {
  animation: to-top-left 10s linear infinite;
}
.move-bottom-right {
  animation: to-bottom-right 10s linear infinite;
}
.move-bottom-left {
  animation: to-bottom-left 10s linear infinite;
}
</style>
