<template>
  <div ref="pageRef" class="admisi-page">
    <t-nav class="relative z-20" />

    <main class="admisi-main">
      <header class="admisi-hero">
        <div class="admisi-hero__top">
          <div class="admisi-hero__copy">
            <p class="admisi-kicker admisi-enter" style="--at: 0ms">{{ hero.kicker }}</p>
            <h1 class="admisi-hero__title">
              <span class="admisi-enter" style="--at: 120ms">{{ hero.title }}</span>
              <span class="admisi-hero__sub admisi-enter" style="--at: 240ms">{{ hero.subtitle }}</span>
            </h1>
            <p class="admisi-hero__pitch admisi-enter" style="--at: 380ms">{{ hero.pitch }}</p>
            <div class="admisi-actions admisi-enter" style="--at: 500ms">
              <a
                :href="liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="admisi-cta admisi-cta--primary"
              >
                Visit live portal
                <Icon name="mdi:open-in-new" class="admisi-cta__icon" aria-hidden="true" />
                <span class="admisi-sr-only">(opens in a new tab)</span>
              </a>
              <NuxtLink to="/project" class="admisi-cta admisi-cta--ghost">
                <Icon name="mdi:arrow-left" class="admisi-cta__icon admisi-cta__icon--back" aria-hidden="true" />
                Back to projects
              </NuxtLink>
            </div>
          </div>

          <aside class="admisi-ticket" aria-labelledby="ticket-heading">
            <div class="admisi-ticket__paper">
              <p class="admisi-ticket__brand" aria-hidden="true">Admisi UT</p>
              <h2 id="ticket-heading" class="admisi-ticket__heading">Project facts</h2>
              <dl class="admisi-ticket__facts">
                <div v-for="fact in facts" :key="fact.label" class="admisi-ticket__fact">
                  <dt>{{ fact.label }}</dt>
                  <dd>{{ fact.value }}</dd>
                </div>
              </dl>
              <span class="admisi-ticket__barcode" aria-hidden="true" />
              <p class="admisi-ticket__foot" aria-hidden="true">{{ liveHost }}</p>
            </div>
          </aside>
        </div>

        <div class="admisi-hero__visual">
          <AdmisiScreen :screen="hero.screen" assemble="load" eager />
        </div>
      </header>

      <section class="admisi-section" aria-labelledby="did-heading">
        <div class="admisi-section__head" data-reveal="up">
          <p class="admisi-kicker">My role</p>
          <h2 id="did-heading" class="admisi-h2">What I did</h2>
        </div>

        <dl v-if="outcomeMetrics.length" class="admisi-metrics" data-reveal="group">
          <div
            v-for="(metric, index) in outcomeMetrics"
            :key="metric.label"
            class="admisi-metric"
            :style="{ '--i': index }"
          >
            <dt class="admisi-metric__label">{{ metric.label }}</dt>
            <dd class="admisi-metric__value">{{ metric.value }}</dd>
          </div>
        </dl>

        <div class="admisi-did" data-reveal="group">
          <article class="admisi-card admisi-lift admisi-did__card" style="--i: 0">
            <AdmisiIllustration class="admisi-did__illo admisi-illo-panel" :illustration="problem.illustration" />
            <p class="admisi-did__step">
              <Icon name="mdi:help-circle-outline" class="admisi-did__icon" aria-hidden="true" />
              01
            </p>
            <h3 class="admisi-h3">{{ problem.title }}</h3>
            <p class="admisi-body admisi-muted">{{ problem.body }}</p>
          </article>

          <article class="admisi-card admisi-lift admisi-did__card admisi-did__card--built" style="--i: 1">
            <AdmisiIllustration class="admisi-did__illo admisi-illo-panel" :illustration="built.illustration" />
            <p class="admisi-did__step">
              <Icon name="mdi:hammer-wrench" class="admisi-did__icon" aria-hidden="true" />
              02
            </p>
            <h3 class="admisi-h3">{{ built.title }}</h3>
            <ul class="admisi-checks">
              <li v-for="point in built.points" :key="point">
                <Icon name="mdi:check-circle-outline" class="admisi-checks__icon" aria-hidden="true" />
                {{ point }}
              </li>
            </ul>
          </article>

          <article class="admisi-card admisi-lift admisi-did__card" style="--i: 2">
            <AdmisiIllustration class="admisi-did__illo admisi-illo-panel" :illustration="outcome.illustration" />
            <p class="admisi-did__step">
              <Icon name="mdi:flag-checkered" class="admisi-did__icon" aria-hidden="true" />
              03
            </p>
            <h3 class="admisi-h3">{{ outcome.title }}</h3>
            <ul class="admisi-checks">
              <li v-for="point in outcome.points" :key="point">
                <Icon name="mdi:check-circle-outline" class="admisi-checks__icon" aria-hidden="true" />
                {{ point }}
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section class="admisi-section" aria-labelledby="features-heading">
        <div class="admisi-section__head" data-reveal="up">
          <p class="admisi-kicker">Key features</p>
          <h2 id="features-heading" class="admisi-h2">What applicants do in Admisi UT</h2>
          <p class="admisi-lead">
            The main screens of the portal, kept high level and shown with
            sample data.
          </p>
        </div>

        <div class="admisi-features">
          <article
            v-for="(feature, index) in features"
            :key="feature.id"
            class="admisi-feature"
            :class="{ 'admisi-feature--flip': index % 2 === 1 }"
          >
            <div
              class="admisi-feature__copy"
              :data-reveal="index % 2 === 1 ? 'from-right' : 'from-left'"
            >
              <p class="admisi-kicker">{{ feature.eyebrow }}</p>
              <h3 class="admisi-feature__title">{{ feature.title }}</h3>
              <p class="admisi-body admisi-muted">{{ feature.summary }}</p>
              <ul class="admisi-checks">
                <li v-for="point in feature.points" :key="point">
                  <Icon name="mdi:check-circle-outline" class="admisi-checks__icon" aria-hidden="true" />
                  {{ point }}
                </li>
              </ul>
            </div>
            <AdmisiScreen
              class="admisi-feature__screen"
              :screen="feature.screen"
              assemble="reveal"
              :data-reveal="index % 2 === 1 ? 'from-left' : 'from-right'"
            />
          </article>
        </div>
      </section>

      <section class="admisi-section" aria-labelledby="journey-heading">
        <div class="admisi-section__head admisi-journey__head">
          <div data-reveal="up">
            <p class="admisi-kicker">Admission journey</p>
            <h2 id="journey-heading" class="admisi-h2">Six counters, from sign-up to student number</h2>
            <p class="admisi-lead">
              Admission works like a lobby: take a number and move counter to
              counter until you are a student. A simplified view, not every rule.
            </p>
          </div>
          <AdmisiIllustration
            class="admisi-journey__illo admisi-illo-panel"
            :illustration="journeyIllustration"
            data-reveal="from-right"
          />
        </div>

        <CounterBoard :counters="counters" />

        <div class="admisi-paths">
          <div data-reveal="up">
            <h3 class="admisi-h3 admisi-paths__title">Not everyone takes the same route</h3>
            <p class="admisi-body admisi-muted admisi-paths__lead">
              Some applicants visit one extra counter on the way.
            </p>
          </div>
          <ul class="admisi-paths__grid" data-reveal="group">
            <li
              v-for="(applicant, index) in applicants"
              :key="applicant.id"
              class="admisi-path admisi-lift"
              :style="{ '--i': index }"
            >
              <span class="admisi-path__glyph" aria-hidden="true">
                <Icon :name="applicant.icon" class="admisi-path__icon" />
              </span>
              <p class="admisi-path__tag">{{ applicant.tag }}</p>
              <h4 class="admisi-path__name">{{ applicant.name }}</h4>
              <p class="admisi-path__text">{{ applicant.text }}</p>
              <p class="admisi-path__route">
                <Icon name="mdi:map-marker-path" class="admisi-path__route-icon" aria-hidden="true" />
                {{ applicant.route }}
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section class="admisi-section admisi-section--last" aria-labelledby="stack-heading">
        <div class="admisi-section__head" data-reveal="up">
          <p class="admisi-kicker">Technology</p>
          <h2 id="stack-heading" class="admisi-h2">Tech stack</h2>
          <p class="admisi-lead">
            A Vue admission portal built for long admission seasons: many
            applicants, one steady flow from registration to enrollment.
          </p>
        </div>
        <div class="admisi-stack" data-reveal="group">
          <div
            v-for="(group, index) in techStack"
            :key="group.title"
            class="admisi-card admisi-lift"
            :style="{ '--i': index }"
          >
            <h3 class="admisi-stack__title">{{ group.title }}</h3>
            <ul class="admisi-stack__list">
              <li v-for="item in group.items" :key="item.name" class="admisi-stack__item">
                <span class="admisi-stack__logo" aria-hidden="true">
                  <Icon :name="item.icon" class="admisi-stack__icon" />
                </span>
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <footer class="admisi-footer">
      <div class="admisi-footer__inner">
        <div class="admisi-footer__copy" data-reveal="from-left">
          <AdmisiIllustration class="admisi-footer__illo admisi-illo-panel" :illustration="footerIllustration" />
          <p class="admisi-footer__board" aria-hidden="true">
            <span class="admisi-footer__lamps">
              <span v-for="n in 6" :key="n" class="admisi-footer__lamp" />
            </span>
            Admisi UT · admission lobby
          </p>
          <h2 class="admisi-footer__title">Start at the front door</h2>
          <p class="admisi-body admisi-footer__lead">
            Admisi UT is live and welcoming new students every admission
            season. This page stays high level: no internal workflows, no
            applicant data.
          </p>
          <div class="admisi-actions">
            <a
              :href="liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="admisi-cta admisi-cta--on-ink"
              aria-describedby="admisi-live-hint"
            >
              Visit {{ liveHost }}
              <Icon name="mdi:open-in-new" class="admisi-cta__icon" aria-hidden="true" />
              <span class="admisi-sr-only">(opens in a new tab)</span>
            </a>
            <NuxtLink to="/project" class="admisi-cta admisi-cta--ghost-on-ink">
              More projects
            </NuxtLink>
          </div>
          <p id="admisi-live-hint" class="admisi-footer__hint">
            Applicant login required. Opens in a new tab.
          </p>
        </div>
        <AdmisiScreen
          class="admisi-footer__screen"
          :screen="loginScreen"
          data-reveal="from-right"
        />
        <p class="admisi-footer__credit">
          Product screens on this page are illustrative mocks with sample data.
          Illustrations by
          <a
            :href="illustrationCredit.url"
            target="_blank"
            rel="noopener noreferrer"
            class="admisi-footer__link"
          >{{ illustrationCredit.contributor }}<span class="admisi-sr-only"> (opens in a new tab)</span></a>
          on IconScout. Icons from Material Design Icons and SVG Logos.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import AdmisiIllustration from "./components/AdmisiIllustration.vue";
