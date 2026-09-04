<template>
  <div class="srs-page">
    <t-nav class="relative z-20" />

    <main class="srs-main">
      <header class="srs-hero">
        <div class="srs-hero__copy">
          <p class="srs-hero__kicker">Case study · Open distance learning</p>
          <h1 class="srs-hero__title">
            Student Record System
            <span class="srs-hero__gen">Generation 5</span>
          </h1>
          <p class="srs-hero__lead">
            A full-stack web platform that helps university staff manage student
            academic records, from enrollment through graduation, across
            multiple study programs and operational domains.
          </p>
          <div class="srs-hero__actions">
            <a
              href="https://srs5g.ut.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              class="srs-cta srs-cta--primary"
            >
              Visit live platform
              <Icon name="mdi:open-in-new" class="srs-cta__icon" aria-hidden="true" />
            </a>
            <NuxtLink to="/project" class="srs-cta srs-cta--ghost">
              Back to projects
            </NuxtLink>
          </div>
        </div>

        <figure class="srs-banner">
          <img
            :src="srsIllustrations.banner.src"
            :alt="srsIllustrations.banner.alt"
            class="srs-banner__img"
            width="1440"
            height="900"
            fetchpriority="high"
            decoding="async"
          />
        </figure>

        <div class="srs-hero__metrics" aria-label="Project at a glance">
          <div
            v-for="metric in metrics"
            :key="metric.label"
            class="srs-metric"
          >
            <p class="srs-metric__value">{{ metric.value }}</p>
            <p class="srs-metric__label">{{ metric.label }}</p>
          </div>
        </div>
      </header>

      <section class="srs-overview" aria-labelledby="overview-heading">
        <h2 id="overview-heading" class="srs-section-title">
          What SRS does
        </h2>
        <div class="srs-overview__grid">
          <div class="srs-overview__copy">
            <p class="srs-body srs-overview__text">
              SRS5G is the operational backbone for student record management at
              Universitas Terbuka, Indonesia's open and distance learning
              university. Staff use it daily to keep academic data accurate,
              coordinate registrations, and support students across their entire
              study journey.
            </p>
            <ul class="srs-overview__points">
              <li
                v-for="point in overviewPoints"
                :key="point"
                class="srs-body"
              >
                {{ point }}
              </li>
            </ul>
          </div>
          <SrsIllustration
            class="srs-overview__art"
            :src="srsIllustrations.overview.src"
            :alt="srsIllustrations.overview.alt"
          />
        </div>
      </section>

      <LifecycleOrbit class="srs-block" />

      <ModuleConstellation class="srs-block" />

      <RecordSeal class="srs-block" />

      <section class="srs-stack" aria-labelledby="stack-heading">
        <div class="srs-stack__header">
          <div>
            <h2 id="stack-heading" class="srs-section-title">
              Technology stack
            </h2>
            <p class="srs-body srs-stack__intro">
              Built as a modern full-stack product with a Vue.js frontend and
              NestJS backend, designed for long-running enterprise use.
            </p>
          </div>
          <SrsIllustration
            class="srs-stack__art"
            variant="accent"
            :src="srsIllustrations.stack.src"
            :alt="srsIllustrations.stack.alt"
          />
        </div>
        <div class="srs-stack__grid">
          <div
            v-for="group in techStack"
            :key="group.title"
            class="srs-stack__group"
          >
            <h3 class="srs-stack__group-title">{{ group.title }}</h3>
            <ul class="srs-stack__list">
              <li
                v-for="item in group.items"
                :key="item"
                class="srs-body"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer class="srs-footer">
        <div class="srs-footer__inner">
          <div class="srs-footer__copy">
            <h2 class="srs-footer__title">See the live system</h2>
            <p class="srs-body srs-footer__lead">
              SRS5G is in daily use by university staff at Universitas Terbuka.
              This page stays high-level: no internal workflows or production
              data.
            </p>
            <div class="srs-footer__actions">
              <a
                href="https://srs5g.ut.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                class="srs-cta srs-cta--on-teal"
                aria-describedby="srs-live-hint"
              >
                Visit srs5g.ut.ac.id
                <Icon name="mdi:open-in-new" class="srs-cta__icon" aria-hidden="true" />
                <span class="srs-sr-only">(opens in a new tab)</span>
              </a>
              <NuxtLink to="/project" class="srs-cta srs-cta--ghost-on-teal">
                More projects
              </NuxtLink>
            </div>
            <p id="srs-live-hint" class="srs-footer__hint">
              Staff login required. Opens in a new tab.
            </p>
          </div>
          <SrsIllustration
            class="srs-footer__art"
            variant="flush"
            :src="srsIllustrations.graduation.src"
            :alt="srsIllustrations.graduation.alt"
          />
          <p class="srs-footer__credit">
            Illustrations from
            <a
              href="https://iconscout.com"
              target="_blank"
              rel="noopener noreferrer"
              class="srs-footer__credit-link"
            >IconScout<span class="srs-sr-only"> (opens in a new tab)</span></a>.
          </p>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import LifecycleOrbit from "./components/LifecycleOrbit.vue";
