<template>
  <div class="mb-12">
    <!-- Header Section with slot for customization -->
    <div class="flex items-center gap-3 mb-6">
      <slot name="header">
        <h2 class="text-2xl font-semibold dark:text-white">
          {{ title }}
        </h2>
      </slot>
    </div>

    <!-- Technical highlights grid -->
    <div class="space-y-4">
      <div
        v-for="(highlight, index) in highlights"
        :key="index"
        :class="[
          'group p-6 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300',
          `hover:border-${highlight.color}-300 dark:hover:border-${highlight.color}-600`,
        ]"
      >
        <div class="flex items-center gap-4">
          <!-- Icon container -->
          <div
            :class="[
              'w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300',
              highlight.iconGradient,
            ]"
          >
            <Icon :name="highlight.icon" class="text-white text-2xl" />
          </div>

          <!-- Content -->
          <div class="flex-1">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {{ highlight.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              {{ highlight.description }}
            </p>
          </div>

          <!-- Badge -->
          <div class="text-right">
            <span
              :class="[
                'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                highlight.badgeStyle,
              ]"
            >
              {{ highlight.badge }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer slot for additional content -->
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
interface TechnicalHighlight {
  icon: string;
  title: string;
  description: string;
  badge: string;
  color: string;
  iconGradient: string;
  badgeStyle: string;
}

interface Props {
  title?: string;
  highlights: TechnicalHighlight[];
}

withDefaults(defineProps<Props>(), {
  title: "Technical Highlights",
});
</script>
