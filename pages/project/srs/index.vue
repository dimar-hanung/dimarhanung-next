<template>
  <div class="srs-page">
    <t-nav class="relative z-20" />

    <main class="srs-main">
      <header class="srs-hero">
        <div class="srs-hero__copy srs-rise">
          <p class="srs-kicker">{{ hero.kicker }}</p>
          <h1 class="srs-hero__title">
            {{ hero.title }}
            <span class="srs-hero__gen">{{ hero.generation }}</span>
          </h1>
          <p class="srs-hero__pitch">{{ hero.pitch }}</p>
          <div class="srs-actions">
            <a
              :href="liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="srs-cta srs-cta--primary"
            >
              Visit live platform
              <Icon name="mdi:open-in-new" class="srs-cta__icon" aria-hidden="true" />
              <span class="srs-sr-only">(opens in a new tab)</span>
            </a>
            <NuxtLink to="/project" class="srs-cta srs-cta--ghost">
              Back to projects
            </NuxtLink>
          </div>
        </div>

        <dl class="srs-facts srs-rise" aria-label="Project facts">
          <div v-for="fact in facts" :key="fact.label" class="srs-fact">
            <dt class="srs-fact__label">{{ fact.label }}</dt>
            <dd class="srs-fact__value">{{ fact.value }}</dd>
          </div>
        </dl>

        <div class="srs-hero__visual srs-rise">
          <SrsScreen :screen="hero.screen" eager />
        </div>
      </header>

      <section class="srs-section" aria-labelledby="did-heading">
        <div class="srs-section__head">
          <p class="srs-kicker">My role</p>
          <h2 id="did-heading" class="srs-h2">What I did</h2>
        </div>

        <dl v-if="outcomeMetrics.length" class="srs-metrics">
          <div v-for="metric in outcomeMetrics" :key="metric.label" class="srs-metric">
            <dt class="srs-metric__label">{{ metric.label }}</dt>
            <dd class="srs-metric__value">{{ metric.value }}</dd>
          </div>
        </dl>

        <div class="srs-did">
          <article class="srs-card srs-did__card">
            <p class="srs-did__step">
              <Icon name="mdi:help-circle-outline" class="srs-did__icon" aria-hidden="true" />
              01
            </p>
            <h3 class="srs-h3">{{ problem.title }}</h3>
            <p class="srs-body srs-muted">{{ problem.body }}</p>
          </article>

          <article class="srs-card srs-did__card srs-did__card--built">
            <p class="srs-did__step">
              <Icon name="mdi:hammer-wrench" class="srs-did__icon" aria-hidden="true" />
              02
            </p>
            <h3 class="srs-h3">{{ built.title }}</h3>
            <ul class="srs-checks">
              <li v-for="point in built.points" :key="point">
                <Icon name="mdi:check-circle-outline" class="srs-checks__icon" aria-hidden="true" />
                {{ point }}
              </li>
            </ul>
          </article>

          <article class="srs-card srs-did__card">
            <p class="srs-did__step">
              <Icon name="mdi:flag-checkered" class="srs-did__icon" aria-hidden="true" />
              03
            </p>
            <h3 class="srs-h3">{{ outcome.title }}</h3>
            <ul class="srs-checks">
              <li v-for="point in outcome.points" :key="point">
                <Icon name="mdi:check-circle-outline" class="srs-checks__icon" aria-hidden="true" />
                {{ point }}
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section class="srs-section" aria-labelledby="features-heading">
        <div class="srs-section__head">
          <p class="srs-kicker">Key features</p>
          <h2 id="features-heading" class="srs-h2">What staff do in SRS</h2>
          <p class="srs-lead">
            One platform carries a student's record through every term. Here are
            the main areas, kept high level and shown with sample data.
          </p>
        </div>

        <div class="srs-features">
          <article
            v-for="(feature, index) in features"
            :key="feature.id"
            class="srs-feature"
            :class="{ 'srs-feature--flip': index % 2 === 1 }"
          >
            <div class="srs-feature__copy">
              <p class="srs-kicker">{{ feature.eyebrow }}</p>
              <h3 class="srs-feature__title">{{ feature.title }}</h3>
              <p class="srs-body srs-muted">{{ feature.summary }}</p>
              <ul class="srs-checks">
                <li v-for="point in feature.points" :key="point">
                  <Icon name="mdi:check-circle-outline" class="srs-checks__icon" aria-hidden="true" />
                  {{ point }}
                </li>
              </ul>
            </div>
            <SrsScreen class="srs-feature__screen" :screen="feature.screen" />
          </article>
        </div>

        <div class="srs-modules">
          <h3 class="srs-h3 srs-modules__title">Seven domains, one platform</h3>
          <p class="srs-body srs-muted srs-modules__lead">
            SRS is organized into domains that mirror how university staff work.
          </p>
          <ModuleGrid :modules="modules" />
        </div>
      </section>

      <section class="srs-section" aria-labelledby="lifecycle-heading">
        <div class="srs-section__head">
          <p class="srs-kicker">Student lifecycle</p>
          <h2 id="lifecycle-heading" class="srs-h2">From enrollment to graduation</h2>
          <p class="srs-lead">
            Where SRS supports each stage of a student's journey. A simplified
            view, not every workflow or rule.
          </p>
        </div>
        <LifecycleTimeline :stages="stages" />
      </section>

      <section class="srs-section srs-section--last" aria-labelledby="stack-heading">
        <div class="srs-section__head">
          <p class="srs-kicker">Technology</p>
          <h2 id="stack-heading" class="srs-h2">Tech stack</h2>
          <p class="srs-lead">
            A Vue.js frontend and a NestJS backend, built for long-running
            enterprise use.
          </p>
        </div>
        <div class="srs-stack">
          <div v-for="group in techStack" :key="group.title" class="srs-card">
            <h3 class="srs-stack__title">{{ group.title }}</h3>
            <ul class="srs-stack__list">
              <li v-for="item in group.items" :key="item.name" class="srs-stack__item">
                <span class="srs-stack__logo" aria-hidden="true">
                  <Icon :name="item.icon" class="srs-stack__icon" />
                </span>
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <footer class="srs-footer">
      <div class="srs-footer__inner">
        <div class="srs-footer__copy">
          <h2 class="srs-footer__title">See the live system</h2>
          <p class="srs-body srs-footer__lead">
            SRS5G is in daily use by university staff at Universitas Terbuka.
            This page stays high level: no internal workflows or production data.
          </p>
          <div class="srs-actions">
            <a
              :href="liveUrl"
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
        <SrsScreen class="srs-footer__screen" :screen="loginScreen" />
        <p class="srs-footer__credit">
          Product screens on this page are illustrative mocks with sample data.
          Icons from Material Design Icons and SVG Logos.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import LifecycleTimeline from "./components/LifecycleTimeline.vue";