import ModuleConstellation from "./components/ModuleConstellation.vue";
import RecordSeal from "./components/RecordSeal.vue";
import SrsIllustration from "./components/SrsIllustration.vue";
import { srsIllustrations } from "./illustrations";

useHead({
  title: "SRS5G - Student Record System | Dimar Hanung",
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap",
    },
  ],
  meta: [
    {
      name: "description",
      content:
        "SRS5G is a full-stack student record management platform for open and distance learning. Explore the project overview and interactive demos.",
    },
  ],
});

const metrics = [
  { value: "Web", label: "Staff-facing platform" },
  { value: "Multi-track", label: "Program domains" },
  { value: "Full-stack", label: "Vue + NestJS" },
  { value: "Enterprise", label: "Long-term operations" },
];

const overviewPoints = [
  "Centralizes student academic data in one trusted system",
  "Supports undergraduate, graduate, and specialized programs",
  "Covers registration, course enrollment, reporting, and graduation prep",
  "Built for staff workflows at scale in a distance-learning context",
];

const techStack = [
  {
    title: "Frontend",
    items: ["Vue.js", "Vuex", "Tailwind CSS", "Progressive Web App"],
  },
  {
    title: "Backend",
    items: ["NestJS", "TypeORM", "PostgreSQL & MySQL", "Redis & message queues"],
  },
  {
    title: "Platform",
    items: ["Azure AD authentication", "Real-time updates", "Report generation", "Sentry monitoring"],
  },
];
</script>

<style scoped>
.srs-page {
  --srs-teal: #0d5c63;
  --srs-copper: #c47b3a;
  --srs-ink: #1a2b2e;
  --srs-muted: #5a6d71;
  --srs-page: #f4f0e8;
  --srs-panel: #fffcf7;
  --srs-font-display: "Fraunces", "Iowan Old Style", "Palatino Linotype", serif;
  --srs-font-body: "Source Serif 4", "Georgia", serif;

  min-height: 100vh;
  background:
    radial-gradient(
      ellipse 80% 50% at 10% -10%,
      color-mix(in srgb, var(--srs-copper) 14%, transparent),
      transparent 55%
    ),
    radial-gradient(
      ellipse 60% 40% at 100% 0%,
      color-mix(in srgb, var(--srs-teal) 10%, transparent),
      transparent 50%
    ),
    var(--srs-page);
  color: var(--srs-ink);
  overflow-x: clip;
}

.srs-main {
  max-width: 68rem;
  margin-inline: auto;
  padding: 2rem 1.25rem 0;
}

@media (min-width: 768px) {
  .srs-main {
    padding-inline: 2rem;
  }
}

.srs-hero {
  display: grid;
  gap: 1.75rem;
  padding-block: 2rem 3rem;
}

.srs-hero__copy {
  min-width: 0;
  max-width: 40rem;
}

.srs-banner {
  margin: 0;
  min-width: 0;
  border-radius: 1rem;
  border: 1px solid color-mix(in srgb, var(--srs-teal) 20%, transparent);
  background: #d7e8f4;
  overflow: hidden;
  box-shadow: 0 18px 40px color-mix(in srgb, var(--srs-ink) 12%, transparent);
}

.srs-banner__img {
  display: block;
  width: 100%;
  height: auto;
  max-height: min(26rem, 72vw);
  object-fit: cover;
  object-position: center 22%;
}

