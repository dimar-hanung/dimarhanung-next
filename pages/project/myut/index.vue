<template>
  <div class="myut-page">
    <t-nav class="relative z-20" />

    <main class="myut-main">
      <header class="myut-hero">
        <div class="myut-hero__copy">
          <p class="myut-kicker">Case study · Student portal</p>
          <h1 class="myut-hero__title">
            MyUT
            <span class="myut-hero__sub">Mahasiswa</span>
          </h1>
          <p class="myut-hero__lead">
            The campus that fits in a browser tab. Students at Universitas
            Terbuka register, pay, track printed modules, sit exams, and keep a
            digital student ID without walking into an office.
          </p>
          <div class="myut-hero__actions">
            <a
              href="https://myut.ut.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              class="myut-cta myut-cta--primary"
            >
              Visit live portal
              <Icon name="mdi:open-in-new" class="myut-cta__icon" aria-hidden="true" />
            </a>
            <NuxtLink to="/project" class="myut-cta myut-cta--ghost">
              Back to projects
            </NuxtLink>
          </div>
        </div>

        <figure class="myut-banner">
          <img
            :src="myutIllustrations.banner.src"
            :alt="myutIllustrations.banner.alt"
            class="myut-banner__img"
            width="1440"
            height="900"
            fetchpriority="high"
            decoding="async"
          />
        </figure>

        <div class="myut-glance" aria-label="Project at a glance">
          <div v-for="item in glance" :key="item.label" class="myut-glance__item">
            <p class="myut-glance__value">{{ item.value }}</p>
            <p class="myut-glance__label">{{ item.label }}</p>
          </div>
        </div>
      </header>

      <section class="myut-overview" aria-labelledby="overview-heading">
        <h2 id="overview-heading" class="myut-section-title">
          What students open MyUT for
        </h2>
        <div class="myut-overview__grid">
          <div class="myut-overview__copy">
            <p class="myut-body myut-overview__text">
              MyUT is the student academic website for Universitas Terbuka,
              Indonesia's open and distance university. It was split from the
              older SIA product so students have one place for the term they are
              in: courses, billing, tutorials, exams, and identity.
            </p>
            <ul class="myut-overview__points">
              <li v-for="point in overviewPoints" :key="point">
                {{ point }}
              </li>
            </ul>
          </div>
          <MyutIllustration
            class="myut-overview__art"
            :src="myutIllustrations.homeStudy.src"
            :alt="myutIllustrations.homeStudy.alt"
          />
        </div>
      </section>

      <SemesterEnvelope class="myut-block" />

      <section class="myut-desk" aria-labelledby="desk-heading">
        <div class="myut-desk__header">
          <div>
            <h2 id="desk-heading" class="myut-section-title">
              A term on one desk
            </h2>
            <p class="myut-body myut-desk__intro">
              Most of the work happens at home, after work, or between shifts.
              The portal is built around that desk, not around a campus map.
            </p>
          </div>
          <MyutIllustration
            class="myut-desk__art"
            variant="flush"
            :src="myutIllustrations.courses.src"
            :alt="myutIllustrations.courses.alt"
          />
        </div>

        <dl class="myut-desk__list">
          <div v-for="row in deskRows" :key="row.title" class="myut-desk__row">
            <dt class="myut-desk__term">
              <img :src="row.icon" alt="" class="myut-desk__icon" />
              {{ row.title }}
            </dt>
            <dd class="myut-body myut-desk__def">{{ row.text }}</dd>
          </div>
        </dl>
      </section>

      <EktmForge class="myut-block" />

      <section class="myut-assistant" aria-labelledby="assistant-heading">
        <MyutIllustration
          class="myut-assistant__art"
          variant="flush"
          :src="myutIllustrations.assistant.src"
          :alt="myutIllustrations.assistant.alt"
        />
        <div>
          <h2 id="assistant-heading" class="myut-section-title">
            A campus desk that answers back
          </h2>
          <p class="myut-body myut-assistant__text">
            MYRA sits inside MyUT as an optional assistant. Students ask how a
            menu works, or open a study mode against a course module. This page
            stays public: no prompts, no private records, no live chat.
          </p>
        </div>
      </section>

      <section class="myut-stack" aria-labelledby="stack-heading">
        <div class="myut-stack__header">
          <div>
            <h2 id="stack-heading" class="myut-section-title">
              Technology stack
            </h2>
            <p class="myut-body myut-stack__intro">
              A Vue student portal with campus SSO, built for long-running
              semester operations rather than a one-off campaign site.
            </p>
          </div>
          <MyutIllustration
            class="myut-stack__art"
            variant="accent"
            :src="myutIllustrations.stack.src"
            :alt="myutIllustrations.stack.alt"
          />
        </div>
        <div class="myut-stack__grid">
          <div
            v-for="group in techStack"
            :key="group.title"
            class="myut-stack__group"
          >
            <h3 class="myut-stack__group-title">{{ group.title }}</h3>
            <p class="myut-stack__list">{{ group.items.join(" · ") }}</p>
          </div>
        </div>
      </section>

      <footer class="myut-footer">
        <div class="myut-footer__inner">
          <div class="myut-footer__copy">
            <h2 class="myut-footer__title">Open the student portal</h2>
            <p class="myut-body myut-footer__lead">
              MyUT is in daily use by Universitas Terbuka students. This page
              stays high-level: no internal workflows or production data.
            </p>
            <div class="myut-footer__actions">
              <a
                href="https://myut.ut.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                class="myut-cta myut-cta--on-navy"
                aria-describedby="myut-live-hint"
              >
                Visit myut.ut.ac.id
                <Icon name="mdi:open-in-new" class="myut-cta__icon" aria-hidden="true" />
                <span class="myut-sr-only">(opens in a new tab)</span>
              </a>
              <NuxtLink to="/project" class="myut-cta myut-cta--ghost-on-navy">
                More projects
              </NuxtLink>
            </div>
            <p id="myut-live-hint" class="myut-footer__hint">
              Student login required. Opens in a new tab.
            </p>
          </div>
          <MyutIllustration
            class="myut-footer__art"
            variant="flush"
            :src="myutIllustrations.reading.src"
            :alt="myutIllustrations.reading.alt"
          />
          <p class="myut-footer__credit">
            Illustrations and icons from
            <a
              href="https://iconscout.com"
              target="_blank"
              rel="noopener noreferrer"
              class="myut-footer__credit-link"
            >IconScout<span class="myut-sr-only"> (opens in a new tab)</span></a>.
            Student time and assistant art by Delesign Graphics.
          </p>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import EktmForge from "./components/EktmForge.vue";
