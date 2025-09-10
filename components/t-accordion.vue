// components/UAccordion.vue
<template>
  <div class="w-full">
    <div
      ref="accordion"
      :data-type="type"
      :data-collapsible="collapsible"
      class="space-y-2"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import type { AccordionType, AccordionContext } from "~/types/accordion";

interface Props {
  type?: AccordionType;
  collapsible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "single",
  collapsible: true,
});

const activeItems = ref<Set<string>>(new Set());

const toggleItem = (itemValue: string): void => {
  if (props.type === "single") {
    if (activeItems.value.has(itemValue)) {
      if (props.collapsible) {
        activeItems.value.delete(itemValue);
      }
    } else {
      activeItems.value.clear();
      activeItems.value.add(itemValue);
    }
  } else {
    if (activeItems.value.has(itemValue)) {
      activeItems.value.delete(itemValue);
    } else {
      activeItems.value.add(itemValue);
    }
  }
};

const accordionContext: AccordionContext = {
  activeItems,
  toggleItem,
  type: props.type,
  collapsible: props.collapsible,
};

provide("accordion", accordionContext);
</script>