import AdmisiScreen from "./components/AdmisiScreen.vue";
import CounterBoard from "./components/CounterBoard.vue";
import {
  applicants,
  built,
  counters,
  facts,
  features,
  footerIllustration,
  hero,
  illustrationCredit,
  journeyIllustration,
  liveUrl,
  loginScreen,
  outcome,
  outcomeMetrics,
  problem,
  techStack,
} from "./data";

definePageMeta({
  pageTransition: { name: "admisi-fade", mode: "out-in" },
});

const liveHost = new URL(liveUrl).host;

// Scroll reveals. Nothing is hidden until this runs: the hidden states in CSS
// only apply under `.admisi-motion`, which is added here after mount, and
// never when the visitor prefers reduced motion.
const pageRef = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

function revealAll() {
  pageRef.value
    ?.querySelectorAll("[data-reveal]")
    .forEach((element) => element.classList.add("is-revealed"));
}

onMounted(() => {
  const root = pageRef.value;
  if (!root) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

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
  root.classList.add("admisi-motion");
  window.addEventListener("beforeprint", revealAll);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  window.removeEventListener("beforeprint", revealAll);
});

useHead({
  title: "Admisi UT — SIA Admission Portal | Dimar Hanung",
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
      href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Space+Mono:wght@400;700&display=swap",
    },
  ],
  meta: [
    {
      name: "description",
      content:
        "Admisi UT is the new-student admission portal of Universitas Terbuka. A case study of what Dimar Hanung built: registration, the admission bill, guided onboarding forms and document upload, from sign-up to student number.",
    },
  ],
});
</script>

