<template>
  <div class="admisi-page">
    <t-nav class="relative z-20" />

    <main class="admisi-main">
      <header class="admisi-hero">
        <div class="admisi-hero__copy">
          <p class="admisi-kicker">Case study · New-student admission</p>
          <h1 class="admisi-hero__title">
            Admisi UT
            <span class="admisi-hero__sub">SIA Admission Portal</span>
          </h1>
          <p class="admisi-hero__lead">
            The front door of Universitas Terbuka. New students register, clear
            the admission bill, pick a study program, and upload their
            documents — all before their first semester begins.
          </p>
          <div class="admisi-hero__actions">
            <a
              href="https://admisi-sia.ut.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              class="admisi-cta admisi-cta--primary"
            >
              Visit live portal
              <Icon name="mdi:open-in-new" class="admisi-cta__icon" aria-hidden="true" />
            </a>
            <NuxtLink to="/project" class="admisi-cta admisi-cta--ghost">
              Back to projects
            </NuxtLink>
          </div>
        </div>

        <figure class="admisi-banner">
          <img
            :src="admisiIllustrations.banner.src"
            :alt="admisiIllustrations.banner.alt"
            class="admisi-banner__img"
            width="1440"
            height="900"
            fetchpriority="high"
            decoding="async"
          />
        </figure>

        <div class="admisi-glance" aria-label="Project at a glance">
          <div v-for="item in glance" :key="item.label" class="admisi-glance__item">
            <p class="admisi-glance__value">{{ item.value }}</p>
            <p class="admisi-glance__label">{{ item.label }}</p>
          </div>
        </div>
      </header>

      <section class="admisi-overview" aria-labelledby="overview-heading">
        <h2 id="overview-heading" class="admisi-section-title">
          What Admisi UT does
        </h2>
        <div class="admisi-overview__grid">
          <div class="admisi-overview__copy">
            <p class="admisi-body admisi-overview__text">
              Admisi UT is the admission portal of Universitas Terbuka,
              Indonesia's open and distance university. It owns the journey
              before someone becomes a student — the part where an applicant
              walks in with documents and walks out with a student number. It
              shares a campus login with the student portal, but it is its own
              product with its own queue.
            </p>
            <ul class="admisi-overview__points">
              <li v-for="point in overviewPoints" :key="point">
                {{ point }}
              </li>
            </ul>
          </div>
          <AdmisiIllustration
            class="admisi-overview__art"
            :src="admisiIllustrations.gate.src"
            :alt="admisiIllustrations.gate.alt"
          />
        </div>
      </section>

      <QueueHall class="admisi-block" />

      <ApplicantPaths class="admisi-block" />

      <section class="admisi-stack" aria-labelledby="stack-heading">
        <div class="admisi-stack__header">
          <div>
            <h2 id="stack-heading" class="admisi-section-title">
              Technology stack
            </h2>
            <p class="admisi-body admisi-stack__intro">
              A Vue admission portal built for long admission seasons: many
              applicants, one steady flow from registration to enrollment.
            </p>
          </div>
          <AdmisiIllustration
            class="admisi-stack__art"
            variant="accent"
            :src="admisiIllustrations.process.src"
            :alt="admisiIllustrations.process.alt"
          />
        </div>
        <div class="admisi-stack__grid">
          <div
            v-for="group in techStack"
            :key="group.title"
            class="admisi-stack__group"
          >
            <h3 class="admisi-stack__group-title">{{ group.title }}</h3>
            <p class="admisi-stack__list">{{ group.items.join(" · ") }}</p>
          </div>
        </div>
      </section>

      <footer class="admisi-footer">
        <div class="admisi-footer__inner">
          <p class="admisi-footer__board" aria-hidden="true">
            <span class="admisi-footer__lamps">
              <span v-for="n in 6" :key="n" class="admisi-footer__lamp"></span>
            </span>
            ADMISI UT · ADMISSION LOBBY
          </p>
          <h2 class="admisi-footer__title">Start at the front door</h2>
          <p class="admisi-body admisi-footer__lead">
            Admisi UT is live and welcoming new students every admission
            season. This page stays high-level: no internal workflows, no
            applicant data.
          </p>
          <div class="admisi-footer__actions">
            <a
              href="https://admisi-sia.ut.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              class="admisi-cta admisi-cta--on-ink"
              aria-describedby="admisi-live-hint"
            >
              Visit admisi-sia.ut.ac.id
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
          <p class="admisi-footer__credit">
            Illustrations and icons from
            <a
              href="https://iconscout.com"
              target="_blank"
              rel="noopener noreferrer"
              class="admisi-footer__credit-link"
            >IconScout<span class="admisi-sr-only"> (opens in a new tab)</span></a>.
            Sign-up art by Twin Rizki. Receipt icon by Phosphor Icons.
          </p>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import AdmisiIllustration from "./components/AdmisiIllustration.vue";
