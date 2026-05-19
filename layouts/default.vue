<template>
  <div>
    <!-- Tools sub-pages get a sidebar layout for easy navigation between tools -->
    <template v-if="isToolsSubPage">
      <div class="min-h-screen bg-muted-50 dark:bg-muted-950 flex">
        <!-- Desktop Sidebar -->
        <aside
          class="hidden md:flex w-64 shrink-0 flex-col bg-white dark:bg-muted-900 border-r border-muted-200 dark:border-muted-800 sticky top-0 h-screen overflow-y-auto"
        >
          <!-- Back to Tools -->
          <div class="p-4 border-b border-muted-200 dark:border-muted-800">
            <NuxtLink
              to="/tools"
              class="flex items-center gap-2 text-sm font-medium text-muted-600 dark:text-muted-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Icon name="mdi:arrow-left" />
              Back to Tools
            </NuxtLink>
          </div>

          <!-- Tool Navigation -->
          <nav class="flex-1 p-3 space-y-6">
            <div v-for="category in categories" :key="category.name">
              <template v-if="category.tools.length > 0">
              <!-- Category Header -->
              <div
                class="px-3 mb-2 flex items-center gap-2 text-xs font-semibold text-muted-500 dark:text-muted-400 uppercase tracking-wider"
              >
                <Icon :name="category.icon" class="text-sm" />
                {{ category.name }}
              </div>

              <!-- Tool Links -->
              <div class="space-y-0.5">
                <NuxtLink
                  v-for="tool in category.tools"
                  :key="tool.path"
                  :to="tool.path"
                  :class="[
                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                    isActive(tool.path)
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium'
                      : 'text-muted-600 dark:text-muted-400 hover:bg-muted-100 dark:hover:bg-muted-800 hover:text-muted-900 dark:hover:text-muted-200',
                  ]"
                >
                  <Icon
                    :name="tool.icon"
                    :class="['text-base', tool.iconColor || 'text-muted-400 dark:text-muted-500']"
                  />
                  {{ tool.name }}
                </NuxtLink>
              </div>
              </template>
            </div>
          </nav>
        </aside>

        <!-- Main Column (desktop + mobile) -->
        <div class="flex-1 min-w-0 flex flex-col">
          <!-- Mobile Sticky Header -->
          <div
            class="md:hidden sticky top-0 z-40 bg-white/95 dark:bg-muted-900/95 backdrop-blur-sm border-b border-muted-200 dark:border-muted-800"
          >
            <div class="flex items-center justify-between px-4 py-3">
              <NuxtLink
                to="/tools"
                class="flex items-center gap-2 text-sm font-medium text-muted-600 dark:text-muted-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Icon name="mdi:arrow-left" />
                Tools
              </NuxtLink>
              <button
                @click="mobileMenuOpen = !mobileMenuOpen"
                class="p-2 rounded-lg hover:bg-muted-100 dark:hover:bg-muted-800 transition-colors"
              >
                <Icon
                  :name="mobileMenuOpen ? 'mdi:close' : 'mdi:menu'"
                  class="text-lg text-muted-600 dark:text-muted-400"
                />
              </button>
            </div>

            <!-- Mobile Dropdown Menu -->
            <div
              v-if="mobileMenuOpen"
              class="border-t border-muted-200 dark:border-muted-800 max-h-[60vh] overflow-y-auto p-3 space-y-4"
            >
              <div v-for="category in categories" :key="category.name">
              <template v-if="category.tools.length > 0">
                <div
                  class="px-3 mb-1 flex items-center gap-2 text-xs font-semibold text-muted-500 dark:text-muted-400 uppercase tracking-wider"
                >
                  <Icon :name="category.icon" class="text-sm" />
                  {{ category.name }}
                </div>
                <div class="space-y-0.5">
                  <NuxtLink
                    v-for="tool in category.tools"
                    :key="tool.path"
                    :to="tool.path"
                    @click="mobileMenuOpen = false"
                    :class="[
                      'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                      isActive(tool.path)
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 font-medium'
                        : 'text-muted-600 dark:text-muted-400 hover:bg-muted-100 dark:hover:bg-muted-800',
                    ]"
                  >
                    <Icon
                      :name="tool.icon"
                      :class="['text-base', tool.iconColor || 'text-muted-400 dark:text-muted-500']"
                    />
                    {{ tool.name }}
                  </NuxtLink>
                </div>
              </template>
              </div>
            </div>
          </div>

          <!-- Page Content -->
          <main class="flex-1 min-w-0">
            <slot />
          </main>
        </div>
      </div>
    </template>

    <!-- All other pages render normally without any layout changes -->
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

// Only apply the tools sidebar layout to individual tool pages, not the /tools listing page
const isToolsSubPage = computed(
  () => route.path.startsWith('/tools/') && route.path !== '/tools'
);

const mobileMenuOpen = ref(false);
const { categories } = useToolsRegistry();

function isActive(path: string) {
  return route.path === path;
}
</script>
