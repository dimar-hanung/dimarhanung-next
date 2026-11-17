<template>
  <footer data-part="footer" class="pt-7 pb-24 text-sm sm:pb-7">
    <div class="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:px-6">
      <div class="flex flex-wrap justify-between gap-x-12 gap-y-5">
        <nav data-part="footer-links" :aria-label="t.footer.siteLabel">
          <ul class="flex flex-wrap gap-x-5 gap-y-2">
            <li v-for="link in siteLinks" :key="link.to">
              <NuxtLink :to="link.to" data-part="footer-link">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <nav data-part="footer-links" :aria-label="t.footer.socialLabel">
          <ul class="flex flex-wrap gap-x-5 gap-y-2">
            <li v-for="link in socialLinks" :key="link.href">
              <a :href="link.href" target="_blank" rel="noopener noreferrer" data-part="footer-link">{{ link.label }}</a>
            </li>
          </ul>
        </nav>
      </div>

      <div data-part="footer-meta" class="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p>© {{ year }} Dimar Hanung</p>
        <p>
          {{ t.footer.builtWith }}
          <a
            href="https://github.com/dimar-hanung/dimarhanung-next"
            target="_blank"
            rel="noopener noreferrer"
            data-part="footer-link"
            data-footer-source
            class="underline underline-offset-4"
            >{{ t.footer.source }}</a
          >
        </p>
        <button type="button" data-part="footer-link" class="inline-flex items-center gap-1" @click="scrollToTop">
          {{ t.footer.backToTop }}
          <Icon name="mdi:arrow-up" aria-hidden="true" />
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { t } = useHomeI18n();

const year = new Date().getFullYear();

const siteLinks = computed(() => [
  { label: t.value.footer.site.projects, to: "/project" },
  { label: t.value.footer.site.blog, to: "/blog" },
  { label: t.value.footer.site.tools, to: "/tools" },
  { label: t.value.footer.site.certificates, to: "/certificates/gallery" },
  { label: t.value.footer.site.challenges, to: "/challenges" },
]);

const socialLinks = [
  { label: "GitHub", href: "https://github.com/dimar-hanung" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dimar-hanung/" },
  { label: "Instagram", href: "https://www.instagram.com/dmr_hanung/" },
  { label: "X / Twitter", href: "https://twitter.com/dimarhanung" },
  { label: "Codewars", href: "https://www.codewars.com/users/dimar-hanung" },
  { label: "SoloLearn", href: "https://www.sololearn.com/profile/12709774" },
];

const reducedMotion = usePreferredReducedMotion();

function scrollToTop() {
  const behavior = reducedMotion.value === "reduce" ? "auto" : "smooth";
  window.scrollTo({ top: 0, behavior });
}
</script>