import ModuleGrid from "./components/ModuleGrid.vue";
import SrsScreen from "./components/SrsScreen.vue";
import {
  built,
  facts,
  features,
  hero,
  liveUrl,
  loginScreen,
  modules,
  outcome,
  outcomeMetrics,
  problem,
  stages,
  techStack,
} from "./data";

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
        "SRS5G is the full-stack student record platform Dimar Hanung works on for Universitas Terbuka staff: registration, student records, reports, and graduation, built with Vue and NestJS.",
    },
  ],
});
</script>

<style scoped>
.srs-page {
  --srs-teal: #0d5c63;
  --srs-accent: #0d5c63;
  --srs-copper: #a35b22;
  --srs-copper-soft: #c47b3a;
  --srs-ink: #1a2b2e;
  --srs-muted: #55686c;
  --srs-page-solid: #f4f0e8;
  --srs-panel: #fffcf7;
  --srs-chrome: #f1ebe0;
  --srs-tint: color-mix(in srgb, var(--srs-teal) 9%, var(--srs-panel));
  --srs-line: color-mix(in srgb, var(--srs-teal) 16%, transparent);
  --srs-line-strong: color-mix(in srgb, var(--srs-teal) 40%, transparent);
  --srs-button-bg: #0d5c63;
  --srs-button-fg: #f8f6f1;
  --srs-band: #0d5c63;
  --srs-font-display: "Fraunces", "Iowan Old Style", "Palatino Linotype", serif;
  --srs-font-body: "Source Serif 4", "Georgia", serif;

  min-height: 100vh;
  background:
    radial-gradient(
      ellipse 80% 40rem at 10% -10%,
      color-mix(in srgb, var(--srs-copper-soft) 14%, transparent),
      transparent 60%
    ),
    radial-gradient(
      ellipse 60% 36rem at 100% 0%,
      color-mix(in srgb, var(--srs-teal) 12%, transparent),
      transparent 55%
    ),
    var(--srs-page-solid);
  color: var(--srs-ink);
  overflow-x: clip;
}

