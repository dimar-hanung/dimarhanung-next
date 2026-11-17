<template>
  <div
    data-part="page"
    :data-theme="themeId"
    :data-scheme="theme.scheme"
    class="home-page min-h-screen antialiased"
  >
    <HomeThemeSlot name="page-start" />
    <HomeNav @go="go" />

    <main>
      <SectionHero ref="heroSection" @go="go" />
      <SectionThemes />
      <SectionWork />
      <SectionServices @ask="askAbout" />
      <SectionProcess />
      <SectionContact ref="contactSection" />
      <SectionMore />
    </main>

    <SectionFooter />
    <HomeThemeSlot name="page-end" />

    <!-- Phones: shows once the hero is out of view, hides over the contact block -->
    <div
      data-part="phone-bar"
      :inert="!showMobileBar"
      :class="[
        'fixed inset-x-3 bottom-3 z-50 flex items-center justify-between gap-2.5 py-2.5 pr-2.5 pl-4 transition-transform duration-300 ease-out motion-reduce:transition-none sm:hidden',
        showMobileBar ? 'translate-y-0' : 'translate-y-[150%]',
      ]"
    >
      <span data-part="phone-bar-note" class="text-sm">{{ t.mobileBar.note }}</span>
      <a
        data-part="phone-bar-cta"
        href="#contact"
        class="btn-primary inline-flex h-[38px] items-center px-3.5 text-sm font-semibold whitespace-nowrap"
        @click.prevent="go('contact')"
        >{{ t.mobileBar.cta }}</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { HOME_PATHS } from "~/composables/useHomeI18n";
import type { NeedKey } from "~/locales/home/en";
import HomeNav from "./components/HomeNav.vue";
import SectionHero from "./components/SectionHero.vue";
import SectionThemes from "./components/SectionThemes.vue";
import HomeThemeSlot from "./components/HomeThemeSlot.vue";
import "./home-theme.css";
import SectionWork from "./components/SectionWork.vue";
import SectionServices from "./components/SectionServices.vue";
import SectionProcess from "./components/SectionProcess.vue";
import SectionContact from "./components/SectionContact.vue";
import SectionMore from "./components/SectionMore.vue";
import SectionFooter from "./components/SectionFooter.vue";

// English lives at /, Indonesian at /id. /id is its own route record pointing at
// this same file (added in nuxt.config.ts `pages:extend`), not an alias: Vue
// Router treats an alias as the same location, so the EN/ID switch would be
// dropped as a redundant navigation.
definePageMeta({
  middleware: ["home-language"],
  // Switching EN <-> ID keeps the scroll position; arriving from another page
  // still starts at the top.
  scrollToTop: (to, from) =>
    !(["/", "/id"].includes(to.path) && ["/", "/id"].includes(from.path)),
});

const SITE_URL = "https://dimarhanung.dev";
const OG_IMAGE = "https://i.ibb.co/SfVpQCz/IMG20211117182339.jpg";

const { locale, t } = useHomeI18n();
const { themeId, theme, stylesheetsOf } = useHomeTheme();

const heroSection = ref<InstanceType<typeof SectionHero> | null>(null);
const contactSection = ref<InstanceType<typeof SectionContact> | null>(null);

// Scrolling between sections
const reducedMotion = usePreferredReducedMotion();

function go(id: string) {
  const behavior = reducedMotion.value === "reduce" ? "auto" : "smooth";
  if (id === "top") {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior, block: "start" });
  if (id === "contact") {
    // Wait for the smooth scroll to land before moving focus to the form.
    setTimeout(() => contactSection.value?.focusName(), 650);
  }
}

function askAbout(need: NeedKey) {
  contactSection.value?.selectNeed(need);
  go("contact");
}

// Phone contact bar
const heroInView = ref(true);
const contactInView = ref(false);
useIntersectionObserver(heroSection, ([entry]) => {
  heroInView.value = entry?.isIntersecting ?? true;
});
useIntersectionObserver(contactSection, ([entry]) => {
  contactInView.value = entry?.isIntersecting ?? false;
});
const showMobileBar = computed(() => !heroInView.value && !contactInView.value);

// SEO: per-language meta, canonical and hreflang alternates
useHead(() => ({
  htmlAttrs: { lang: locale.value },
  link: [
    // Only the active theme's fonts and CSS (see data/home-themes.ts).
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ...stylesheetsOf(theme.value).map((href) => ({ rel: "stylesheet", href })),
    { rel: "canonical", href: SITE_URL + HOME_PATHS[locale.value] },
    { rel: "alternate", hreflang: "en", href: SITE_URL + HOME_PATHS.en },
    { rel: "alternate", hreflang: "id", href: SITE_URL + HOME_PATHS.id },
    { rel: "alternate", hreflang: "x-default", href: SITE_URL + HOME_PATHS.en },
  ],
}));

useSeoMeta({
  title: () => t.value.seo.title,
  description: () => t.value.seo.description,
  ogTitle: () => t.value.seo.title,
  ogDescription: () => t.value.seo.description,
  ogUrl: () => SITE_URL + HOME_PATHS[locale.value],
  ogLocale: () => t.value.seo.ogLocale,
  ogLocaleAlternate: () => (locale.value === "id" ? "en_US" : "id_ID"),
  author: "Dimar Hanung",
  ogImage: OG_IMAGE,
  ogImageAlt: "Dimar Hanung",
  twitterImage: OG_IMAGE,
  twitterImageAlt: "Dimar Hanung",
});
</script>
