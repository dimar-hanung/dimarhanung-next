<template>
  <button
    :aria-label="ariaLabel"
    :type="type"
    :disabled="disabled"
    class="px-6 py-2 text-sm text-indigo-500 dark:text-slate-50 transition-colors duration-300 border-2 border-indigo-400 rounded-full shadow-xl shadow-indigo-300/30 hover:bg-indigo-500 hover:text-indigo-100"
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
