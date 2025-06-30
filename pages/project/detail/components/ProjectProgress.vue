<template>
  <div class="mb-8">
    <h2 class="text-2xl font-semibold mb-4 dark:text-white">
      Project Progress
    </h2>
    <div class="flex items-center justify-between mb-3">
      <span class="text-sm font-medium text-gray-600 dark:text-gray-400">
        Progress
      </span>
      <span class="text-sm font-semibold text-gray-900 dark:text-white">
        {{ progress }}%
      </span>
    </div>

    <!-- Progress bar with gradient -->
    <div
      class="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
    >
      <div
        class="h-full rounded-full transition-all duration-500 ease-out relative overflow-hidden"
        :style="{
          width: `${progress}%`,
          background: `linear-gradient(90deg, ${getProgressColor(
            progress
          )}, ${getProgressColorEnd(progress)})`,
        }"
      >
        <!-- Shimmer effect -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer"
        ></div>
      </div>
    </div>

    <!-- Progress milestones -->
    <div
      class="flex justify-between mt-3 text-xs text-gray-500 dark:text-gray-400"
    >
      <span>Start</span>
      <span class="text-center">{{
        progress < 50
          ? "In Progress"
          : progress < 100
          ? "Nearly Done"
          : "Complete"
      }}</span>
      <span>Complete</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  progress: number;
}

defineProps<Props>();

const getProgressColor = (value: number) => {
  if (value < 25) return "#ef4444"; // red
  if (value < 50) return "#f97316"; // orange
  if (value < 75) return "#eab308"; // yellow
  return "#22c55e"; // green
};

const getProgressColorEnd = (value: number) => {
  if (value < 25) return "#dc2626"; // darker red
  if (value < 50) return "#ea580c"; // darker orange
  if (value < 75) return "#ca8a04"; // darker yellow
  return "#16a34a"; // darker green
};
</script>

<style scoped>
/* Shimmer animation */
@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-12deg);
  }
  100% {
    transform: translateX(200%) skewX(-12deg);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style>
