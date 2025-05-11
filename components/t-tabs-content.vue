<script setup lang="ts">
import { inject, computed } from "vue";

interface Props {
  value: string;
}

const props = defineProps<Props>();
const activeTab = inject("activeTab", ref(""));

const isActive = computed(() => activeTab.value === props.value);
</script>

<template>
  <div v-if="isActive" class="py-4">
    <slot></slot>
  </div>
</template>