.srs-hero__metrics {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

@media (min-width: 900px) {
  .srs-hero__metrics {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .srs-banner__img {
    max-height: 28rem;
  }
}

.srs-hero__kicker {
  font-family: var(--srs-font-body);
  font-size: 1rem;
  color: var(--srs-copper);
  margin-bottom: 0.75rem;
}

.srs-hero__title {
  font-family: var(--srs-font-display);
  font-size: clamp(2.4rem, 5vw, 3.75rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--srs-ink);
}

.srs-hero__gen {
  display: block;
  color: var(--srs-teal);
  font-size: 0.72em;
  margin-top: 0.15em;
}

.srs-hero__lead {
  font-family: var(--srs-font-body);
  font-size: 1.125rem;
  line-height: 1.65;
  color: var(--srs-muted);
  margin-top: 1.25rem;
  max-width: 36rem;
}

.srs-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
}

.srs-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 2.75rem;
  padding: 0.75rem 1.15rem;
  border-radius: 0.65rem;
  font-family: var(--srs-font-body);
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 150ms ease-out,
    border-color 150ms ease-out,
    color 150ms ease-out,
    transform 120ms ease-out;
}

.srs-cta--primary {
  background: var(--srs-teal);
  color: #f8f6f1;
}

.srs-cta--primary:hover {
  background: color-mix(in srgb, var(--srs-teal) 88%, black);
}

.srs-cta--ghost {
  border: 1px solid color-mix(in srgb, var(--srs-teal) 30%, transparent);
  color: var(--srs-teal);
  background: transparent;
}

.srs-cta--ghost:hover {
  border-color: var(--srs-teal);
  background: color-mix(in srgb, var(--srs-teal) 8%, transparent);
}

.srs-cta:focus-visible {
  outline: 2px solid var(--srs-copper);
  outline-offset: 2px;
}

.srs-cta:active {
  transform: scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .srs-cta:active {
    transform: none;
  }
}

.srs-cta__icon {
  width: 1.1rem;
  height: 1.1rem;
}

.srs-metric {
  padding: 1rem;
  border-radius: 0.85rem;
  border: 1px solid color-mix(in srgb, var(--srs-teal) 20%, transparent);
  background: var(--srs-panel);
}

.srs-metric__value {
  font-family: var(--srs-font-display);
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--srs-teal);
}

.srs-metric__label {
  font-family: var(--srs-font-body);
  font-size: 1rem;
  color: var(--srs-muted);
  margin-top: 0.25rem;
}

.srs-overview {
  margin-bottom: 3rem;
}

.srs-section-title {
  font-family: var(--srs-font-display);
  font-size: 1.85rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--srs-ink);
  margin-bottom: 1.25rem;
}

.srs-overview__grid {
  display: grid;
  gap: 1.5rem;
  align-items: center;
}

.srs-overview__copy {
  display: grid;
  gap: 1.25rem;
  min-width: 0;
}

.srs-overview__art {
  width: min(100%, 22rem);
  justify-self: center;
}

@media (min-width: 768px) {
  .srs-overview__grid {
    grid-template-columns: minmax(0, 1.15fr) minmax(12rem, 0.85fr);
    gap: 2.5rem;
  }

  .srs-overview__art {
    width: 100%;
    justify-self: stretch;
  }
}

.srs-overview__text {
  color: var(--srs-muted);
}

.srs-overview__points {
  display: grid;
  gap: 0.65rem;
  padding-left: 1.1rem;
  border-left: 2px solid color-mix(in srgb, var(--srs-copper) 50%, transparent);
}

.srs-block {
  margin-bottom: 3rem;
}

.srs-stack {
  margin-bottom: 2rem;
}

.srs-stack__header {
  display: grid;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.srs-stack__intro {
  color: var(--srs-muted);
  max-width: 38rem;
}

.srs-stack__art {
  width: min(100%, 16rem);
  justify-self: center;
}

.srs-stack__grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 768px) {
  .srs-stack__header {
    grid-template-columns: minmax(0, 1fr) minmax(10rem, 16rem);
    gap: 2rem;
  }

  .srs-stack__art {
    width: 100%;
    justify-self: end;
  }

  .srs-stack__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.srs-stack__group {
  padding: 1.25rem;
  border-radius: 0.85rem;
  border: 1px solid color-mix(in srgb, var(--srs-teal) 18%, transparent);
  background: var(--srs-panel);
}

.srs-stack__group-title {
  font-family: var(--srs-font-display);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--srs-copper);
  margin-bottom: 0.75rem;
}

