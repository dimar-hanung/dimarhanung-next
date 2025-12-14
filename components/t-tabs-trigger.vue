<script setup lang="ts">
import { inject, computed } from "vue";

interface Props {
  value: string;
}

const props = defineProps<Props>();
const activeTab = inject("activeTab", ref(""));

const isActive = computed(() => activeTab.value === props.value);

const handleClick = () => {
  activeTab.value = props.value;
};
</script>

<template>
  <button
    @click="handleClick"
    :class="[
      'px-4 py-2 font-medium text-sm transition-colors duration-200',
      'hover:text-primary-600 focus:outline-hidden',
      isActive
        ? 'text-primary-600 border-b-2 border-primary-600'
        : 'text-gray-600',
    ]"
  >
    <slot></slot>
  </button>
</template>