import MyutIllustration from "./components/MyutIllustration.vue";
import SemesterEnvelope from "./components/SemesterEnvelope.vue";
import { myutIcons, myutIllustrations } from "./illustrations";

useHead({
  title: "MyUT Mahasiswa | Dimar Hanung",
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
      href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,600;1,7..72,400&display=swap",
    },
  ],
  meta: [
    {
      name: "description",
      content:
        "MyUT is the student academic portal for Universitas Terbuka. A case study of the distance-learning desk: registration, billing, printed modules, exams, and a digital student ID.",
    },
  ],
});

const glance = [
  { value: "Student", label: "Portal, not staff records" },
  { value: "Anywhere", label: "Home, work, regional office" },
  { value: "Vue 2.7", label: "Long-term student frontend" },
  { value: "SSO", label: "Campus login across tools" },
];

const overviewPoints = [
  "Dashboard after campus SSO, with the current term in view",
  "Course registration and billing status in one student account",
  "Tracking for printed modules mailed to a home address",
  "Exam pass, grades, digital student ID, and an optional assistant",
];

const deskRows = [
  {
    icon: myutIcons.calendar,
    title: "Register the term",
    text: "Pick or confirm courses, then lock an address for printed modules.",
  },
  {
    icon: myutIcons.wallet,
    title: "Clear the bill",
    text: "See whether the term bill is still open before tutorials and exams start.",
  },
  {
    icon: myutIcons.package,
    title: "Wait on the parcel",
    text: "Printed learning materials still travel by courier. The portal shows progress.",
  },
  {
    icon: myutIcons.book,
    title: "Study from the desk",
    text: "Online tutorials and the digital library sit one login away from MyUT.",
  },
  {
    icon: myutIcons.exam,
    title: "Sit the exam",
    text: "Show an exam pass, then come back for the grade list and academic recap.",
  },
];