<style scoped>
.admisi-page {
  --admisi-green: #0d7a4d;
  --admisi-accent: #0d7a4d;
  --admisi-ink: #0e1f17;
  --admisi-muted: #4a5a51;
  --admisi-page: #f3f6f4;
  --admisi-panel: #ffffff;
  --admisi-chrome: #e7efea;
  --admisi-tint: color-mix(in srgb, var(--admisi-green) 8%, var(--admisi-panel));
  --admisi-line: #d3e3d9;
  --admisi-line-strong: color-mix(in srgb, var(--admisi-green) 42%, transparent);
  --admisi-shadow: #0e1f17;
  --admisi-board: #0e1611;
  --admisi-led: #ffb547;
  --admisi-amber-text: #9a5a0a;
  --admisi-button-bg: #0d7a4d;
  --admisi-button-fg: #f4fbf7;
  --admisi-band: #0e1f17;
  --admisi-illo-bg: #e3f1e9;
  --admisi-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --admisi-font-display: "Space Grotesk", "Trebuchet MS", sans-serif;
  --admisi-font-body: "Instrument Sans", "Segoe UI", sans-serif;
  --admisi-font-mono: "Space Mono", "Courier New", monospace;

  min-height: 100vh;
  background:
    radial-gradient(
      ellipse 55% 36rem at 100% 0%,
      color-mix(in srgb, var(--admisi-green) 11%, transparent),
      transparent 58%
    ),
    radial-gradient(
      ellipse 70% 40rem at 0% 6%,
      color-mix(in srgb, var(--admisi-led) 9%, transparent),
      transparent 52%
    ),
    var(--admisi-page);
  color: var(--admisi-ink);
  overflow-x: clip;
}

