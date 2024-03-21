<template>
  <button
    v-wave
    :aria-label="ariaLabel"
    :type="type"
    :disabled="disabled"
    class="text-sm text-primary-500 dark:text-slate-50 transition-colors duration-300 border-2 border-primary-600 rounded-lg shadow-xl hover:bg-muted-100 hover:dark:bg-muted-800 hover:bg-opacity-60"
    :class="[ui.padding]"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface UI {
  padding: string;
}

export interface Props {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
  ui: UI;
}

const props = withDefaults(defineProps<Props>(), {
  type: "button",
  disabled: false,
  ariaLabel: "Button",
  ui: () => ({
    padding: "px-4 py-2",
  }),
});
</script>
