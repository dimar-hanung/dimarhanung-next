<template>
  <section
    id="themes"
    data-part="themes"
    aria-labelledby="themes-heading"
    class="scroll-mt-16 pt-(--section-y)"
  >
    <div class="mx-auto max-w-7xl px-5 sm:px-6">
      <div data-part="themes-head" class="mb-[26px] sm:mb-8">
        <h2 id="themes-heading" data-part="section-title" class="section-title">{{ t.themes.title }}</h2>
        <p data-part="section-sub" class="section-sub">{{ t.themes.sub }}</p>
      </div>

      <!-- Phones: one row that scrolls sideways. From sm: a grid. -->
      <ul
        data-part="themes-list"
        role="list"
        :aria-label="t.themes.listLabel"
        class="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pt-1 pb-3 sm:mx-0 sm:scroll-px-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-1 md:grid-cols-4 lg:grid-cols-5"
      >
        <li v-for="id in HOME_THEME_IDS" :key="id" class="w-[44%] shrink-0 snap-start sm:w-auto">
          <button
            type="button"
            data-part="theme-option"
            :data-theme-option="id"
            :aria-pressed="themeId === id"
            :aria-describedby="`theme-desc-${id}`"
            class="relative flex h-full w-full flex-col gap-2 p-1.5 pb-2.5 text-left"
            @click="setTheme(id, $event.currentTarget as HTMLElement)"
          >
            <span data-part="theme-thumb" class="relative block aspect-[16/10] w-full overflow-hidden">
              <img
                :src="HOME_THEMES[id].thumbnail"
                alt=""
                width="480"
                height="300"
                loading="lazy"
                decoding="async"
                class="block h-full w-full object-cover object-top"
              />
              <span
                v-if="themeId === id"
                data-part="theme-check"
                class="absolute top-1.5 right-1.5 grid h-6 w-6 place-items-center rounded-full"
                aria-hidden="true"
              >
                <Icon name="mdi:check" class="text-base" />
              </span>
            </span>
            <span data-part="theme-name" class="px-1 text-[0.9375rem] font-semibold">{{ t.themes.items[id].name }}</span>
            <span :id="`theme-desc-${id}`" class="sr-only">{{ t.themes.items[id].description }}</span>
          </button>
        </li>
      </ul>

      <p data-part="themes-current" class="mt-4 text-[0.9375rem]" aria-live="polite">
        {{ t.themes.current(t.themes.items[themeId].name, t.themes.items[themeId].description) }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { HOME_THEME_IDS, HOME_THEMES } from "~/data/home-themes";

const { t } = useHomeI18n();
// setTheme keeps the clicked button at the same spot on screen while the
// page above it changes.
const { themeId, setTheme } = useHomeTheme();
</script>
