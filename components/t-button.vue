<template>
  <button
    :aria-label="ariaLabel"
    :type="type"
    :disabled="disabled"
    class="px-6 py-2 text-sm text-primary-500 dark:text-slate-50 transition-colors duration-300 border-2 border-primary-400 rounded-full shadow-xl shadow-primary-300/30 hover:bg-primary-500 hover:text-primary-100"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
export interface Props {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "button",
  disabled: false,
  ariaLabel: "Button",
});
</script>