const techStack = [
  {
    title: "Frontend",
    items: ["Vue.js 2.7 LTS", "Vuex", "Tailwind CSS", "Progressive Web App"],
  },
  {
    title: "Access",
    items: ["Azure MSAL", "Campus SSO", "Vue Router", "Axios"],
  },
  {
    title: "Product surface",
    items: ["Student dashboard", "Billing status", "e-KTM", "In-portal assistant"],
  },
];
</script>

<style scoped>
.myut-page {
  --myut-navy: #1b4b73;
  --myut-vermillion: #d24b22;
  --myut-amber: #e8a317;
  --myut-ink: #1c1710;
  --myut-muted: #5e5648;
  --myut-kraft: #efe3cc;
  --myut-letter: #fff8ec;
  --myut-font-display: "Bricolage Grotesque", "Trebuchet MS", sans-serif;
  --myut-font-body: "Literata", "Iowan Old Style", Georgia, serif;

  min-height: 100vh;
  background:
    radial-gradient(
      ellipse 55% 40% at 100% 0%,
      color-mix(in srgb, var(--myut-amber) 16%, transparent),
      transparent 58%
    ),
    radial-gradient(
      ellipse 70% 45% at 0% 8%,
      color-mix(in srgb, var(--myut-navy) 10%, transparent),
      transparent 52%
    ),
    var(--myut-kraft);
  color: var(--myut-ink);
  overflow-x: clip;
}

.myut-main {
  max-width: 66rem;
  margin-inline: auto;
  padding: 2rem 1.25rem 0;
}

.myut-hero {
  display: grid;
  gap: 1.75rem;
  padding-block: 2rem 3rem;
}

.myut-hero__copy {
  min-width: 0;
  max-width: 40rem;
}

.myut-kicker {
  font-family: var(--myut-font-body);
  font-size: 1rem;
  color: var(--myut-vermillion);
  margin-bottom: 0.75rem;
}

.myut-hero__title {
  font-family: var(--myut-font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: -0.04em;
  color: var(--myut-ink);
}

.myut-hero__sub {
  display: block;
  color: var(--myut-navy);
  font-size: 0.62em;
  margin-top: 0.12em;
}

.myut-hero__lead {
  font-family: var(--myut-font-body);
  font-size: 1.125rem;
  line-height: 1.65;
  color: var(--myut-muted);
  margin-top: 1.25rem;
  max-width: 36rem;
}

.myut-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.75rem;
}

.myut-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  min-height: 2.75rem;
  padding: 0.75rem 1.15rem;
  border-radius: 0.4rem;
  font-family: var(--myut-font-body);
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition:
    background-color 150ms ease-out,
    border-color 150ms ease-out,
    color 150ms ease-out,
    transform 120ms ease-out;
}

.myut-cta--primary {
  background: var(--myut-vermillion);
  color: #fff8ec;
}

.myut-cta--primary:hover {
  background: color-mix(in srgb, var(--myut-vermillion) 88%, black);
}

.myut-cta--ghost {
  border: 1px solid color-mix(in srgb, var(--myut-navy) 32%, transparent);
  color: var(--myut-navy);
  background: transparent;
}

.myut-cta--ghost:hover {
  border-color: var(--myut-navy);
  background: color-mix(in srgb, var(--myut-navy) 8%, transparent);
}

.myut-cta:focus-visible {
  outline: 2px solid var(--myut-amber);
  outline-offset: 2px;
}

.myut-cta:active {
  transform: scale(0.97);
}

.myut-cta__icon {
  width: 1.1rem;
  height: 1.1rem;
}

.myut-banner {
  margin: 0;
  min-width: 0;
  border-radius: 0.45rem;
  border: 1px solid color-mix(in srgb, var(--myut-navy) 20%, transparent);
  background: #dce7ef;
  overflow: hidden;
  box-shadow: 0 18px 40px color-mix(in srgb, var(--myut-ink) 12%, transparent);
}

.myut-banner__img {
  display: block;
  width: 100%;
  height: auto;
  max-height: min(26rem, 72vw);
  object-fit: cover;
  object-position: left center;
}

.myut-glance {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem 1.5rem;
  padding-top: 0.25rem;
}

.myut-glance__item {
  padding-block: 0.35rem;
  border-top: 2px solid color-mix(in srgb, var(--myut-navy) 18%, transparent);
}

.myut-glance__value {
  font-family: var(--myut-font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--myut-navy);
}

