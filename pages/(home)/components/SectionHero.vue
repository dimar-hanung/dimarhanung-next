<template>
  <section
    id="top"
    ref="sectionEl"
    class="relative scroll-mt-16 overflow-hidden border-b border-muted-200 dark:border-muted-700"
  >
    <HeroGrid />

    <div class="relative mx-auto max-w-7xl px-5 sm:px-6">
      <div
        class="grid items-center gap-[72px] pt-11 pb-9 sm:pt-[88px] sm:pb-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16"
      >
        <div data-grid-hole class="max-w-[44rem]">
          <!-- Phones: the photo sits next to the name instead of in its own column -->
          <div class="mt-1 mb-6 flex items-center gap-3.5 sm:hidden">
            <HeroPhotoFlip v-model:revealed="photoRevealed" variant="avatar" />
            <div>
              <p class="text-lg font-semibold">Dimar Hanung</p>
              <p class="text-sm text-muted-500 dark:text-muted-400">{{ t.hero.role }}</p>
            </div>
          </div>

          <p class="hidden text-[1.0625rem] font-medium text-muted-600 dark:text-muted-300 sm:block">
            {{ t.hero.intro }}
          </p>
          <h1
            class="mt-3 max-w-[700px] text-[2.375rem] leading-[1.03] font-bold tracking-[-0.035em] sm:text-[2.875rem] lg:text-6xl"
          >
            {{ t.hero.titleStart }}
            <span class="text-primary-600 dark:text-primary-400">{{ t.hero.titleAccent }}</span>
          </h1>
          <p
            class="mt-5 max-w-[590px] text-[1.0625rem] leading-relaxed text-muted-600 dark:text-muted-300 sm:text-[1.1875rem]"
          >
            {{ t.hero.lead }}
          </p>

          <div class="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              href="#contact"
              class="btn-primary inline-flex h-[52px] flex-auto items-center justify-center gap-2 rounded-[10px] px-6 font-semibold whitespace-nowrap sm:flex-none"
              @click="onGo($event, 'contact')"
            >
              {{ t.hero.discuss }}
              <Icon name="mdi:arrow-right" class="text-lg" aria-hidden="true" />
            </a>
            <a
              href="#work"
              class="btn-ghost inline-flex h-[52px] flex-auto items-center justify-center gap-2 rounded-[10px] px-6 font-semibold whitespace-nowrap sm:flex-none"
              @click="onGo($event, 'work')"
            >
              {{ t.hero.seeWork }}
              <Icon name="mdi:arrow-down" class="text-lg" aria-hidden="true" />
            </a>
            <a
              :href="CV_PATH"
              download
              class="text-link inline-flex w-full items-center justify-center gap-1.5 font-medium sm:w-auto"
            >
              <Icon name="mdi:tray-arrow-down" class="text-lg" aria-hidden="true" />
              {{ t.hero.downloadCv }}
            </a>
          </div>

          <ul
            class="mt-7 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-muted-500 dark:text-muted-400"
          >
            <li class="inline-flex items-center gap-1.5">
              <Icon name="mdi:map-marker-outline" class="text-base" aria-hidden="true" />
              {{ t.hero.location }}
            </li>
            <li class="inline-flex items-center gap-1.5">
              <Icon name="mdi:earth" class="text-base" aria-hidden="true" />
              {{ t.hero.remote }}
            </li>
          </ul>
        </div>

        <figure data-grid-hole class="hidden w-full max-w-[360px] justify-self-start sm:block lg:max-w-[420px] lg:justify-self-end">
          <HeroPhotoFlip v-model:revealed="photoRevealed" variant="portrait" />
          <figcaption class="relative mt-3.5 text-sm leading-normal text-muted-500 dark:text-muted-400">
            <span class="block text-base font-semibold text-muted-900 dark:text-white">Dimar Hanung</span>
            {{ t.hero.caption }}
          </figcaption>
        </figure>
      </div>

      <!-- Proof strip -->
      <dl
        data-grid-hole
        class="grid grid-cols-2 border-t border-muted-200 dark:border-muted-700 md:grid-cols-4"
      >
        <div
          v-for="(item, index) in t.hero.proof"
          :key="index"
          :class="[
            'flex flex-col-reverse border-muted-200 px-4 pt-5 pb-[22px] dark:border-muted-700 sm:px-7 sm:pt-7 sm:pb-8',
            proofCellClass(index),
          ]"
        >
          <dt class="text-sm text-muted-500 dark:text-muted-400">{{ item.label }}</dt>
          <dd class="text-[1.75rem] font-bold tracking-tight sm:text-4xl">{{ item.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup lang="ts">
import HeroGrid from "./HeroGrid.vue";
import HeroPhotoFlip from "./HeroPhotoFlip.vue";

// The PM adds this PDF to public/cv/.
const CV_PATH = "/cv/dimar-hanung-cv.pdf";

const emit = defineEmits<{ go: [id: string] }>();

const { locale, t } = useHomeI18n();

// Shared by the phone avatar and the desktop portrait: both start as
// Hououin Kyouma and flip to the real photo on click.
const photoRevealed = ref(false);

function onGo(event: MouseEvent, id: string) {
  event.preventDefault();
  emit("go", id);
}

// 2 columns on phones, 4 from md: dividers sit between cells, never on the
// left edge.
function proofCellClass(index: number) {
  if (index === 0) return "pl-0 sm:pl-0";
  if (index === 1) return "border-l";
  if (index === 2) return "border-t pl-0 sm:pl-0 md:border-t-0 md:border-l md:pl-7";
  return "border-t border-l md:border-t-0";
}

// The text block is a grid hole; after a language switch its size changes, so
// ask HeroGrid to recut the hole.
const sectionEl = ref<HTMLElement | null>(null);
watch(locale, async () => {
  await nextTick();
  sectionEl.value?.dispatchEvent(new Event("hero-grid-wake", { bubbles: true }));
});
</script>
