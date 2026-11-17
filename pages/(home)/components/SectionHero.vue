<template>
  <section id="top" ref="sectionEl" data-part="hero" class="relative scroll-mt-16 overflow-hidden">
    <HeroGrid />

    <div data-part="hero-inner" class="relative mx-auto max-w-7xl px-5 sm:px-6">
      <HomeThemeSlot name="hero-start" />

      <div
        data-part="hero-layout"
        class="grid items-center gap-[72px] pt-11 pb-9 sm:pt-[88px] sm:pb-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16"
      >
        <div data-grid-hole data-part="hero-text" class="max-w-[44rem]">
          <!-- Phones: the photo sits next to the name instead of in its own column -->
          <div data-part="hero-id" class="mt-1 mb-6 flex items-center gap-3.5 sm:hidden">
            <HeroPhotoFlip v-model:revealed="photoRevealed" variant="avatar" />
            <div>
              <p data-part="hero-id-name" class="text-lg font-semibold">Dimar Hanung</p>
              <p data-part="hero-id-role" class="text-sm">{{ t.hero.role }}</p>
            </div>
          </div>

          <p data-part="hero-intro" class="hidden text-[1.0625rem] font-medium sm:block">
            {{ t.hero.intro }}
          </p>
          <h1
            data-part="hero-title"
            class="mt-3 max-w-[700px] text-[2.375rem] leading-[1.03] font-bold tracking-[-0.035em] sm:text-[2.875rem] lg:text-6xl"
          >
            {{ t.hero.titleStart }}
            <span data-part="hero-title-accent">{{ t.hero.titleAccent }}</span>
          </h1>
          <p
            data-part="hero-lead"
            class="mt-5 max-w-[590px] text-[1.0625rem] leading-relaxed sm:text-[1.1875rem]"
          >
            {{ t.hero.lead }}
          </p>

          <div data-part="hero-actions" class="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <a
              data-part="hero-cta-primary"
              href="#contact"
              class="btn-primary inline-flex h-[52px] flex-auto items-center justify-center gap-2 px-6 font-semibold whitespace-nowrap sm:flex-none"
              @click="onGo($event, 'contact')"
            >
              {{ t.hero.discuss }}
              <Icon name="mdi:arrow-right" class="text-lg" aria-hidden="true" />
            </a>
            <a
              data-part="hero-cta-secondary"
              href="#work"
              class="btn-ghost inline-flex h-[52px] flex-auto items-center justify-center gap-2 px-6 font-semibold whitespace-nowrap sm:flex-none"
              @click="onGo($event, 'work')"
            >
              {{ t.hero.seeWork }}
              <Icon name="mdi:arrow-down" class="text-lg" aria-hidden="true" />
            </a>
            <a
              data-part="hero-cta-cv"
              :href="CV_PATH"
              download
              class="text-link inline-flex w-full items-center justify-center gap-1.5 font-medium sm:w-auto"
            >
              <Icon name="mdi:tray-arrow-down" class="text-lg" aria-hidden="true" />
              {{ t.hero.downloadCv }}
            </a>
          </div>

          <ul data-part="hero-meta" class="mt-7 flex flex-wrap gap-x-6 gap-y-2.5 text-sm">
            <li data-part="hero-meta-item" class="inline-flex items-center gap-1.5">
              <Icon name="mdi:map-marker-outline" class="text-base" aria-hidden="true" />
              {{ t.hero.location }}
            </li>
            <li data-part="hero-meta-item" class="inline-flex items-center gap-1.5">
              <Icon name="mdi:earth" class="text-base" aria-hidden="true" />
              {{ t.hero.remote }}
            </li>
          </ul>
        </div>

        <figure
          data-grid-hole
          data-part="hero-figure"
          class="hidden w-full max-w-[360px] justify-self-start sm:block lg:max-w-[420px] lg:justify-self-end"
        >
          <HeroPhotoFlip v-model:revealed="photoRevealed" variant="portrait" />
          <figcaption data-part="hero-caption" class="relative mt-3.5 text-sm leading-normal">
            <span data-part="hero-caption-name" class="block text-base font-semibold">Dimar Hanung</span>
            {{ t.hero.caption }}
          </figcaption>
        </figure>
      </div>

      <!-- Proof strip -->
      <dl data-grid-hole data-part="proof" class="grid grid-cols-2 md:grid-cols-4">
        <div
          v-for="(item, index) in t.hero.proof"
          :key="index"
          data-part="proof-item"
          :class="['flex flex-col-reverse px-4 pt-5 pb-[22px] sm:px-7 sm:pt-7 sm:pb-8', proofCellClass(index)]"
        >
          <dt data-part="proof-label" class="text-sm">{{ item.label }}</dt>
          <dd data-part="proof-value" class="text-[1.75rem] font-bold tracking-tight sm:text-4xl">{{ item.value }}</dd>
        </div>
      </dl>

      <HomeThemeSlot name="hero-end" />
    </div>
  </section>
</template>

<script setup lang="ts">
import HeroGrid from "./HeroGrid.vue";
import HeroPhotoFlip from "./HeroPhotoFlip.vue";
import HomeThemeSlot from "./HomeThemeSlot.vue";

// The PM adds this PDF to public/cv/.
const CV_PATH = "/cv/dimar-hanung-cv.pdf";

const emit = defineEmits<{ go: [id: string] }>();

const { locale, t } = useHomeI18n();
const { themeId } = useHomeTheme();

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

// The text block is a grid hole; after a language or theme switch its size
// changes, so ask HeroGrid to recut the hole.
const sectionEl = ref<HTMLElement | null>(null);
watch([locale, themeId], async () => {
  await nextTick();
  sectionEl.value?.dispatchEvent(new Event("hero-grid-wake", { bubbles: true }));
});
</script>
