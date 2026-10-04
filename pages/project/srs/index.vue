<template>
  <div ref="pageRef" class="srs-page">
    <t-nav class="relative z-20" />

    <main class="srs-main">
      <header class="srs-hero">
        <div class="srs-hero__copy">
          <p class="srs-kicker srs-enter" style="--at: 0ms">{{ hero.kicker }}</p>
          <h1 class="srs-hero__title">
            <template v-for="(word, index) in titleWords" :key="index">
              <span class="srs-word" :style="{ '--at': `${120 + index * 90}ms` }">{{ word }}</span>{{ " " }}
            </template>
            <span
              class="srs-hero__gen srs-word"
              :style="{ '--at': `${120 + titleWords.length * 90 + 60}ms` }"
            >{{ hero.generation }}</span>
          </h1>
          <p class="srs-hero__pitch srs-enter" style="--at: 620ms">{{ hero.pitch }}</p>
          <div class="srs-actions srs-enter" style="--at: 740ms">
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
              <Icon name="mdi:arrow-left" class="srs-cta__icon srs-cta__icon--back" aria-hidden="true" />
              Back to projects
            </NuxtLink>
          </div>
        </div>

        <dl class="srs-facts" aria-label="Project facts">
          <div
            v-for="(fact, index) in facts"
            :key="fact.label"
            class="srs-fact srs-enter"
            :style="{ '--at': `${820 + index * 70}ms` }"
          >
            <dt class="srs-fact__label">{{ fact.label }}</dt>
            <dd class="srs-fact__value">{{ fact.value }}</dd>
          </div>
        </dl>

        <div class="srs-hero__visual">
          <SrsScreen
            class="srs-hero__screen"
            :screen="hero.screen"
            assemble="load"
            eager
            data-parallax="hero"
          />
        </div>
      </header>

      <section class="srs-section" aria-labelledby="did-heading">
        <div class="srs-section__head" data-reveal="up">
          <p class="srs-kicker">My role</p>
          <h2 id="did-heading" class="srs-h2">What I did</h2>
        </div>

        <dl v-if="outcomeMetrics.length" class="srs-metrics" data-reveal="group">
          <div
            v-for="(metric, index) in outcomeMetrics"
            :key="metric.label"
            class="srs-metric"
            :style="{ '--i': index }"
          >
            <dt class="srs-metric__label">{{ metric.label }}</dt>
            <dd class="srs-metric__value">{{ metric.value }}</dd>
          </div>
        </dl>

        <div class="srs-did" data-reveal="group">
          <article class="srs-card srs-lift srs-did__card" style="--i: 0">
            <p class="srs-did__step">
              <Icon name="mdi:help-circle-outline" class="srs-did__icon" aria-hidden="true" />
              01
            </p>
            <h3 class="srs-h3">{{ problem.title }}</h3>
            <p class="srs-body srs-muted">{{ problem.body }}</p>
          </article>

          <article class="srs-card srs-lift srs-did__card srs-did__card--built" style="--i: 1">
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

          <article class="srs-card srs-lift srs-did__card" style="--i: 2">
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
        <div class="srs-section__head" data-reveal="up">
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
            <div
              class="srs-feature__copy"
              :data-reveal="index % 2 === 1 ? 'from-right' : 'from-left'"
            >
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
            <SrsScreen
              class="srs-feature__screen"
              :screen="feature.screen"
              assemble="reveal"
              :data-reveal="index % 2 === 1 ? 'from-left' : 'from-right'"
              data-parallax="feature"
            />
          </article>
        </div>

        <div class="srs-modules">
          <div data-reveal="up">
            <h3 class="srs-h3 srs-modules__title">Seven domains, one platform</h3>
            <p class="srs-body srs-muted srs-modules__lead">
              SRS is organized into domains that mirror how university staff work.
            </p>
          </div>
          <ModuleGrid :modules="modules" />
        </div>
      </section>

      <section class="srs-section" aria-labelledby="lifecycle-heading">
        <div class="srs-section__head" data-reveal="up">
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
        <div class="srs-section__head" data-reveal="up">
          <p class="srs-kicker">Technology</p>
          <h2 id="stack-heading" class="srs-h2">Tech stack</h2>
          <p class="srs-lead">
            A Vue.js frontend and a NestJS backend, built for long-running
            enterprise use.
          </p>
        </div>
        <div class="srs-stack" data-reveal="group">
          <div
            v-for="(group, index) in techStack"
            :key="group.title"
            class="srs-card srs-lift"
            :style="{ '--i': index }"
          >
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
        <div class="srs-footer__copy" data-reveal="from-left">
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
        <SrsScreen
          class="srs-footer__screen"
          :screen="loginScreen"
          data-reveal="from-right"
        />
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