.myut-glance__label {
  font-family: var(--myut-font-body);
  font-size: 1rem;
  color: var(--myut-muted);
  margin-top: 0.2rem;
}

.myut-section-title {
  font-family: var(--myut-font-display);
  font-size: 1.85rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--myut-ink);
  margin-bottom: 1.25rem;
}

.myut-overview {
  margin-bottom: 3rem;
}

.myut-overview__grid {
  display: grid;
  gap: 1.5rem;
  align-items: center;
}

.myut-overview__copy {
  display: grid;
  gap: 1.25rem;
  min-width: 0;
}

.myut-overview__text {
  color: var(--myut-muted);
}

.myut-overview__points {
  display: grid;
  gap: 0.65rem;
  padding: 0;
  list-style: none;
  font-family: var(--myut-font-body);
  font-size: 1rem;
  line-height: 1.55;
}

.myut-overview__points li {
  padding-top: 0.55rem;
  border-top: 1px dashed color-mix(in srgb, var(--myut-navy) 22%, transparent);
}

.myut-overview__art {
  width: min(100%, 22rem);
  justify-self: center;
}

.myut-block {
  margin-bottom: 3rem;
}

.myut-desk {
  margin-bottom: 3rem;
}

.myut-desk__header {
  display: grid;
  gap: 1.25rem;
  margin-bottom: 1.35rem;
  align-items: center;
}

.myut-desk__intro {
  color: var(--myut-muted);
  max-width: 38rem;
}

.myut-desk__art {
  width: min(100%, 16rem);
  justify-self: center;
}

.myut-desk__list {
  display: grid;
  gap: 0;
  border-top: 1px solid color-mix(in srgb, var(--myut-navy) 16%, transparent);
}

.myut-desk__row {
  display: grid;
  gap: 0.35rem;
  padding: 1rem 0;
  border-bottom: 1px solid color-mix(in srgb, var(--myut-navy) 16%, transparent);
}

.myut-desk__term {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-family: var(--myut-font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--myut-navy);
}

.myut-desk__icon {
  width: 1.35rem;
  height: 1.35rem;
  object-fit: contain;
}

.myut-desk__def {
  color: var(--myut-muted);
  padding-left: 2rem;
}

.myut-assistant {
  display: grid;
  gap: 1.25rem;
  align-items: center;
  margin-bottom: 3rem;
  padding: 1.25rem 0;
}

.myut-assistant__art {
  width: min(100%, 16rem);
  justify-self: center;
}

.myut-assistant__text {
  color: var(--myut-muted);
  max-width: 38rem;
}

.myut-stack {
  margin-bottom: 2rem;
}

.myut-stack__header {
  display: grid;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.myut-stack__intro {
  color: var(--myut-muted);
  max-width: 38rem;
}

.myut-stack__art {
  width: min(100%, 16rem);
  justify-self: center;
}

.myut-stack__grid {
  display: grid;
  gap: 0;
  border-top: 1px solid color-mix(in srgb, var(--myut-navy) 16%, transparent);
}

.myut-stack__group {
  padding: 1rem 0;
  border-bottom: 1px solid color-mix(in srgb, var(--myut-navy) 16%, transparent);
}

.myut-stack__group-title {
  font-family: var(--myut-font-display);
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--myut-vermillion);
  margin-bottom: 0.65rem;
}

.myut-stack__list {
  display: grid;
  gap: 0.4rem;
  font-family: var(--myut-font-body);
  font-size: 1rem;
  color: var(--myut-ink);
}

.myut-footer {
  width: 100vw;
  margin-top: 2.75rem;
  margin-left: calc(50% - 50vw);
  padding: 2.5rem 0 2.75rem;
  background: var(--myut-navy);
  color: #f7f1e4;
}

.myut-footer__inner {
  max-width: 66rem;
  margin-inline: auto;
  padding-inline: 1.25rem;
  display: grid;
  gap: 1.25rem;
  align-items: center;
}

