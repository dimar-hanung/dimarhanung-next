<template>
  <div class="home-page min-h-screen bg-muted-100 text-muted-900 antialiased dark:bg-muted-900 dark:text-white">
    <HomeNav @go="go" />

    <main>
      <SectionHero ref="heroSection" @go="go" />
      <SectionWork />
      <SectionServices @ask="askAbout" />
      <SectionProcess />
      <SectionContact ref="contactSection" />
      <SectionMore />
    </main>

    <SectionFooter />

    <!-- Phones: shows once the hero is out of view, hides over the contact block -->
    <div
      :inert="!showMobileBar"
      :class="[
        'fixed inset-x-3 bottom-3 z-50 flex items-center justify-between gap-2.5 rounded-2xl bg-muted-900 py-2.5 pr-2.5 pl-4 text-white shadow-[0_16px_40px_-12px_rgb(15_23_42/0.6)] transition-transform duration-300 ease-out motion-reduce:transition-none sm:hidden dark:border dark:border-muted-700 dark:bg-muted-800',
        showMobileBar ? 'translate-y-0' : 'translate-y-[150%]',
      ]"
    >
      <span class="text-sm">{{ t.mobileBar.note }}</span>
      <a
        href="#contact"
        class="btn-primary inline-flex h-[38px] items-center rounded-[10px] px-3.5 text-sm font-semibold whitespace-nowrap"
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

<style>
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap");

.home-page {
  font-family: "Outfit", sans-serif;
}

/* Shared by the home sections. */
.home-page .section-title {
  font-size: 2.125rem;
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.03em;
}

@media (min-width: 768px) {
  .home-page .section-title {
    font-size: 2.75rem;
  }
}

.home-page .section-sub {
  margin-top: 14px;
  max-width: 560px;
  font-size: 1.0625rem;
  line-height: 1.55;
  color: var(--app-muted-600);
}

.dark .home-page .section-sub {
  color: var(--app-muted-300);
}

.home-page .btn-primary {
  background: var(--app-primary-600);
  color: #fff;
  box-shadow: 0 8px 22px -8px rgb(225 29 72 / 0.6);
  transition:
    background-color 150ms ease-out,
    transform 150ms ease-out;
}

.home-page .btn-primary:hover {
  background: var(--app-primary-700);
  transform: translateY(-1px);
}

.home-page .btn-ghost {
  border: 1.5px solid var(--app-muted-300);
  transition:
    border-color 150ms ease-out,
    color 150ms ease-out;
}

.dark .home-page .btn-ghost {
  border-color: var(--app-muted-600);
}

.home-page .btn-ghost:hover {
  border-color: var(--app-primary-500);
  color: var(--app-primary-600);
}

.dark .home-page .btn-ghost:hover {
  color: var(--app-primary-400);
}

.home-page .text-link {
  color: var(--app-muted-600);
  transition: color 150ms ease-out;
}

.dark .home-page .text-link {
  color: var(--app-muted-300);
}

.home-page .text-link:hover {
  color: var(--app-primary-600);
}

.dark .home-page .text-link:hover {
  color: var(--app-primary-400);
}

@media (prefers-reduced-motion: reduce) {
  .home-page .btn-primary:hover {
    transform: none;
  }
}
</style>