:global(.dark .admisi-page) {
  --admisi-accent: #6fd3a2;
  --admisi-ink: #e3eee7;
  --admisi-muted: #9db3a6;
  --admisi-page: #0b1510;
  --admisi-panel: #111f18;
  --admisi-chrome: #172a20;
  --admisi-tint: color-mix(in srgb, #6fd3a2 11%, var(--admisi-panel));
  --admisi-line: color-mix(in srgb, #6fd3a2 16%, transparent);
  --admisi-line-strong: color-mix(in srgb, #6fd3a2 42%, transparent);
  --admisi-shadow: #000000;
  --admisi-board: #060c09;
  --admisi-amber-text: #ffc46b;
  --admisi-button-bg: #6fd3a2;
  --admisi-button-fg: #0b1510;
  --admisi-band: #10291d;
}

.admisi-main {
  max-width: 72rem;
  margin-inline: auto;
  padding: 1rem 1.25rem 0;
}

@media (min-width: 768px) {
  .admisi-main {
    padding-inline: 2rem;
  }
}

/* Type scale: h1 clamp 2.75-4.25rem, h2 2.25rem, h3 1.25rem, body 1.0625rem. */
.admisi-kicker {
  font-family: var(--admisi-font-mono);
  font-size: 0.9375rem;
  letter-spacing: 0.06em;
  color: var(--admisi-accent);
}

.admisi-h2 {
  margin-top: 0.4rem;
  font-family: var(--admisi-font-display);
  font-size: clamp(1.85rem, 3.5vw, 2.25rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.03em;
  text-wrap: balance;
  color: var(--admisi-ink);
}

.admisi-h3 {
  font-family: var(--admisi-font-display);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--admisi-ink);
}

.admisi-body {
  font-family: var(--admisi-font-body);
  font-size: 1.0625rem;
  line-height: 1.65;
}

.admisi-muted {
  color: var(--admisi-muted);
}

.admisi-lead {
  max-width: 40rem;
  margin-top: 0.85rem;
  font-family: var(--admisi-font-body);
  font-size: 1.125rem;
  line-height: 1.65;
  color: var(--admisi-muted);
}

.admisi-card {
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid var(--admisi-line);
  background: var(--admisi-panel);
}

/* Hero */
.admisi-hero {
  display: grid;
  gap: 3rem;
  padding-top: 3rem;
}

.admisi-hero__top {
  display: grid;
  gap: 2.5rem;
  align-items: center;
}

@media (min-width: 960px) {
  .admisi-hero__top {
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 22rem);
    gap: 4rem;
  }
}

.admisi-hero__title {
  margin-top: 0.85rem;
  font-family: var(--admisi-font-display);
  font-size: clamp(2.75rem, 6vw, 4.25rem);
  font-weight: 700;
  line-height: 0.98;
  letter-spacing: -0.04em;
  color: var(--admisi-ink);
}

.admisi-hero__title > span {
  display: block;
}

.admisi-hero__sub {
  margin-top: 0.12em;
  font-size: 0.6em;
  color: var(--admisi-accent);
}

.admisi-hero__pitch {
  max-width: 40rem;
  margin-top: 1.5rem;
  font-family: var(--admisi-font-body);
  font-size: clamp(1.125rem, 1.6vw, 1.3rem);
  line-height: 1.6;
  color: var(--admisi-muted);
}

.admisi-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
}

/* Facts as a queue ticket, a static nod to the lobby's ticket dispenser. */
.admisi-ticket {
  justify-self: center;
  width: min(100%, 22rem);
}

.admisi-ticket__paper {
  --tooth: 0.55rem;

  position: relative;
  padding: 1.5rem 1.5rem 1.75rem;
  background: #fdfdfb;
  color: #14261d;
  box-shadow: 0 22px 40px -18px color-mix(in srgb, var(--admisi-shadow) 40%, transparent);
  font-family: var(--admisi-font-mono);
  rotate: 1.5deg;
  /* Torn, toothed bottom edge. */
  mask:
    linear-gradient(#000 0 0) top / 100% calc(100% - var(--tooth)) no-repeat,
    conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) bottom / calc(var(--tooth) * 2) var(--tooth) repeat-x;
}

.admisi-ticket__brand {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-align: center;
  text-transform: uppercase;
}

.admisi-ticket__heading {
  margin-top: 0.15rem;
  padding-bottom: 0.9rem;
  border-bottom: 2px dashed #c9d6ce;
  font-family: var(--admisi-font-mono);
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-align: center;
  color: #5b6d63;
}

.admisi-ticket__facts {
  display: grid;
  gap: 0.75rem;
  padding-block: 1rem;
}

.admisi-ticket__fact dt {
  font-size: 0.8125rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #5b6d63;
}

.admisi-ticket__fact dd {
  margin-top: 0.1rem;
  font-family: var(--admisi-font-display);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.3;
  color: #0e1f17;
}

.admisi-ticket__barcode {
  display: block;
  height: 2.5rem;
  margin-top: 0.25rem;
  border-top: 2px dashed #c9d6ce;
  padding-top: 0.9rem;
  background:
    repeating-linear-gradient(
      90deg,
      #14261d 0 2px,
      transparent 2px 4px,
      #14261d 4px 7px,
      transparent 7px 9px,
      #14261d 9px 10px,
      transparent 10px 13px
    )
    content-box;
}

.admisi-ticket__foot {
  margin-top: 0.6rem;
  font-size: 0.8125rem;
  letter-spacing: 0.06em;
  text-align: center;
  color: #5b6d63;
}

:root.dark .admisi-ticket__paper {
  filter: brightness(0.9);
}

.admisi-hero__visual {
  position: relative;
}

.admisi-hero__visual::before {
  content: "";
  position: absolute;
  inset: 10% -3% 12%;
  z-index: -1;
  border-radius: 2rem;
  background:
    radial-gradient(
      closest-side at 25% 60%,
      color-mix(in srgb, var(--admisi-led) 24%, transparent),
      transparent
    ),
    radial-gradient(
      closest-side at 75% 40%,
      color-mix(in srgb, var(--admisi-green) 22%, transparent),
      transparent
    );
  filter: blur(24px);
}

/* Hero entrance: kicker, title, pitch and buttons rise in, the ticket prints
   out of its slot, then the framed portal rises with a soft glow. `--at` is
   each element's start time. Pure CSS, so it also plays before hydration and
   without JS. */
@media (prefers-reduced-motion: no-preference) {
  .admisi-enter {
    animation: admisi-hero-in 800ms var(--admisi-ease) var(--at, 0ms) both;
  }

  .admisi-ticket {
    animation: admisi-print 1100ms var(--admisi-ease) 650ms both;
  }

  .admisi-hero__visual {
    animation: admisi-visual-in 1200ms var(--admisi-ease) 850ms both;
  }

  .admisi-hero__visual::before {
    animation: admisi-bloom 1800ms var(--admisi-ease) 1200ms both;
  }
}

@media (prefers-reduced-motion: no-preference) and (max-width: 767px) {
  .admisi-hero__visual {
    animation-duration: 900ms;
    animation-delay: 600ms;
  }
}

@keyframes admisi-hero-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
}

