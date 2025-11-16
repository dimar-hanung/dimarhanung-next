<template>
  <component
    :is="asTag"
    class="relative overflow-hidden"
    @mousedown="handlePointerDown"
    @mouseup="handlePointerUp"
    @mouseleave="handlePointerUp"
    @touchstart.passive="handleTouchStart"
    @touchend="handlePointerUp"
    @touchcancel="handlePointerUp"
  >
    <slot />
    <span
      v-for="ripple in ripples"
      :key="ripple.id"
      class="pointer-events-none absolute"
      :style="ripple.style"
    />
  </component>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  type CSSProperties,
  type Component,
} from "vue";

interface RippleStyle extends CSSProperties {
  top: string;
  left: string;
  width: string;
  height: string;
  transform: string;
}

interface Ripple {
  id: number;
  style: RippleStyle;
  releaseTimer: number | null;
}

interface RippleOptions {
  color?: string;
  initialOpacity?: number;
  finalOpacity?: number;
  duration?: number;
  easing?: string;
  disabled?: boolean;
}

interface Props {
  as?: string | Component;
  rippleOptions?: RippleOptions;
}

const props = withDefaults(defineProps<Props>(), {
  as: "div",
  rippleOptions: () => ({}),
});

const ripples = ref<Ripple[]>([]);
const isClient = ref(false);

const asTag = computed(() => props.as ?? "div");

const mergedOptions = computed(() => ({
  color: "currentColor",
  initialOpacity: 0.2,
  finalOpacity: 0.1,
  duration: 600,
  easing: "ease-out",
  disabled: false,
  ...props.rippleOptions,
}));

onMounted(() => {
  isClient.value = true;
});

onBeforeUnmount(() => {
  if (typeof window === "undefined") {
    return;
  }
  ripples.value.forEach((ripple) => {
    if (ripple.releaseTimer !== null) {
      window.clearTimeout(ripple.releaseTimer);
    }
  });
});

const isTouchEvent = (event: MouseEvent | TouchEvent): event is TouchEvent => {
  return "touches" in event;
};

const addRipple = (event: MouseEvent | TouchEvent) => {
  const options = mergedOptions.value;
  if (options.disabled || !isClient.value) {
    return null;
  }

  const target = event.currentTarget as HTMLElement | null;
  if (!target) {
    return null;
  }

  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;

  let x = 0;
  let y = 0;

  if (isTouchEvent(event)) {
    const touch = event.touches[0];
    if (!touch) {
      return null;
    }
    x = touch.clientX - rect.left;
    y = touch.clientY - rect.top;
  } else {
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
  }

  const newRipple: Ripple = {
    id: Date.now(),
    releaseTimer: null,
    style: {
      position: "absolute",
      top: `${y - size / 2}px`,
      left: `${x - size / 2}px`,
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: "50%",
      backgroundColor: options.color,
      opacity: options.initialOpacity,
      transform: "scale(0)",
      transition: `transform ${options.duration}ms ${options.easing}, opacity ${options.duration}ms ${options.easing}`,
    },
  };

  ripples.value = [...ripples.value, newRipple];

  if (typeof window !== "undefined") {
    window.requestAnimationFrame(() => {
      ripples.value = ripples.value.map((ripple) =>
        ripple.id === newRipple.id
          ? {
              ...ripple,
              style: {
                ...ripple.style,
                opacity: options.finalOpacity,
                transform: "scale(1)",
              },
            }
          : ripple
      );
    });
  }

  return newRipple.id;
};

const releaseRipple = (id: number) => {
  const ripple = ripples.value.find((r) => r.id === id);
  if (!ripple || ripple.releaseTimer !== null) {
    return;
  }

  ripples.value = ripples.value.map((item) =>
    item.id === id
      ? {
          ...item,
          style: {
            ...item.style,
            opacity: 0,
          },
        }
      : item
  );

  if (typeof window === "undefined") {
    ripples.value = ripples.value.filter((item) => item.id !== id);
    return;
  }

  const timer = window.setTimeout(() => {
    ripples.value = ripples.value.filter((item) => item.id !== id);
  }, mergedOptions.value.duration);

  ripples.value = ripples.value.map((item) =>
    item.id === id
      ? {
          ...item,
          releaseTimer: timer,
        }
      : item
  );
};

const releaseAllRipples = () => {
  ripples.value.forEach((ripple) => {
    if (ripple.releaseTimer === null) {
      releaseRipple(ripple.id);
    }
  });
};

const handlePointerDown = (event: MouseEvent) => {
  addRipple(event);
};

const handlePointerUp = () => {
  releaseAllRipples();
};

const handleTouchStart = (event: TouchEvent) => {
  addRipple(event);
};
</script>
