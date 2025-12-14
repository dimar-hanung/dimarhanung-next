// components/UAccordionTrigger.vue
<template>
  <button
    type="button"
    :aria-expanded="isExpanded"
    :disabled="disabled"
    class="flex w-full items-center justify-between p-4 text-left text-sm font-medium transition-all hover:underline focus:outline-hidden focus:bg-primary-50 disabled:opacity-50"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <slot></slot>
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="[
        'transform transition-transform duration-200',
        isExpanded ? 'rotate-180' : '',
      ]"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { inject } from "vue";
import type { AccordionContext, AccordionItemContext } from "~/types/accordion";

const accordion = inject<AccordionContext>("accordion");
const accordionItem = inject<AccordionItemContext>("accordion-item");

if (!accordion || !accordionItem) {
  throw new Error("UAccordionTrigger must be used within UAccordionItem");
}

const { isExpanded, value, disabled } = accordionItem;

const handleClick = (): void => {
  if (!disabled) {
    accordion.toggleItem(value);
  }
};

const handleKeyDown = (event: KeyboardEvent): void => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    handleClick();
  }
};
</script>