@keyframes admisi-print {
  from {
    opacity: 0;
    clip-path: inset(0 0 100% 0);
    transform: translateY(-24px);
  }

  to {
    opacity: 1;
    clip-path: inset(-3rem -3rem -3rem -3rem);
  }
}

@keyframes admisi-visual-in {
  from {
    opacity: 0;
    transform: translateY(48px) scale(0.97);
  }
}

@keyframes admisi-bloom {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
}

/* Sections */
.admisi-section {
  margin-top: 4rem;
}

.admisi-section__head {
  margin-bottom: 2rem;
}

.admisi-section--last {
  margin-bottom: 4rem;
}

@media (min-width: 768px) {
  .admisi-section {
    margin-top: 6rem;
  }

  .admisi-section__head {
    margin-bottom: 2.5rem;
  }

  .admisi-section--last {
    margin-bottom: 6rem;
  }
}

.admisi-checks {
  display: grid;
  gap: 0.6rem;
  margin-top: 1rem;
  font-family: var(--admisi-font-body);
  font-size: 1.0625rem;
  line-height: 1.5;
  color: var(--admisi-ink);
}

.admisi-checks li {
  display: grid;
  grid-template-columns: 1.25rem minmax(0, 1fr);
  gap: 0.6rem;
}

.admisi-checks__icon {
  width: 1.25rem;
  height: 1.25rem;
  margin-top: 0.1rem;
  color: var(--admisi-accent);
}