.myut-footer__title {
  font-family: var(--myut-font-display);
  font-size: clamp(1.85rem, 4vw, 2.35rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  text-wrap: balance;
  color: #fff8ec;
  margin-bottom: 0.7rem;
}

.myut-footer__lead {
  max-width: 36rem;
  color: color-mix(in srgb, #f7f1e4 82%, var(--myut-navy));
}

.myut-footer__actions {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;
  margin-top: 1.35rem;
}

.myut-cta--on-navy {
  background: #fff8ec;
  color: var(--myut-navy);
}

.myut-cta--on-navy:hover {
  background: color-mix(in srgb, #fff8ec 88%, var(--myut-amber));
}

.myut-cta--ghost-on-navy {
  border: 1px solid color-mix(in srgb, #f7f1e4 45%, transparent);
  color: #f7f1e4;
  background: transparent;
}

.myut-cta--ghost-on-navy:hover {
  border-color: #f7f1e4;
  background: color-mix(in srgb, #f7f1e4 10%, transparent);
}

.myut-footer__hint {
  font-family: var(--myut-font-body);
  font-size: 1rem;
  color: color-mix(in srgb, #f7f1e4 72%, var(--myut-navy));
  margin-top: 0.85rem;
}

.myut-footer__art {
  width: min(100%, 16rem);
  justify-self: center;
  order: 3;
}

.myut-footer__art :deep(.myut-illus__img) {
  max-height: 16rem;
  filter: saturate(0.85);
}

.myut-footer__credit {
  font-family: var(--myut-font-body);
  font-size: 1rem;
  color: color-mix(in srgb, #f7f1e4 68%, var(--myut-navy));
  padding-top: 0.25rem;
  order: 4;
}

.myut-footer__credit-link {
  color: #fff8ec;
  text-underline-offset: 0.18em;
}

.myut-footer__credit-link:hover {
  color: color-mix(in srgb, #fff8ec 80%, var(--myut-amber));
}

.myut-footer__credit-link:focus-visible {
  outline: 2px solid var(--myut-amber);
  outline-offset: 3px;
  border-radius: 0.2rem;
}

.myut-sr-only {
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

.myut-body {
  font-family: var(--myut-font-body);
  font-size: 1rem;
  line-height: 1.6;
}

@media (min-width: 768px) {
  .myut-main {
    padding-inline: 2rem;
  }

  .myut-overview__grid {
    grid-template-columns: minmax(0, 1.15fr) minmax(12rem, 0.85fr);
    gap: 2.5rem;
  }

  .myut-overview__art {
    width: 100%;
    justify-self: stretch;
  }

  .myut-desk__header,
  .myut-stack__header {
    grid-template-columns: minmax(0, 1fr) minmax(10rem, 16rem);
    gap: 2rem;
  }

  .myut-desk__art,
  .myut-stack__art {
    width: 100%;
    justify-self: end;
  }

  .myut-desk__row {
    grid-template-columns: minmax(12rem, 16rem) minmax(0, 1fr);
    align-items: baseline;
    gap: 1rem;
  }

  .myut-desk__def {
    padding-left: 0;
  }

  .myut-assistant {
    grid-template-columns: minmax(10rem, 16rem) minmax(0, 1fr);
    gap: 2rem;
  }

  .myut-assistant__art {
    width: 100%;
    justify-self: start;
  }

  .myut-stack__grid {
    grid-template-columns: minmax(10rem, 14rem) minmax(0, 1fr);
  }

  .myut-stack__group {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 1 / -1;
    align-items: baseline;
    gap: 1rem;
  }

  .myut-glance {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .myut-banner__img {
    max-height: 28rem;
  }

  .myut-footer {
    padding: 3rem 0 3.25rem;
  }

  .myut-footer__inner {
    padding-inline: 2rem;
    grid-template-columns: minmax(0, 1fr) minmax(14rem, 20rem);
    grid-template-rows: auto auto;
    gap: 1.5rem 2.5rem;
  }

  .myut-footer__copy {
    grid-column: 1;
    grid-row: 1;
  }

  .myut-footer__art {
    width: 100%;
    justify-self: end;
    order: unset;
    grid-column: 2;
    grid-row: 1 / span 2;
    align-self: center;
  }

  .myut-footer__art :deep(.myut-illus__img) {
    max-height: 20rem;
  }

  .myut-footer__actions {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
  }

  .myut-footer__credit {
    grid-column: 1;
    grid-row: 2;
    order: unset;
    padding-top: 1.15rem;
    border-top: 1px solid color-mix(in srgb, #f7f1e4 18%, transparent);
  }
}

@media (prefers-reduced-motion: reduce) {
  .myut-cta:active {
    transform: none;
  }
}
</style>
