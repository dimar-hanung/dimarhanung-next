<template>
  <section
    id="services"
    aria-labelledby="services-heading"
    class="scroll-mt-16 border-y border-muted-200 bg-white py-[72px] dark:border-muted-700 dark:bg-muted-800 md:py-[100px]"
  >
    <div class="mx-auto max-w-7xl px-5 sm:px-6">
      <div class="mb-[26px] sm:mb-10">
        <h2 id="services-heading" class="section-title">{{ t.services.title }}</h2>
        <p class="section-sub">{{ t.services.sub }}</p>
      </div>

      <ul class="grid grid-cols-1 gap-[22px] lg:grid-cols-3">
        <li
          v-for="(service, index) in t.services.items"
          :key="service.need"
          :class="[
            'service-card flex flex-col gap-3.5 rounded-[20px] border bg-muted-100 p-[30px] dark:bg-muted-900',
            index === FEATURED
              ? 'border-primary-400 ring-4 ring-primary-50 dark:ring-primary-900/35'
              : 'border-muted-200 dark:border-muted-700',
          ]"
        >
          <span
            class="grid h-[50px] w-[50px] place-items-center rounded-[14px] bg-primary-50 text-primary-600 dark:bg-primary-900/35 dark:text-primary-400"
          >
            <Icon :name="ICONS[service.need]" class="text-2xl" aria-hidden="true" />
          </span>
          <h3 class="text-[1.375rem] font-bold tracking-tight">{{ service.title }}</h3>
          <p class="leading-normal text-muted-600 dark:text-muted-300">{{ service.body }}</p>
          <ul class="flex flex-col gap-[9px] text-[0.9375rem]">
            <li v-for="point in service.points" :key="point" class="flex items-start gap-2">
              <Icon name="mdi:check" class="mt-0.5 shrink-0 text-lg text-green-600" aria-hidden="true" />
              {{ point }}
            </li>
          </ul>

          <div
            class="mt-auto flex items-center justify-between gap-3 border-t border-muted-200 pt-[18px] dark:border-muted-700"
          >
            <p class="text-[0.8125rem] text-muted-500 dark:text-muted-400">
              {{ t.services.timelineLabel }}
              <span class="block text-[0.9375rem] text-muted-900 dark:text-white">{{
                service.timeline
              }}</span>
            </p>
            <button
              type="button"
              :class="[
                'inline-flex h-[38px] items-center gap-2 rounded-[10px] px-3.5 text-sm font-semibold whitespace-nowrap',
                index === FEATURED ? 'btn-primary' : 'btn-ghost',
              ]"
              @click="emit('ask', service.need)"
            >
              {{ t.services.ask }}
              <span class="sr-only">: {{ service.title }}</span>
              <Icon name="mdi:arrow-right" class="text-base" aria-hidden="true" />
            </button>
          </div>
        </li>
      </ul>

      <p class="mt-8 text-[1.0625rem] font-medium">{{ t.services.startingPrice }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { NeedKey } from "~/locales/home/en";

const emit = defineEmits<{ ask: [need: NeedKey] }>();

const { t } = useHomeI18n();

// The middle service ("AI prototype → real product") gets the accent border.
const FEATURED = 1;

const ICONS: Record<NeedKey, string> = {
  web: "mdi:application-brackets-outline",
  ai: "mdi:creation-outline",
  frontend: "mdi:palette-outline",
  other: "mdi:dots-horizontal",
};
</script>

<style scoped>
.service-card {
  transition: border-color 200ms ease-out;
}

.service-card:hover {
  border-color: var(--app-primary-300);
}
</style>