/* What I did */
.admisi-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.admisi-metric {
  display: flex;
  flex-direction: column-reverse;
  padding: 1.25rem 1.5rem;
  border-radius: 1rem;
  background: var(--admisi-tint);
}

.admisi-metric__value {
  font-family: var(--admisi-font-display);
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--admisi-accent);
}

.admisi-metric__label {
  margin-top: 0.25rem;
  font-family: var(--admisi-font-body);
  font-size: 1rem;
  color: var(--admisi-muted);
}

.admisi-did {
  display: grid;
  gap: 1rem;
}

@media (min-width: 960px) {
  .admisi-did {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr) minmax(0, 1fr);
  }
}

.admisi-did__card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.admisi-did__card .admisi-checks {
  margin-top: 0.25rem;
}

.admisi-did__card--built {
  border-color: var(--admisi-line-strong);
  background: var(--admisi-tint);
}

/* Illustrations sit on a mint panel. The art is green and amber on mint, so
   in dark mode the panel stays mint and the whole figure is dimmed, keeping
   the outlines readable without glare. */
.admisi-illo-panel {
  padding: 0.75rem;
  border-radius: 0.75rem;
  background: var(--admisi-illo-bg);
}

:root.dark .admisi-illo-panel {
  background: #cfe3d6;
  filter: brightness(0.8);
}

.admisi-did__illo {
  --illo-height: 9.5rem;
  width: 100%;
  margin-bottom: 0.25rem;
}

.admisi-did__step {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--admisi-font-mono);
  font-size: 1rem;
  font-weight: 700;
  color: var(--admisi-amber-text);
}

.admisi-did__icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--admisi-accent);
}

/* Key features */
.admisi-features {
  display: grid;
  gap: 3.5rem;
}

.admisi-feature {
  display: grid;
  gap: 1.5rem;
  align-items: center;
}

.admisi-feature__title {
  margin-top: 0.35rem;
  margin-bottom: 0.75rem;
  font-family: var(--admisi-font-display);
  font-size: clamp(1.4rem, 2.4vw, 1.75rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--admisi-ink);
}

@media (min-width: 960px) {
  .admisi-features {
    gap: 5rem;
  }

  .admisi-feature {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: 3.5rem;
  }

  .admisi-feature--flip {
    grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  }

  .admisi-feature--flip .admisi-feature__copy {
    order: 2;
  }
}

/* Admission journey */
.admisi-journey__head {
  display: grid;
  gap: 1.5rem;
}

.admisi-journey__illo {
  --illo-height: 9rem;
}

@media (min-width: 768px) {
  .admisi-journey__head {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: 2.5rem;
  }

  .admisi-journey__illo {
    --illo-height: 11rem;
  }
}

.admisi-paths {
  margin-top: 4rem;
}

.admisi-paths__title {
  font-size: 1.5rem;
}

.admisi-paths__lead {
  margin-top: 0.35rem;
  margin-bottom: 1.5rem;
}

.admisi-paths__grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 640px) {
  .admisi-paths__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1100px) {
  .admisi-paths__grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.admisi-path {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid var(--admisi-line);
  background: var(--admisi-panel);
}

.admisi-path__glyph {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  margin-bottom: 1rem;
  border-radius: 0.75rem;
  background: var(--admisi-tint);
  color: var(--admisi-accent);
}

.admisi-path__icon {
  width: 1.4rem;
  height: 1.4rem;
}

.admisi-path__tag {
  font-family: var(--admisi-font-mono);
  font-size: 0.875rem;
  color: var(--admisi-amber-text);
}

.admisi-path__name {
  margin-top: 0.2rem;
  font-family: var(--admisi-font-display);
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--admisi-ink);
}

.admisi-path__text {
  flex: 1;
  margin-top: 0.5rem;
  font-family: var(--admisi-font-body);
  font-size: 1rem;
  line-height: 1.55;
  color: var(--admisi-muted);
}

.admisi-path__route {
  display: grid;
  grid-template-columns: 1.15rem minmax(0, 1fr);
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--admisi-line-strong);
  font-family: var(--admisi-font-body);
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.45;
  color: var(--admisi-ink);
}

.admisi-path__route-icon {
  width: 1.15rem;
  height: 1.15rem;
  margin-top: 0.1rem;
  color: var(--admisi-accent);
}