import ApplicantPaths from "./components/ApplicantPaths.vue";
import QueueHall from "./components/QueueHall.vue";
import { admisiIllustrations } from "./illustrations";

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
        "Admisi UT is the new-student admission portal of Universitas Terbuka. A case study of the admission lobby: registration, admission billing, study-program choice, and document upload before the first semester.",
    },
  ],
});

const glance = [
  { value: "Admission", label: "New-student onboarding portal" },
  { value: "6 counters", label: "Register to student number" },
  { value: "Vue 2.7", label: "Long-term applicant frontend" },
  { value: "PWA", label: "Works on any applicant's phone" },
];

const overviewPoints = [
  "Account registration with email verification for new applicants",
  "An admission invoice with a clear payment status before onboarding continues",
  "Guided forms for personal data, contact details, and study-program choice",
  "Document upload and review, including credit-transfer files",
  "A finish line that issues a student number and opens the student portal",
];

const techStack = [
  {
    title: "Frontend",
    items: ["Vue.js 2.7 LTS", "Vuex", "Tailwind CSS", "SASS"],
  },
  {
    title: "Platform",
    items: ["Progressive Web App", "Vue Router", "Axios", "Sentry"],
  },
  {
    title: "Product surface",
    items: [
      "Applicant registration",
      "Admission billing",
      "Onboarding forms",
      "Document upload",
    ],
  },
];
</script>

<style scoped>
.admisi-page {
  --admisi-green: #0d7a4d;
  --admisi-ink: #0e1f17;
  --admisi-muted: #4a5a51;
  --admisi-line: #cfe0d6;
  --admisi-paper: #f3f6f4;
  --admisi-font-display: "Space Grotesk", "Trebuchet MS", sans-serif;
  --admisi-font-body: "Instrument Sans", "Segoe UI", sans-serif;
  --admisi-font-mono: "Space Mono", "Courier New", monospace;

  min-height: 100vh;
  background:
    radial-gradient(
      ellipse 55% 40% at 100% 0%,
      color-mix(in srgb, var(--admisi-green) 10%, transparent),
      transparent 58%
    ),
    radial-gradient(
      ellipse 70% 45% at 0% 8%,
      color-mix(in srgb, var(--admisi-green) 6%, transparent),
      transparent 52%
    ),
    var(--admisi-paper);
  color: var(--admisi-ink);
  overflow-x: clip;
}

.admisi-main {
  max-width: 66rem;
  margin-inline: auto;
  padding: 2rem 1.25rem 0;
}

.admisi-hero {
  display: grid;
  gap: 1.75rem;
  padding-block: 2rem 3rem;
}

.admisi-hero__copy {
  min-width: 0;
  max-width: 40rem;
}

.admisi-kicker {
  font-family: var(--admisi-font-mono);
  font-size: 1rem;
  letter-spacing: 0.08em;
  color: var(--admisi-green);
  margin-bottom: 0.75rem;
}

.admisi-hero__title {
  font-family: var(--admisi-font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: var(--admisi-ink);
}

.admisi-hero__sub {
  display: block;
  color: var(--admisi-green);
  font-size: 0.62em;
  margin-top: 0.12em;
}

.admisi-hero__lead {
  font-family: var(--admisi-font-body);
  font-size: 1.125rem;
  line-height: 1.65;
  color: var(--admisi-muted);
  margin-top: 1.25rem;
  max-width: 36rem;
}

.admisi-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
}

