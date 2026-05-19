<template>
  <div class="min-h-screen bg-muted-50 dark:bg-muted-950">
    <!-- Header -->
    <div class="border-b border-muted-200 dark:border-muted-800 bg-white dark:bg-muted-900">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/"
            class="shrink-0 w-12 h-12 rounded-2xl bg-primary-500/10 dark:bg-primary-400/10 flex items-center justify-center hover:bg-primary-500/20 dark:hover:bg-primary-400/20 transition-colors"
          >
            <Icon name="mdi:arrow-left" class="text-2xl text-primary-500" />
          </NuxtLink>
          <div>
            <h1 class="text-2xl sm:text-3xl font-bold text-muted-900 dark:text-muted-50 tracking-tight">
              Tools
            </h1>
            <p class="text-sm text-muted-500 dark:text-muted-400 mt-0.5">
              Collection of handy utilities for developers and everyday tasks
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <!-- Search -->
      <div class="mb-8">
        <div class="relative max-w-md">
          <Icon
            name="mdi:magnify"
            class="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-muted-400"
          />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search tools..."
            class="w-full pl-11 pr-4 py-3 bg-white dark:bg-muted-900 border border-muted-200 dark:border-muted-800 rounded-xl text-sm text-muted-700 dark:text-muted-200 placeholder:text-muted-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all"
          />
        </div>
      </div>

      <!-- Tools List by Category -->
      <div class="space-y-10">
        <div
          v-for="category in filteredCategories"
          :key="category.name"
          class="space-y-4"
        >
          <!-- Category Header -->
          <div class="flex items-center gap-2 pb-2 border-b border-muted-200 dark:border-muted-800">
            <Icon :name="category.icon" class="text-lg text-primary-500" />
            <h2 class="text-sm font-semibold text-muted-700 dark:text-muted-300 uppercase tracking-wider">
              {{ category.name }}
            </h2>
            <span class="text-xs text-muted-400 ml-2">
              {{ category.tools.length }} tool{{ category.tools.length !== 1 ? 's' : '' }}
            </span>
          </div>

          <!-- Tools List -->
          <div class="divide-y divide-muted-100 dark:divide-muted-800 border border-muted-200 dark:border-muted-800 rounded-xl overflow-hidden bg-white dark:bg-muted-900">
            <NuxtLink
              v-for="tool in category.tools"
              :key="tool.path"
              :to="tool.path"
              class="group flex items-center gap-4 p-4 hover:bg-muted-50 dark:hover:bg-muted-800/50 transition-colors"
            >
              <!-- Tool Icon -->
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                :class="tool.iconBg || 'bg-primary-500/10 dark:bg-primary-400/10'"
              >
                <Icon :name="tool.icon" class="text-xl" :class="tool.iconColor || 'text-primary-500'" />
              </div>

              <!-- Tool Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <h3 class="font-medium text-muted-900 dark:text-muted-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {{ tool.name }}
                  </h3>
                  <Icon
                    name="mdi:arrow-top-right"
                    class="text-sm text-muted-300 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <p class="text-sm text-muted-500 dark:text-muted-400 truncate">
                  {{ tool.description }}
                </p>
              </div>

              <!-- Tags -->
              <div v-if="tool.tags?.length" class="hidden sm:flex items-center gap-1.5 shrink-0">
                <span
                  v-for="tag in tool.tags.slice(0, 2)"
                  :key="tag"
                  class="text-[10px] px-2 py-0.5 rounded-full bg-muted-100 dark:bg-muted-800 text-muted-500 dark:text-muted-400"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- Arrow -->
              <Icon
                name="mdi:chevron-right"
                class="text-lg text-muted-300 shrink-0"
              />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredCategories.length === 0"
        class="text-center py-16"
      >
        <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted-100 dark:bg-muted-800 flex items-center justify-center">
          <Icon name="mdi:magnify-close" class="text-2xl text-muted-400" />
        </div>
        <p class="text-muted-500 dark:text-muted-400">
          No tools found matching "{{ searchQuery }}"
        </p>
        <button
          @click="searchQuery = ''"
          class="mt-3 text-sm text-primary-600 dark:text-primary-400 hover:underline"
        >
          Clear search
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('');
const { categories } = useToolsRegistry();

const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) {
    return categories.filter(c => c.tools.length > 0);
  }

  const query = searchQuery.value.toLowerCase();
  return categories
    .map(category => ({
      ...category,
      tools: category.tools.filter(
        tool =>
          tool.name.toLowerCase().includes(query) ||
          tool.description.toLowerCase().includes(query) ||
          tool.tags?.some(tag => tag.toLowerCase().includes(query))
      ),
    }))
    .filter(category => category.tools.length > 0);
});

useHead({
  title: 'Tools | Dimar Hanung',
});
</script>