/* Tech stack */
.admisi-stack {
  display: grid;
  gap: 1rem;
}

@media (min-width: 768px) {
  .admisi-stack {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.admisi-stack__title {
  margin-bottom: 1rem;
  font-family: var(--admisi-font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--admisi-accent);
}

.admisi-stack__list {
  display: grid;
  gap: 0.6rem;
}

@media (min-width: 1100px) {
  .admisi-stack__list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.admisi-stack__item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--admisi-font-body);
  font-size: 1.0625rem;
  color: var(--admisi-ink);
}

.admisi-stack__logo {
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.6rem;
  border: 1px solid var(--admisi-line);
  background: #ffffff;
  color: var(--admisi-green);
}

.admisi-stack__icon {
  width: 1.35rem;
  height: 1.35rem;
}

/* Buttons */
.admisi-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 2.75rem;
  padding: 0.75rem 1.2rem;
  border-radius: 0.6rem;
  font-family: var(--admisi-font-body);
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 200ms ease-out,
    border-color 200ms ease-out,
    color 200ms ease-out,
    box-shadow 250ms var(--admisi-ease);
}

.admisi-cta--primary:hover,
.admisi-cta--on-ink:hover {
  box-shadow: 0 10px 24px -10px color-mix(in srgb, var(--admisi-shadow) 45%, transparent);
}

.admisi-cta:focus-visible {
  outline: 2px solid var(--admisi-led);
  outline-offset: 2px;
}

.admisi-cta__icon {
  width: 1.1rem;
  height: 1.1rem;
  transition: translate 250ms var(--admisi-ease);
}

.admisi-cta:hover .admisi-cta__icon {
  translate: 2px -2px;
}

.admisi-cta:hover .admisi-cta__icon--back {
  translate: -3px 0;
}

.admisi-cta--primary {
  background: var(--admisi-button-bg);
  color: var(--admisi-button-fg);
}

.admisi-cta--primary:hover {
  background: color-mix(in srgb, var(--admisi-button-bg) 86%, var(--admisi-ink));
}

.admisi-cta--ghost {
  border: 1px solid var(--admisi-line-strong);
  color: var(--admisi-accent);
}

.admisi-cta--ghost:hover {
  border-color: var(--admisi-accent);
  background: var(--admisi-tint);
}

.admisi-cta--on-ink {
  background: #f4fbf7;
  color: #0e1f17;
}