definePageMeta({
  pageTransition: { name: "srs-page", mode: "out-in" },
});

const titleWords = hero.title.split(" ");

// Scroll reveals and parallax. Nothing is hidden until this runs: the hidden
// states in CSS only apply under `.srs-motion`, which is added here after
// mount, and never when the visitor prefers reduced motion.
const pageRef = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;
let stopParallax: (() => void) | null = null;

function revealAll() {
  pageRef.value
    ?.querySelectorAll("[data-reveal]")
    .forEach((element) => element.classList.add("is-revealed"));
}

function startParallax(root: HTMLElement) {
  const elements = [...root.querySelectorAll<HTMLElement>("[data-parallax]")];
  let frame = 0;

  function update() {
    frame = 0;
    const viewportCenter = window.innerHeight / 2;
    for (const element of elements) {
      if (element.dataset.parallax === "hero") {
        // The hero frame drifts down slower than the page scrolls away.
        element.style.translate = `0 ${Math.min(window.scrollY * 0.08, 48)}px`;
        continue;
      }
      // Measure without the current offset so the effect cannot feed back.
      const offset = Number(element.dataset.parallaxOffset ?? 0);
      const rect = element.getBoundingClientRect();
      const center = rect.top - offset + rect.height / 2;
      const next = Math.max(-28, Math.min(28, (viewportCenter - center) * 0.05));
      element.dataset.parallaxOffset = String(next);
      element.style.translate = `0 ${next.toFixed(1)}px`;
    }
  }

  function onScroll() {
    if (frame) return;
    frame = requestAnimationFrame(update);
  }

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    for (const element of elements) element.style.translate = "";
  };
}

onMounted(() => {
  const root = pageRef.value;
  if (!root) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  if ("IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer?.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    root.querySelectorAll("[data-reveal]").forEach((element) => observer?.observe(element));
    root.classList.add("srs-motion");
    window.addEventListener("beforeprint", revealAll);
  }

  if (window.matchMedia("(min-width: 960px)").matches) {
    stopParallax = startParallax(root);
  }
});

onBeforeUnmount(() => {
  observer?.disconnect();
  stopParallax?.();
  window.removeEventListener("beforeprint", revealAll);
});

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
  --srs-ease: cubic-bezier(0.22, 1, 0.36, 1);
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

/* Hero entrance: kicker, title words (blur to sharp), pitch, buttons, facts,
   then the framed dashboard rises with a soft glow. `--at` is each element's
   start time. Pure CSS, so it also plays before hydration and without JS. */
@media (prefers-reduced-motion: no-preference) {
  .srs-enter {
    animation: srs-hero-in 800ms var(--srs-ease) var(--at, 0ms) both;
  }

  .srs-word {
    display: inline-block;
    animation: srs-word-in 1000ms var(--srs-ease) var(--at, 0ms) both;
  }

  .srs-hero__gen.srs-word {
    display: block;
  }

  .srs-hero__visual {
    animation: srs-visual-in 1300ms var(--srs-ease) 900ms both;
  }

  .srs-hero__visual::before {
    animation: srs-bloom 1800ms var(--srs-ease) 1250ms both;
  }
}

/* Phones: no blur on the title and a shorter sequence. Only custom properties
   and timings change here, never animation-name, so resizing never replays it. */
@media (prefers-reduced-motion: no-preference) and (max-width: 767px) {
  .srs-word {
    --word-blur: 0px;
    animation-duration: 700ms;
  }

  .srs-hero__visual {
    animation-duration: 900ms;
    animation-delay: 650ms;
  }
}

@keyframes srs-hero-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}

@keyframes srs-word-in {
  from {
    opacity: 0;
    transform: translateY(0.35em);
    filter: blur(var(--word-blur, 12px));
  }
}

@keyframes srs-visual-in {
  from {
    opacity: 0;
    transform: translateY(48px) scale(0.97);
  }
}