:global(.dark .srs-page) {
  --srs-teal: #0d5c63;
  --srs-accent: #7cc8cd;
  --srs-copper: #e2a46c;
  --srs-copper-soft: #c98a50;
  --srs-ink: #ece6da;
  --srs-muted: #a7b6b7;
  --srs-page-solid: #0f1a1b;
  --srs-panel: #152325;
  --srs-chrome: #1a2b2d;
  --srs-tint: color-mix(in srgb, #7cc8cd 12%, var(--srs-panel));
  --srs-line: color-mix(in srgb, #7cc8cd 16%, transparent);
  --srs-line-strong: color-mix(in srgb, #7cc8cd 42%, transparent);
  --srs-button-bg: #7cc8cd;
  --srs-button-fg: #0f1a1b;
  --srs-band: #0b4146;
}

.srs-main {
  max-width: 72rem;
  margin-inline: auto;
  padding: 1rem 1.25rem 0;
}

@media (min-width: 768px) {
  .srs-main {
    padding-inline: 2rem;
  }
}

/* Type scale: h1 clamp 2.75-4.25rem, h2 2.25rem, h3 1.25rem, body 1.0625rem. */
.srs-kicker {
  font-family: var(--srs-font-body);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--srs-copper);
}

.srs-h2 {
  margin-top: 0.35rem;
  font-family: var(--srs-font-display);
  font-size: clamp(1.85rem, 3.5vw, 2.25rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-wrap: balance;
  color: var(--srs-ink);
}

.srs-h3 {
  font-family: var(--srs-font-display);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--srs-ink);
}

.srs-body {
  font-family: var(--srs-font-body);
  font-size: 1.0625rem;
  line-height: 1.65;
}

.srs-muted {
  color: var(--srs-muted);
}

.srs-lead {
  max-width: 40rem;
  margin-top: 0.85rem;
  font-family: var(--srs-font-body);
  font-size: 1.125rem;
  line-height: 1.65;
  color: var(--srs-muted);
}

.srs-card {
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid var(--srs-line);
  background: var(--srs-panel);
  transition: border-color 150ms ease-out;
}

.srs-card:hover {
  border-color: var(--srs-line-strong);
}

/* Hero */
.srs-hero {
  display: grid;
  gap: 2.5rem;
  padding-block: 3rem 0;
}

.srs-hero__copy {
  max-width: 48rem;
}

.srs-hero__title {
  margin-top: 0.75rem;
  font-family: var(--srs-font-display);
  font-size: clamp(2.75rem, 6vw, 4.25rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.035em;
  color: var(--srs-ink);
}

.srs-hero__gen {
  display: block;
  margin-top: 0.1em;
  font-size: 0.62em;
  color: var(--srs-accent);
}

.srs-hero__pitch {
  max-width: 40rem;
  margin-top: 1.5rem;
  font-family: var(--srs-font-body);
  font-size: clamp(1.125rem, 1.6vw, 1.3rem);
  line-height: 1.6;
  color: var(--srs-muted);
}

.srs-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

.srs-facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem 1.5rem;
  padding-block: 1.5rem;
  border-block: 1px solid var(--srs-line);
}

@media (min-width: 768px) {
  .srs-facts {
    grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
  }
}

.srs-fact__label {
  font-family: var(--srs-font-body);
  font-size: 0.9375rem;
  color: var(--srs-copper);
}

.srs-fact__value {
  margin-top: 0.2rem;
  font-family: var(--srs-font-display);
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--srs-ink);
}

.srs-hero__visual {
  position: relative;
}

.srs-hero__visual::before {
  content: "";
  position: absolute;
  inset: 10% -3% 12%;
  z-index: -1;
  border-radius: 2rem;
  background:
    radial-gradient(
      closest-side at 25% 60%,
      color-mix(in srgb, var(--srs-copper-soft) 22%, transparent),
      transparent
    ),
    radial-gradient(
      closest-side at 75% 40%,
      color-mix(in srgb, var(--srs-teal) 20%, transparent),
      transparent
    );
  filter: blur(24px);
}

@media (prefers-reduced-motion: no-preference) {
  .srs-rise {
    animation: srs-rise 600ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .srs-rise:nth-child(2) {
    animation-delay: 80ms;
  }

  .srs-rise:nth-child(3) {
    animation-delay: 160ms;
  }
}

@keyframes srs-rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
}

/* Sections */
.srs-section {
  margin-top: 4rem;
}

.srs-section__head {
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .srs-section {
    margin-top: 6rem;
  }

  .srs-section__head {
    margin-bottom: 2.5rem;
  }
}

.srs-section--last {
  margin-bottom: 4rem;
}

@media (min-width: 768px) {
  .srs-section--last {
    margin-bottom: 6rem;
  }
}

.srs-checks {
  display: grid;
  gap: 0.6rem;
  margin-top: 1rem;
  font-family: var(--srs-font-body);
  font-size: 1.0625rem;
  line-height: 1.5;
  color: var(--srs-ink);
}

.srs-checks li {
  display: grid;
  grid-template-columns: 1.25rem minmax(0, 1fr);
  gap: 0.6rem;
}

.srs-checks__icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.1rem;
  color: var(--srs-accent);
}

