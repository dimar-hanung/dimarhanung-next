<script setup lang="ts">
import { provide, ref, watch } from "vue";

interface Props {
  defaultValue: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  class: "",
});

const activeTab = ref(props.defaultValue);

provide("activeTab", activeTab);

watch(
  () => props.defaultValue,
  (newValue) => {
    activeTab.value = newValue;
  }
);
</script>

<template>
  <div :class="class">
    <slot></slot>
  </div>
</template>
