<template>
  <header
    :class="[
      'sticky top-0 z-40 border-b border-muted-200 bg-white/85 backdrop-blur-md transition-shadow duration-200 dark:border-muted-700 dark:bg-muted-800/85',
      isScrolled ? 'shadow-[0_10px_30px_-20px_rgb(15_23_42/0.35)]' : '',
    ]"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center gap-3 px-5 sm:gap-10 sm:px-6">
      <a
        :href="HOME_PATHS[locale]"
        class="flex shrink-0 items-center gap-2.5 rounded-lg"
        :aria-label="t.nav.home"
        @click="onSectionLink($event, 'top')"
      >
        <span
          class="grid h-8 w-8 place-items-center rounded-lg bg-primary-600 font-bold tracking-tight text-white"
          >DH</span
        >
        <span class="hidden text-lg font-semibold tracking-tight sm:inline"
          >Dimar Hanung</span
        >
      </a>

      <nav class="hidden gap-7 text-[0.9375rem] text-muted-600 dark:text-muted-300 md:flex">
        <a href="#work" class="nav-link" @click="onSectionLink($event, 'work')">{{ t.nav.work }}</a>
        <a href="#services" class="nav-link" @click="onSectionLink($event, 'services')">{{
          t.nav.services
        }}</a>
        <a href="#process" class="nav-link" @click="onSectionLink($event, 'process')">{{
          t.nav.process
        }}</a>
        <NuxtLink to="/blog" class="nav-link">{{ t.nav.blog }}</NuxtLink>
      </nav>

      <div class="ml-auto flex items-center gap-2 sm:gap-3">
        <div
          role="group"
          :aria-label="t.nav.language"
          class="inline-flex h-10 gap-0.5 rounded-[10px] border border-muted-200 p-[3px] dark:border-muted-700"
        >
          <NuxtLink
            v-for="option in languages"
            :key="option.code"
            :to="HOME_PATHS[option.code]"
            :hreflang="option.code"
            :lang="option.code"
            :aria-label="option.label"
            :aria-current="locale === option.code ? 'page' : undefined"
            :class="[
              'grid w-[30px] place-items-center rounded-[7px] text-[0.8125rem] font-semibold transition-colors sm:w-[34px]',
              locale === option.code
                ? 'bg-muted-900 text-white dark:bg-white dark:text-muted-900'
                : 'text-muted-500 hover:text-primary-600 dark:text-muted-400 dark:hover:text-primary-400',
            ]"
            @click="rememberLanguage(option.code)"
          >
            {{ option.short }}
          </NuxtLink>
        </div>

        <t-switch-dark-mode class="border border-muted-200 !h-10 !w-10 !rounded-[10px] dark:border-muted-700" />

        <a
          href="#contact"
          class="inline-flex h-[38px] items-center rounded-[10px] bg-primary-600 px-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700"
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

<style scoped>
.nav-link {
  transition: color 150ms ease-out;
}

.nav-link:hover {
  color: var(--app-primary-600);
}

.dark .nav-link:hover {
  color: var(--app-primary-400);
}
</style>
