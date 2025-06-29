<template>
  <div class="border rounded-lg bg-white">
    <div
      :data-state="isExpanded ? 'open' : 'closed'"
      :data-disabled="disabled"
      class="accordion-item"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, provide, computed } from "vue";
import type { AccordionContext, AccordionItemContext } from "~/types/accordion";

interface Props {
  value: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const accordion = inject<AccordionContext>("accordion");

if (!accordion) {
  throw new Error("UAccordionItem must be used within UAccordion");
}

const isExpanded = computed(() => {
  return accordion.activeItems.value.has(props.value);
});

const accordionItemContext: AccordionItemContext = {
  isExpanded,
  value: props.value,
  disabled: props.disabled,
};

provide("accordion-item", accordionItemContext);
</script>
