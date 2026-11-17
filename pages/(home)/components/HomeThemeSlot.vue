<template>
  <component :is="slotComponent" v-if="slotComponent" />
</template>

<script setup lang="ts">
import type { Component } from "vue";
import { themeSlotLoader, type HomeThemeSlot } from "./themes/slots";

// Renders the active theme's component for this slot, if it has one.
// See themes/slots.ts.
const props = defineProps<{ name: HomeThemeSlot }>();

const { themeId } = useHomeTheme();

const slotComponent = computed(() => {
  const key = `${themeId.value}/${props.name}`;
  const cached = asyncComponents.get(key);
  if (cached) return cached;
  const loader = themeSlotLoader(themeId.value, props.name);
  if (!loader) return null;
  const component = defineAsyncComponent(loader);
  asyncComponents.set(key, component);
  return component;
});
</script>

<script lang="ts">
// One async wrapper per theme and slot, shared by every render.
const asyncComponents = new Map<string, Component>();
</script>