/* What I did */
.srs-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.srs-metric {
  display: flex;
  flex-direction: column-reverse;
  padding: 1.25rem 1.5rem;
  border-radius: 1rem;
  background: var(--srs-tint);
}

.srs-metric__value {
  font-family: var(--srs-font-display);
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--srs-accent);
}

.srs-metric__label {
  margin-top: 0.25rem;
  font-family: var(--srs-font-body);
  font-size: 1rem;
  color: var(--srs-muted);
}

.srs-did {
  display: grid;
  gap: 1rem;
}

@media (min-width: 960px) {
  .srs-did {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr) minmax(0, 1fr);
  }
}

.srs-did__card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.srs-did__card .srs-checks {
  margin-top: 0.25rem;
}

.srs-did__card--built {
  border-color: var(--srs-line-strong);
  background: var(--srs-tint);
}

.srs-did__step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--srs-font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--srs-copper);
}

.srs-did__icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--srs-accent);
}

/* Key features */
.srs-features {
  display: grid;
  gap: 3.5rem;
}

.srs-feature {
  display: grid;
  gap: 1.5rem;
  align-items: center;
}

.srs-feature__title {
  margin-top: 0.35rem;
  margin-bottom: 0.75rem;
  font-family: var(--srs-font-display);
  font-size: clamp(1.4rem, 2.4vw, 1.75rem);
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: var(--srs-ink);
}

@media (min-width: 960px) {
  .srs-features {
    gap: 5rem;
  }

  .srs-feature {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: 3.5rem;
  }

  .srs-feature--flip {
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  }

  .srs-feature--flip .srs-feature__copy {
    order: 2;
  }
}

.srs-modules {
  margin-top: 4rem;
}

.srs-modules__title {
  font-size: 1.5rem;
}

