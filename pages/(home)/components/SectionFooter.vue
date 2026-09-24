<template>
  <footer
    aria-labelledby="footer-heading"
    class="border-t border-primary-500/25 text-muted-900 dark:text-muted-100"
  >
    <div class="container mx-auto px-4 pt-20 pb-10">
      <div class="grid grid-cols-1 gap-16 lg:grid-cols-12">
        <!-- Contact: the one thing this footer should get people to do -->
        <div class="lg:col-span-7">
          <h2
            id="footer-heading"
            class="text-xl text-muted-600 dark:text-muted-400 max-w-md"
          >
            Building something where the interface has to feel right? Write to
            me.
          </h2>

          <a
            :href="`mailto:${email}`"
            class="footer-email group mt-6 inline-flex items-center gap-3 text-[1.375rem] sm:text-4xl lg:text-5xl font-bold tracking-tight [overflow-wrap:anywhere] underline decoration-primary-500 decoration-2 underline-offset-[0.2em] hover:text-primary-600 dark:hover:text-primary-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 rounded-sm"
          >
            {{ email }}
            <Icon
              name="mdi:arrow-top-right"
              class="footer-email-icon shrink-0"
            />
          </a>

          <div
            class="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-base text-muted-600 dark:text-muted-400"
          >
            <button
              type="button"
              class="footer-button inline-flex items-center gap-2 rounded-lg border border-muted-400/60 dark:border-muted-700 px-3 py-1.5 text-muted-900 dark:text-muted-100 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
              @click="copyEmail"
            >
              <Icon :name="copied ? 'mdi:check' : 'mdi:content-copy'" />
              <span aria-live="polite">{{
                copied ? "Copied" : "Copy email"
              }}</span>
            </button>

            <span class="inline-flex items-center gap-2">
              <Icon name="uil:map-marker" class="text-lg" />
              <ClientOnly fallback="Tangerang Selatan, Indonesia (WIB)">
                {{ localTime }} in Tangerang Selatan (WIB)
              </ClientOnly>
            </span>
          </div>
        </div>

        <!-- Links -->
        <nav
          aria-label="Footer"
          class="grid w-fit grid-cols-2 gap-x-16 lg:col-span-5 lg:justify-self-end"
        >
          <div>
            <h3 class="text-base text-muted-500">On this site</h3>
            <ul class="mt-4 space-y-3">
              <li v-for="link in siteLinks" :key="link.to">
                <NuxtLink :to="link.to" class="footer-link">
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-base text-muted-500">Elsewhere</h3>
            <ul class="mt-4 space-y-3">
              <li v-for="link in externalLinks" :key="link.href">
                <a
                  :href="link.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="footer-link group inline-flex items-center gap-1"
                >
                  {{ link.label }}
                  <Icon
                    name="mdi:arrow-top-right"
                    class="footer-link-icon text-muted-400 group-hover:text-current"
                  />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <!-- Bottom bar -->
      <div
        class="mt-20 flex flex-col gap-4 border-t border-muted-300 dark:border-muted-800 pt-6 text-base text-muted-600 dark:text-muted-400 sm:flex-row sm:items-center sm:justify-between"
      >
        <p>© {{ year }} Dimar Hanung</p>

        <p>
          Built with Nuxt and Tailwind CSS.
          <a
            href="https://github.com/dimar-hanung/dimarhanung-next"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link underline decoration-muted-400 underline-offset-4 hover:decoration-current"
            >Source on GitHub</a
          >
        </p>

        <button
          type="button"
          class="footer-link inline-flex items-center gap-1 self-start sm:self-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 rounded-sm"
          @click="scrollToTop"
        >
          Back to top
          <Icon name="mdi:arrow-up" />
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const email = "dimarhanung@gmail.com";
const year = new Date().getFullYear();

const siteLinks = [
  { label: "Projects", to: "/project" },
  { label: "Certificates", to: "/certificates/gallery" },
  { label: "Challenges", to: "/challenges" },
  { label: "Blog", to: "/blog" },
  { label: "Tools", to: "/tools" },
];

const externalLinks = [
  { label: "GitHub", href: "https://github.com/dimar-hanung" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dimar-hanung/" },
  { label: "Codewars", href: "https://www.codewars.com/users/dimar-hanung" },
  { label: "Instagram", href: "https://www.instagram.com/dmr_hanung/" },
  { label: "X / Twitter", href: "https://twitter.com/dimarhanung" },
];

const { copy, copied, isSupported } = useClipboard({ copiedDuring: 2000 });

function copyEmail() {
  if (!isSupported.value) {
    window.location.href = `mailto:${email}`;
    return;
  }
  copy(email);
}

// Local time in Tangerang Selatan, rendered on the client only (server clock would mismatch).
const now = useNow({ interval: 30_000 });
const timeFormat = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Asia/Jakarta",
});
const localTime = computed(() => timeFormat.format(now.value));

const reducedMotion = usePreferredReducedMotion();

function scrollToTop() {
  const behavior = reducedMotion.value === "reduce" ? "auto" : "smooth";
  window.scrollTo({ top: 0, behavior });
}
</script>

<style scoped>
.footer-link {
  color: var(--app-muted-900);
  transition: color 150ms ease-out, text-decoration-color 150ms ease-out;
}

.dark .footer-link {
  color: var(--app-muted-100);
}

.footer-link:hover {
  color: var(--app-primary-600);
}

.dark .footer-link:hover {
  color: var(--app-primary-400);
}

.footer-link:focus-visible {
  outline: 2px solid var(--app-primary-500);
  outline-offset: 2px;
  border-radius: 2px;
}

.footer-email,
.footer-button {
  transition: color 150ms ease-out, border-color 150ms ease-out;
}

.footer-email-icon,
.footer-link-icon {
  transition: transform 200ms cubic-bezier(0.23, 1, 0.32, 1);
}

.footer-email:hover .footer-email-icon {
  transform: translate(3px, -3px);
}

.footer-link:hover .footer-link-icon {
  transform: translate(2px, -2px);
}

@media (prefers-reduced-motion: reduce) {
  .footer-email:hover .footer-email-icon,
  .footer-link:hover .footer-link-icon {
    transform: none;
  }
}
</style>