@keyframes srs-bloom {
  from {
    opacity: 0;
    transform: scale(0.8);
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
    background-color 200ms ease-out,
    border-color 200ms ease-out,
    color 200ms ease-out,
    box-shadow 250ms var(--srs-ease);
}

.srs-cta--primary:hover,
.srs-cta--on-teal:hover {
  box-shadow: 0 10px 24px -10px color-mix(in srgb, var(--srs-ink) 45%, transparent);
}

.srs-cta:focus-visible {
  outline: 2px solid var(--srs-copper-soft);
  outline-offset: 2px;
}

.srs-cta__icon {
  width: 1.1rem;
  height: 1.1rem;
  transition: translate 250ms var(--srs-ease);
}

.srs-cta:hover .srs-cta__icon {
  translate: 2px -2px;
}

.srs-cta:hover .srs-cta__icon--back {
  translate: -3px 0;
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

<style>
/* Shared SRS motion, unscoped because the reveal targets live in child
   components too. Every hidden state requires `.srs-motion`, which the page
   only adds after mount when motion is allowed, so SSR, no-JS and
   reduced-motion visitors always see everything. */
@media (prefers-reduced-motion: no-preference) {
  .srs-motion [data-reveal]:not([data-reveal="group"]):not(.is-revealed),
  .srs-motion [data-reveal="group"]:not(.is-revealed) > * {
    opacity: 0;
  }

  .srs-motion [data-reveal="up"].is-revealed {
    animation: srs-reveal-up 900ms var(--srs-ease) both;
  }

  .srs-motion [data-reveal="from-left"] {
    --reveal-x: -48px;
  }

  .srs-motion [data-reveal="from-right"] {
    --reveal-x: 48px;
  }

  .srs-motion :is([data-reveal="from-left"], [data-reveal="from-right"]).is-revealed {
    animation: srs-reveal-side 1000ms var(--srs-ease) both;
  }

  .srs-motion [data-reveal="group"].is-revealed > * {
    animation: srs-reveal-up 850ms var(--srs-ease) calc(var(--i, 0) * 90ms) both;
  }

  .srs-page-enter-active,
  .srs-page-leave-active {
    transition:
      opacity 350ms ease,
      transform 350ms var(--srs-ease, ease);
  }

  .srs-page-enter-from {
    opacity: 0;
    transform: translateY(12px);
  }

  .srs-page-leave-to {
    opacity: 0;
  }
}

/* Phones: shorter distances, no sideways slides. Only custom properties and
   timings change here, never animation-name, so crossing the breakpoint never
   replays a finished reveal. */
@media (prefers-reduced-motion: no-preference) and (max-width: 959px) {
  .srs-motion :is([data-reveal="from-left"], [data-reveal="from-right"]) {
    --reveal-x: 0px;
    --reveal-y: 28px;
  }

  .srs-motion :is([data-reveal="from-left"], [data-reveal="from-right"]).is-revealed {
    animation-duration: 750ms;
  }

  .srs-motion [data-reveal="group"].is-revealed > * {
    animation-duration: 650ms;
    animation-delay: calc(var(--i, 0) * 50ms);
  }
}

@keyframes srs-reveal-up {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
}

@keyframes srs-reveal-side {
  from {
    opacity: 0;
    transform: translate(var(--reveal-x, 0px), var(--reveal-y, 0px));
  }
}

/* Hover lift for cards. Uses `translate`, not `transform`, so it never fights
   the reveal animation. */
.srs-lift {
  transition:
    translate 300ms var(--srs-ease),
    box-shadow 300ms var(--srs-ease),
    border-color 200ms ease-out,
    background-color 400ms ease,
    color 400ms ease;
}

.srs-lift:hover {
  border-color: var(--srs-line-strong);
  box-shadow: 0 18px 36px -18px color-mix(in srgb, var(--srs-ink) 35%, transparent);
}

@media (prefers-reduced-motion: no-preference) {
  .srs-lift:hover {
    translate: 0 -4px;
  }
}

/* Smooth colour change when the colour mode flips. */
/* :where() keeps this at zero specificity so component transitions still win. */
:where(.srs-page, .srs-page :is(h1, h2, h3, h4, p, li, dt, dd, .screen__window, .screen__bar)) {
  transition-property: color, background-color, border-color;
  transition-duration: 400ms;
  transition-timing-function: ease;
}
</style>
