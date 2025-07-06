// components/UAccordionContent.vue
<template>
  <transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="max-h-0 opacity-0"
    enter-to-class="max-h-96 opacity-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="max-h-96 opacity-100"
    leave-to-class="max-h-0 opacity-0"
  >
    <div
      v-show="isExpanded"
      class="overflow-hidden p-4 text-sm text-gray-600 dark:text-gray-300"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { inject } from "vue";
import type { AccordionItemContext } from "~/types/accordion";

const accordionItem = inject<AccordionItemContext>("accordion-item");

if (!accordionItem) {
  throw new Error("UAccordionContent must be used within UAccordionItem");
}

const { isExpanded } = accordionItem;
</script>
