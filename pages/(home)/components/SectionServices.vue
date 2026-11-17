<template>
  <section
    id="services"
    data-part="services"
    aria-labelledby="services-heading"
    class="scroll-mt-16 py-(--section-y)"
  >
    <div class="mx-auto max-w-7xl px-5 sm:px-6">
      <div data-part="services-head" class="mb-[26px] sm:mb-10">
        <h2 id="services-heading" data-part="section-title" class="section-title">{{ t.services.title }}</h2>
        <p data-part="section-sub" class="section-sub">{{ t.services.sub }}</p>
      </div>

      <ul data-part="service-list" class="grid grid-cols-1 gap-(--gap) lg:grid-cols-3">
        <li
          v-for="(service, index) in t.services.items"
          :key="service.need"
          data-part="service-card"
          :data-featured="index === FEATURED || undefined"
          class="flex flex-col gap-3.5 p-[30px]"
        >
          <span data-part="service-icon" class="grid h-[50px] w-[50px] place-items-center">
            <Icon :name="ICONS[service.need]" class="text-2xl" aria-hidden="true" />
          </span>
          <h3 data-part="service-title" class="text-[1.375rem] font-bold tracking-tight">{{ service.title }}</h3>
          <p data-part="service-body" class="leading-normal">{{ service.body }}</p>
          <ul data-part="service-points" class="flex flex-col gap-[9px] text-[0.9375rem]">
            <li v-for="point in service.points" :key="point" data-part="service-point" class="flex items-start gap-2">
              <Icon name="mdi:check" data-part="service-check" class="mt-0.5 shrink-0 text-lg" aria-hidden="true" />
              {{ point }}
            </li>
          </ul>

          <div data-part="service-footer" class="mt-auto flex items-center justify-between gap-3 pt-[18px]">
            <p data-part="service-timeline" class="text-[0.8125rem]">
              {{ t.services.timelineLabel }}
              <span data-part="service-timeline-value" class="block text-[0.9375rem]">{{ service.timeline }}</span>
            </p>
            <button
              type="button"
              data-part="service-cta"
              :class="[
                'inline-flex h-[38px] items-center gap-2 px-3.5 text-sm font-semibold whitespace-nowrap',
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

      <p data-part="services-price" class="mt-8 text-[1.0625rem] font-medium">{{ t.services.startingPrice }}</p>
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
