<template>
  <div class="mb-8 relative">
    <h2 class="text-2xl font-semibold mb-4 dark:text-white">
      Project Milestones
    </h2>

    <!-- Timeline line -->
    <div
      class="absolute left-4 top-6 bottom-0 w-px bg-gray-200 dark:bg-gray-700"
    ></div>

    <div
      v-for="(milestone, index) in milestones"
      :key="milestone.date"
      class="relative flex items-start mb-4 last:mb-0"
    >
      <!-- Timeline dot -->
      <div class="relative z-10 flex-shrink-0 mr-4">
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
          :class="
            index < 4
              ? 'bg-green-500 text-white'
              : index === 4
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
          "
        >
          <Icon
            :name="
              index < 4
                ? 'mdi:check'
                : index === 4
                ? 'mdi:play'
                : 'mdi:circle-outline'
            "
            class="w-4 h-4"
          />
        </div>
      </div>

      <!-- Milestone content -->
      <div class="flex-1 min-h-[2rem] pb-2">
        <div class="flex items-center justify-between mb-1">
          <h3 class="font-semibold text-sm dark:text-white">
            {{ milestone.title }}
          </h3>
          <span class="text-xs text-gray-500 dark:text-gray-400 ml-2">
            {{ milestone.date }}
          </span>
        </div>

        <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          {{ milestone.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Milestone {
  date: string;
  title: string;
  description: string;
}

interface Props {
  milestones: Milestone[];
}

defineProps<Props>();
</script>
