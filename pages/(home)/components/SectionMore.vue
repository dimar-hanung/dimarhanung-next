<template>
  <section aria-labelledby="more-heading" class="pb-20">
    <div class="mx-auto max-w-7xl px-5 sm:px-6">
      <h2 id="more-heading" class="mb-4 text-[1.375rem] font-bold">{{ t.more.title }}</h2>

      <ul class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="item in t.more.items" :key="item.title">
          <component
            :is="item.to ? NuxtLink : 'div'"
            :to="item.to || undefined"
            :class="[
              'flex h-full items-center justify-between gap-2.5 rounded-[14px] border border-muted-200 bg-white px-5 py-[18px] dark:border-muted-700 dark:bg-muted-800',
              item.to ? 'more-link' : '',
            ]"
          >
            <span>
              <span class="block text-[0.8125rem] text-muted-500 dark:text-muted-400">{{ item.source }}</span>
              <span class="text-[1.0625rem] font-bold">{{ item.title }}</span>
            </span>
            <span class="flex items-center gap-1.5 text-[1.375rem] font-bold">
              {{ item.count }}
              <Icon
                v-if="item.to"
                name="mdi:arrow-right"
                class="more-arrow text-lg text-muted-500 dark:text-muted-400"
                aria-hidden="true"
              />
            </span>
          </component>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { NuxtLink } from "#components";

const { t } = useHomeI18n();
</script>

<style scoped>
.more-link {
  transition: border-color 150ms ease-out;
}

.more-link:hover {
  border-color: var(--app-primary-300);
}

.more-arrow {
  transition:
    transform 150ms ease-out,
    color 150ms ease-out;
}

.more-link:hover .more-arrow {
  transform: translateX(3px);
  color: var(--app-primary-600);
}

.dark .more-link:hover .more-arrow {
  color: var(--app-primary-400);
}

@media (prefers-reduced-motion: reduce) {
  .more-link:hover .more-arrow {
    transform: none;
  }
}
</style>
