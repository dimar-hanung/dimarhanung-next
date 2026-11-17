<template>
  <section data-part="more" aria-labelledby="more-heading" class="pb-20">
    <div class="mx-auto max-w-7xl px-5 sm:px-6">
      <h2 id="more-heading" data-part="more-title" class="mb-4 text-[1.375rem] font-bold">{{ t.more.title }}</h2>

      <ul data-part="more-list" class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="item in t.more.items" :key="item.title">
          <component
            :is="item.to ? NuxtLink : 'div'"
            :to="item.to || undefined"
            data-part="more-item"
            class="flex h-full items-center justify-between gap-2.5 px-5 py-[18px]"
          >
            <span>
              <span data-part="more-source" class="block text-[0.8125rem]">{{ item.source }}</span>
              <span data-part="more-name" class="text-[1.0625rem] font-bold">{{ item.title }}</span>
            </span>
            <span data-part="more-count" class="flex items-center gap-1.5 text-[1.375rem] font-bold">
              {{ item.count }}
              <Icon v-if="item.to" name="mdi:arrow-right" data-part="more-arrow" class="text-lg" aria-hidden="true" />
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