.admisi-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 2.75rem;
  padding: 0.75rem 1.15rem;
  border-radius: 0.5rem;
  font-family: var(--admisi-font-body);
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 150ms ease-out,
    border-color 150ms ease-out,
    color 150ms ease-out,
    transform 120ms ease-out;
}

.admisi-cta--primary {
  background: var(--admisi-green);
  color: #f4fbf7;
}

.admisi-cta--primary:hover {
  background: color-mix(in srgb, var(--admisi-green) 86%, black);
}

.admisi-cta--ghost {
  border: 1px solid color-mix(in srgb, var(--admisi-green) 34%, transparent);
  color: var(--admisi-green);
  background: transparent;
}

.admisi-cta--ghost:hover {
  border-color: var(--admisi-green);
  background: color-mix(in srgb, var(--admisi-green) 8%, transparent);
}

.admisi-cta:focus-visible {
  outline: 2px solid var(--admisi-ink);
  outline-offset: 2px;
}

.admisi-cta:active {
  transform: scale(0.97);
}

.admisi-cta__icon {
  width: 1.1rem;
  height: 1.1rem;
}

.admisi-banner {
  margin: 0;
  min-width: 0;
  border-radius: 0.75rem;
  border: 1px solid var(--admisi-line);
  background: #e4efe9;
  overflow: hidden;
  box-shadow: 0 18px 40px color-mix(in srgb, var(--admisi-ink) 10%, transparent);
}

.admisi-banner__img {
  display: block;
  width: 100%;
  height: auto;
  max-height: min(26rem, 72vw);
  object-fit: cover;
  object-position: left center;
}

.admisi-glance {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem 1.5rem;
  padding-top: 0.25rem;
}

.admisi-glance__item {
  padding-block: 0.35rem;
  border-top: 2px solid color-mix(in srgb, var(--admisi-green) 20%, transparent);
}

.admisi-glance__value {
  font-family: var(--admisi-font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--admisi-green);
}

.admisi-glance__label {
  font-family: var(--admisi-font-body);
  font-size: 1rem;
  color: var(--admisi-muted);
  margin-top: 0.2rem;
}

.admisi-section-title {
  font-family: var(--admisi-font-display);
  font-size: 1.85rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--admisi-ink);
  margin-bottom: 1.25rem;
}

.admisi-overview {
  margin-bottom: 3rem;
}

.admisi-overview__grid {
  display: grid;
  gap: 1.5rem;
  align-items: center;
}

.admisi-overview__copy {
  display: grid;
  gap: 1.25rem;
  min-width: 0;
}

.admisi-overview__text {
  color: var(--admisi-muted);
}

.admisi-overview__points {
  display: grid;
  gap: 0.65rem;
  padding: 0;
  list-style: none;
  font-family: var(--admisi-font-body);
  font-size: 1rem;
  line-height: 1.55;
}

.admisi-overview__points li {
  padding-top: 0.55rem;
  border-top: 1px dashed color-mix(in srgb, var(--admisi-green) 26%, transparent);
}

.admisi-overview__art {
  width: min(100%, 22rem);
  justify-self: center;
}

.admisi-block {
  margin-bottom: 3rem;
}

.admisi-stack {
  margin-bottom: 2rem;
}