.admisi-cta--on-ink:hover {
  background: color-mix(in srgb, #f4fbf7 85%, #ffb547);
}

.admisi-cta--ghost-on-ink {
  border: 1px solid rgb(238 245 240 / 0.45);
  color: #eef5f0;
}

.admisi-cta--ghost-on-ink:hover {
  border-color: #eef5f0;
  background: rgb(238 245 240 / 0.1);
}

/* Footer band */
.admisi-footer {
  padding-block: 3.5rem;
  background: var(--admisi-band);
  color: #eef5f0;
}

.admisi-footer__inner {
  display: grid;
  gap: 2rem;
  align-items: center;
  max-width: 72rem;
  margin-inline: auto;
  padding-inline: 1.25rem;
}

.admisi-footer__illo {
  --illo-height: 8rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .admisi-footer__illo {
    --illo-height: 9.5rem;
  }
}

.admisi-footer__board {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 1rem;
  font-family: var(--admisi-font-mono);
  font-size: 0.9375rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #ffb547;
}

.admisi-footer__lamps {
  display: inline-flex;
  gap: 0.35rem;
}

.admisi-footer__lamp {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #ffb547;
}

.admisi-footer__title {
  font-family: var(--admisi-font-display);
  font-size: clamp(1.85rem, 4vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #f4fbf7;
}

.admisi-footer__lead {
  max-width: 34rem;
  margin-top: 0.75rem;
  color: rgb(238 245 240 / 0.82);
}

.admisi-footer__hint {
  margin-top: 0.85rem;
  font-family: var(--admisi-font-body);
  font-size: 1rem;
  color: rgb(238 245 240 / 0.72);
}

/* The footer frame always sits on the dark band, so it keeps light chrome. */
.admisi-footer__screen {
  --admisi-line: rgb(255 255 255 / 0.16);
  --admisi-chrome: #e7efea;
  --admisi-page: #ffffff;
  --admisi-muted: #4a5a51;
  --admisi-panel: #ffffff;
}

/* The sign-in screenshot has empty page margins above and below the form. */
.admisi-footer__screen :deep(.screen__img) {
  aspect-ratio: 1440 / 724;
  object-fit: cover;
}

.admisi-footer__credit {
  padding-top: 1.25rem;
  border-top: 1px solid rgb(238 245 240 / 0.18);
  font-family: var(--admisi-font-body);
  font-size: 1rem;
  color: rgb(238 245 240 / 0.72);
}

.admisi-footer__link {
  color: #f4fbf7;
  text-decoration: underline;
  text-decoration-color: rgb(238 245 240 / 0.45);
  text-underline-offset: 0.18em;
  transition: text-decoration-color 200ms ease-out;
}

.admisi-footer__link:hover {
  text-decoration-color: #f4fbf7;
}

.admisi-footer__link:focus-visible {
  outline: 2px solid #ffb547;
  outline-offset: 2px;
  border-radius: 2px;
}

@media (min-width: 768px) {
  .admisi-footer {
    padding-block: 4.5rem;
  }

  .admisi-footer__inner {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
    gap: 2.5rem 4rem;
    padding-inline: 2rem;
  }

  .admisi-footer__credit {
    grid-column: 1 / -1;
  }
}

.admisi-sr-only {
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
/* Shared Admisi motion, unscoped because the reveal targets live in child
   components too. Every hidden state requires `.admisi-motion`, which the page
   only adds after mount when motion is allowed, so SSR, no-JS and
   reduced-motion visitors always see everything. */
@media (prefers-reduced-motion: no-preference) {
  .admisi-motion [data-reveal]:not([data-reveal="group"]):not(.is-revealed),
  .admisi-motion [data-reveal="group"]:not(.is-revealed) > * {
    opacity: 0;
  }

  .admisi-motion [data-reveal="up"].is-revealed {
    animation: admisi-reveal-up 900ms var(--admisi-ease) both;
  }

  .admisi-motion [data-reveal="from-left"] {
    --reveal-x: -48px;
  }

  .admisi-motion [data-reveal="from-right"] {
    --reveal-x: 48px;
  }

  .admisi-motion :is([data-reveal="from-left"], [data-reveal="from-right"]).is-revealed {
    animation: admisi-reveal-side 1000ms var(--admisi-ease) both;
  }

  .admisi-motion [data-reveal="group"].is-revealed > * {
    animation: admisi-reveal-up 850ms var(--admisi-ease) calc(var(--i, 0) * 90ms) both;
  }

  .admisi-fade-enter-active,
  .admisi-fade-leave-active {
    transition:
      opacity 350ms ease,
      transform 350ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .admisi-fade-enter-from {
    opacity: 0;
    transform: translateY(12px);
  }

  .admisi-fade-leave-to {
    opacity: 0;
  }
}

/* Phones: shorter distances, no sideways slides. Only custom properties and
   timings change here, never animation-name, so crossing the breakpoint never
   replays a finished reveal. */
@media (prefers-reduced-motion: no-preference) and (max-width: 959px) {
  .admisi-motion :is([data-reveal="from-left"], [data-reveal="from-right"]) {
    --reveal-x: 0px;
    --reveal-y: 28px;
  }

  .admisi-motion :is([data-reveal="from-left"], [data-reveal="from-right"]).is-revealed {
    animation-duration: 750ms;
  }

  .admisi-motion [data-reveal="group"].is-revealed > * {
    animation-duration: 650ms;
    animation-delay: calc(var(--i, 0) * 50ms);
  }
}

@keyframes admisi-reveal-up {
  from {
    opacity: 0;
    transform: translateY(28px);
  }
}

@keyframes admisi-reveal-side {
  from {
    opacity: 0;
    transform: translate(var(--reveal-x, 0px), var(--reveal-y, 0px));
  }
}

/* Hover lift for cards. Uses `translate`, not `transform`, so it never fights
   the reveal animation. */
.admisi-lift {
  transition:
    translate 300ms cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 300ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color 200ms ease-out,
    background-color 400ms ease,
    color 400ms ease;
}

.admisi-lift:hover {
  border-color: var(--admisi-line-strong);
  box-shadow: 0 18px 36px -18px color-mix(in srgb, var(--admisi-shadow) 35%, transparent);
}

@media (prefers-reduced-motion: no-preference) {
  .admisi-lift:hover {
    translate: 0 -4px;
  }
}

/* Smooth colour change when the colour mode flips. */
/* :where() keeps this at zero specificity so component transitions still win. */
:where(.admisi-page, .admisi-page :is(h1, h2, h3, h4, p, li, dt, dd, .screen__window, .screen__bar)) {
  transition-property: color, background-color, border-color;
  transition-duration: 400ms;
  transition-timing-function: ease;
}
</style>