.srs-stack__list {
  display: grid;
  gap: 0.4rem;
  color: var(--srs-ink);
}

.srs-footer {
  width: 100vw;
  margin-top: 2.75rem;
  margin-left: calc(50% - 50vw);
  padding: 2.5rem 0 2.75rem;
  background: var(--srs-teal);
  color: #f8f6f1;
}

.srs-footer__inner {
  max-width: 68rem;
  margin-inline: auto;
  padding-inline: 1.25rem;
  display: grid;
  gap: 1.25rem;
  align-items: center;
}

.srs-footer__copy {
  min-width: 0;
}

.srs-footer__title {
  font-family: var(--srs-font-display);
  font-size: clamp(1.85rem, 4vw, 2.35rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  text-wrap: balance;
  color: #fffcf7;
  margin-bottom: 0.7rem;
}

.srs-footer__lead {
  max-width: 36rem;
  color: color-mix(in srgb, #f8f6f1 82%, var(--srs-teal));
}

.srs-footer__actions {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;
  margin-top: 1.35rem;
}

.srs-cta--on-teal {
  background: #fffcf7;
  color: var(--srs-teal);
}

.srs-cta--on-teal:hover {
  background: color-mix(in srgb, #fffcf7 88%, var(--srs-copper));
}

.srs-cta--ghost-on-teal {
  border: 1px solid color-mix(in srgb, #f8f6f1 45%, transparent);
  color: #f8f6f1;
  background: transparent;
}

.srs-cta--ghost-on-teal:hover {
  border-color: #f8f6f1;
  background: color-mix(in srgb, #f8f6f1 10%, transparent);
}

.srs-footer__hint {
  font-family: var(--srs-font-body);
  font-size: 1rem;
  color: color-mix(in srgb, #f8f6f1 72%, var(--srs-teal));
  margin-top: 0.85rem;
}

.srs-footer__art {
  width: min(100%, 16rem);
  justify-self: center;
  order: 3;
}

.srs-footer__art :deep(.srs-illus__frame) {
  border: none;
  background: transparent;
  border-radius: 0;
}

.srs-footer__art :deep(.srs-illus__img) {
  max-height: 16rem;
}

.srs-footer__credit {
  font-family: var(--srs-font-body);
  font-size: 1rem;
  color: color-mix(in srgb, #f8f6f1 68%, var(--srs-teal));
  padding-top: 0.25rem;
  order: 4;
}

.srs-footer__credit-link {
  color: #fffcf7;
  text-underline-offset: 0.18em;
}

.srs-footer__credit-link:hover {
  color: color-mix(in srgb, #fffcf7 80%, var(--srs-copper));
}

.srs-footer__credit-link:focus-visible {
  outline: 2px solid var(--srs-copper);
  outline-offset: 3px;
  border-radius: 0.2rem;
}

.srs-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (min-width: 768px) {
  .srs-footer {
    padding: 3rem 0 3.25rem;
  }

  .srs-footer__inner {
    padding-inline: 2rem;
    grid-template-columns: minmax(0, 1fr) minmax(14rem, 20rem);
    grid-template-rows: auto auto;
    gap: 1.5rem 2.5rem;
  }

  .srs-footer__copy {
    grid-column: 1;
    grid-row: 1;
  }

  .srs-footer__art {
    width: 100%;
    justify-self: end;
    order: unset;
    grid-column: 2;
    grid-row: 1 / span 2;
    align-self: center;
  }

  .srs-footer__art :deep(.srs-illus__img) {
    max-height: 20rem;
  }

  .srs-footer__actions {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }

  .srs-footer__credit {
    grid-column: 1;
    grid-row: 2;
    order: unset;
    padding-top: 1.15rem;
    border-top: 1px solid color-mix(in srgb, #f8f6f1 18%, transparent);
  }
}

.srs-body {
  font-family: var(--srs-font-body);
  font-size: 1rem;
  line-height: 1.6;
}
</style>