.admisi-stack__header {
  display: grid;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.admisi-stack__intro {
  color: var(--admisi-muted);
  max-width: 38rem;
}

.admisi-stack__art {
  width: min(100%, 16rem);
  justify-self: center;
}

.admisi-stack__grid {
  display: grid;
  gap: 0;
  border-top: 1px solid var(--admisi-line);
}

.admisi-stack__group {
  padding: 1rem 0;
  border-bottom: 1px solid var(--admisi-line);
}

.admisi-stack__group-title {
  font-family: var(--admisi-font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--admisi-green);
  margin-bottom: 0.65rem;
}

.admisi-stack__list {
  display: grid;
  gap: 0.4rem;
  font-family: var(--admisi-font-body);
  font-size: 1rem;
  color: var(--admisi-ink);
}

.admisi-footer {
  width: 100vw;
  margin-top: 2.75rem;
  margin-left: calc(50% - 50vw);
  padding: 2.75rem 0 2.5rem;
  background: var(--admisi-ink);
  color: #eef5f0;
}

.admisi-footer__inner {
  max-width: 66rem;
  margin-inline: auto;
  padding-inline: 1.25rem;
}

.admisi-footer__board {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-family: var(--admisi-font-mono);
  font-size: 1rem;
  letter-spacing: 0.18em;
  color: color-mix(in srgb, #ffb547 82%, transparent);
  margin-bottom: 1.4rem;
}

.admisi-footer__lamps {
  display: inline-flex;
  gap: 0.35rem;
}

.admisi-footer__lamp {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background: color-mix(in srgb, #ffb547 82%, transparent);
}

.admisi-footer__title {
  font-family: var(--admisi-font-display);
  font-size: clamp(1.85rem, 4vw, 2.35rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  text-wrap: balance;
  color: #f4fbf7;
  margin-bottom: 0.7rem;
}

.admisi-footer__lead {
  max-width: 36rem;
  color: color-mix(in srgb, #eef5f0 82%, var(--admisi-ink));
}

.admisi-footer__actions {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;
  margin-top: 1.35rem;
}

.admisi-cta--on-ink {
  background: #f4fbf7;
  color: var(--admisi-ink);
}

.admisi-cta--on-ink:hover {
  background: color-mix(in srgb, #f4fbf7 86%, var(--admisi-green));
}

.admisi-cta--ghost-on-ink {
  border: 1px solid color-mix(in srgb, #eef5f0 45%, transparent);
  color: #eef5f0;
  background: transparent;
}

.admisi-cta--ghost-on-ink:hover {
  border-color: #eef5f0;
  background: color-mix(in srgb, #eef5f0 10%, transparent);
}

.admisi-footer__hint {
  font-family: var(--admisi-font-body);
  font-size: 1rem;
  color: color-mix(in srgb, #eef5f0 72%, var(--admisi-ink));
  margin-top: 0.85rem;
}

.admisi-footer__credit {
  font-family: var(--admisi-font-body);
  font-size: 1rem;
  color: color-mix(in srgb, #eef5f0 68%, var(--admisi-ink));
  margin-top: 2rem;
  padding-top: 1.15rem;
  border-top: 1px solid color-mix(in srgb, #eef5f0 18%, transparent);
}

.admisi-footer__credit-link {
  color: #f4fbf7;
  text-underline-offset: 0.18em;
}

.admisi-footer__credit-link:hover {
  color: color-mix(in srgb, #f4fbf7 80%, var(--admisi-green));
}

.admisi-footer__credit-link:focus-visible {
  outline: 2px solid #f4fbf7;
  outline-offset: 3px;
  border-radius: 0.2rem;
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

.admisi-body {
  font-family: var(--admisi-font-body);
  font-size: 1rem;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .admisi-main {
    padding-inline: 2rem;
  }

  .admisi-overview__grid {
    grid-template-columns: minmax(0, 1.15fr) minmax(12rem, 0.85fr);
    gap: 2.5rem;
  }

  .admisi-overview__art {
    width: 100%;
    justify-self: stretch;
  }

  .admisi-stack__header {
    grid-template-columns: minmax(0, 1fr) minmax(10rem, 16rem);
    gap: 2rem;
  }

  .admisi-stack__art {
    width: 100%;
    justify-self: end;
  }

  .admisi-stack__grid {
    grid-template-columns: minmax(10rem, 14rem) minmax(0, 1fr);
  }

  .admisi-stack__group {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
    align-items: baseline;
    gap: 1rem;
  }

  .admisi-glance {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .admisi-banner__img {
    max-height: 28rem;
  }

  .admisi-footer {
    padding: 3rem 0 3rem;
  }

  .admisi-footer__inner {
    padding-inline: 2rem;
  }

  .admisi-footer__actions {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .admisi-cta:active {
    transform: none;
  }
}
</style>
