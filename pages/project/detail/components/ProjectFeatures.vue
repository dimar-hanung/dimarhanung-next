<template>
  <div class="mb-12">
    <!-- Title slot with default fallback -->
    <div class="flex items-center gap-3 mb-6">
      <h2 class="text-2xl font-semibold dark:text-white">
        <slot name="title">Key Features</slot>
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- If features prop is provided, render from data -->
      <template v-if="features && features.length > 0">
        <div
          v-for="(feature, index) in features"
          :key="index"
          :class="[
            'group p-6 rounded-xl border hover:shadow-lg transition-all duration-300 hover:-translate-y-1',
            feature.colSpan === 2 ? 'md:col-span-2' : '',
            feature.bgGradient ||
              'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
            feature.borderColor || 'border-blue-200 dark:border-blue-800/50',
          ]"
        >
          <div class="flex items-start gap-4">
            <div
              :class="[
                'w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300',
                feature.iconBg || 'bg-gradient-to-br from-blue-500 to-blue-600',
              ]"
            >
              <Icon :name="feature.icon" class="text-white text-xl" />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
                {{ feature.title }}
              </h3>
              <p class="text-gray-600 dark:text-gray-300 text-sm">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </template>

      <!-- If no features prop, use slots for custom content -->
      <template v-else>
        <slot></slot>
      </template>
    </div>

    <!-- Optional description slot -->
    <div v-if="$slots.description" class="mt-6">
      <slot name="description"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type KeyFeature } from "./types/ItemKeyFeature";

interface Props {
  features?: KeyFeature[];
}

const props = withDefaults(defineProps<Props>(), {
  features: () => [],
});
</script>