.srs-modules__lead {
  margin-top: 0.35rem;
  margin-bottom: 1.5rem;
}

/* Tech stack */
.srs-stack {
  display: grid;
  gap: 1rem;
}

@media (min-width: 768px) {
  .srs-stack {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.srs-stack__title {
  margin-bottom: 1rem;
  font-family: var(--srs-font-display);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--srs-copper);
}

.srs-stack__list {
  display: grid;
  gap: 0.6rem;
}

.srs-stack__item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--srs-font-body);
  font-size: 1.0625rem;
  color: var(--srs-ink);
}

.srs-stack__logo {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.6rem;
  border: 1px solid var(--srs-line);
  background: #fffcf7;
  color: var(--srs-teal);
}

.srs-stack__icon {
  width: 1.35rem;
  height: 1.35rem;
}

/* Buttons */
.srs-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 2.75rem;
  padding: 0.75rem 1.2rem;
  border-radius: 0.65rem;
  font-family: var(--srs-font-body);
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 150ms ease-out,
    border-color 150ms ease-out,
    color 150ms ease-out;
}

.srs-cta:focus-visible {
  outline: 2px solid var(--srs-copper-soft);
  outline-offset: 2px;
}

.srs-cta__icon {
  width: 1.1rem;
  height: 1.1rem;
}

.srs-cta--primary {
  background: var(--srs-button-bg);
  color: var(--srs-button-fg);
}

.srs-cta--primary:hover {
  background: color-mix(in srgb, var(--srs-button-bg) 86%, var(--srs-ink));
}

.srs-cta--ghost {
  border: 1px solid var(--srs-line-strong);
  color: var(--srs-accent);
}

.srs-cta--ghost:hover {
  border-color: var(--srs-accent);
  background: var(--srs-tint);
}

.srs-cta--on-teal {
  background: #fffcf7;
  color: #0d5c63;
}

.srs-cta--on-teal:hover {
  background: color-mix(in srgb, #fffcf7 85%, #c47b3a);
}

.srs-cta--ghost-on-teal {
  border: 1px solid rgb(248 246 241 / 0.45);
  color: #f8f6f1;
}

.srs-cta--ghost-on-teal:hover {
  border-color: #f8f6f1;
  background: rgb(248 246 241 / 0.1);
}

/* Footer band */
.srs-footer {
  padding-block: 3.5rem;
  background: var(--srs-band);
  color: #f8f6f1;
}

.srs-footer__inner {
  display: grid;
  gap: 2rem;
  align-items: center;
  max-width: 72rem;
  margin-inline: auto;
  padding-inline: 1.25rem;
}

.srs-footer__title {
  font-family: var(--srs-font-display);
  font-size: clamp(1.85rem, 4vw, 2.5rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #fffcf7;
}

.srs-footer__lead {
  max-width: 34rem;
  margin-top: 0.75rem;
  color: rgb(248 246 241 / 0.82);
}

.srs-footer__hint {
  margin-top: 0.85rem;
  font-family: var(--srs-font-body);
  font-size: 1rem;
  color: rgb(248 246 241 / 0.72);
}

.srs-footer__screen {
  --srs-line: rgb(255 255 255 / 0.18);
  --srs-chrome: #f1ebe0;
  --srs-page-solid: #fffcf7;
  --srs-muted: #55686c;
}

.srs-footer__screen :deep(.screen__caption) {
  color: rgb(248 246 241 / 0.72);
}

.srs-footer__credit {
  padding-top: 1.25rem;
  border-top: 1px solid rgb(248 246 241 / 0.18);
  font-family: var(--srs-font-body);
  font-size: 1rem;
  color: rgb(248 246 241 / 0.72);
}

@media (min-width: 768px) {
  .srs-footer {
    padding-block: 4.5rem;
  }

  .srs-footer__inner {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
    gap: 2.5rem 4rem;
    padding-inline: 2rem;
  }

  .srs-footer__credit {
    grid-column: 1 / -1;
  }
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
</style>
