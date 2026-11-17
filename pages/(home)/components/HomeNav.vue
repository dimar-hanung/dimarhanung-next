<template>
  <header data-part="nav" :data-scrolled="isScrolled || undefined" class="sticky top-0 z-40">
    <div data-part="nav-inner" class="mx-auto flex h-16 max-w-7xl items-center gap-3 px-5 sm:gap-10 sm:px-6">
      <a
        data-part="nav-brand"
        :href="HOME_PATHS[locale]"
        class="flex shrink-0 items-center gap-2.5 rounded-lg"
        :aria-label="t.nav.home"
        @click="onSectionLink($event, 'top')"
      >
        <span data-part="nav-logo" class="grid h-8 w-8 place-items-center font-bold tracking-tight">DH</span>
        <span data-part="nav-name" class="hidden text-lg font-semibold tracking-tight sm:inline">Dimar Hanung</span>
      </a>

      <nav data-part="nav-links" class="hidden gap-7 text-[0.9375rem] md:flex">
        <a data-part="nav-link" href="#work" @click="onSectionLink($event, 'work')">{{ t.nav.work }}</a>
        <a data-part="nav-link" href="#services" @click="onSectionLink($event, 'services')">{{
          t.nav.services
        }}</a>
        <a data-part="nav-link" href="#process" @click="onSectionLink($event, 'process')">{{
          t.nav.process
        }}</a>
        <NuxtLink data-part="nav-link" to="/blog">{{ t.nav.blog }}</NuxtLink>
      </nav>

      <div data-part="nav-actions" class="ml-auto flex items-center gap-2 sm:gap-3">
        <div
          data-part="nav-lang"
          role="group"
          :aria-label="t.nav.language"
          class="inline-flex h-10 gap-0.5 p-[3px]"
        >
          <NuxtLink
            v-for="option in languages"
            :key="option.code"
            data-part="nav-lang-option"
            :to="HOME_PATHS[option.code]"
            :hreflang="option.code"
            :lang="option.code"
            :aria-label="option.label"
            :aria-current="locale === option.code ? 'page' : undefined"
            class="grid w-[30px] place-items-center text-[0.8125rem] font-semibold sm:w-[34px]"
            @click="rememberLanguage(option.code)"
          >
            {{ option.short }}
          </NuxtLink>
        </div>

        <!-- Themes with a fixed light or dark look hide the dark mode toggle. -->
        <t-switch-dark-mode
          v-if="theme.scheme === 'auto'"
          data-part="nav-dark-toggle"
          class="!h-10 !w-10 !rounded-(--radius-control)"
        />

        <a
          data-part="nav-cta"
          href="#contact"
          class="inline-flex h-[38px] items-center px-3.5 text-sm font-semibold"
          @click="onSectionLink($event, 'contact')"
          >{{ t.nav.contact }}</a
        >
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {
  HOME_LANG_COOKIE,
  HOME_LANG_COOKIE_MAX_AGE,
  HOME_PATHS,
  type HomeLocale,
} from "~/composables/useHomeI18n";

const emit = defineEmits<{ go: [id: string] }>();

const { locale, t } = useHomeI18n();
const { theme } = useHomeTheme();

const languages: { code: HomeLocale; short: string; label: string }[] = [
  { code: "en", short: "EN", label: "English" },
  { code: "id", short: "ID", label: "Bahasa Indonesia" },
];

const { y } = useWindowScroll();
const isScrolled = computed(() => y.value > 8);

// Written straight to document.cookie so it is set before the router runs the
// home-language middleware for the next page.
function rememberLanguage(code: HomeLocale) {
  document.cookie = `${HOME_LANG_COOKIE}=${code}; path=/; max-age=${HOME_LANG_COOKIE_MAX_AGE}; samesite=lax`;
}

function onSectionLink(event: MouseEvent, id: string) {
  event.preventDefault();
  emit("go", id);
}
</script>
