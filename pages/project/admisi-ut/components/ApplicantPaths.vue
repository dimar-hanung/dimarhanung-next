<template>
  <section class="paths" aria-labelledby="paths-heading">
    <div class="paths__header">
      <div>
        <h2 id="paths-heading" class="paths-title">
          Not everyone queues the same way
        </h2>
        <p class="paths-intro">
          The lobby adapts to who walks in. Pick an applicant to see how their
          route through the counters changes.
        </p>
      </div>
      <figure class="paths__art">
        <img
          :src="art.src"
          :alt="art.alt"
          class="paths__art-img"
          loading="lazy"
          decoding="async"
        />
      </figure>
    </div>

    <div class="paths__directory">
      <div
        class="paths__tabs"
        role="tablist"
        aria-label="Applicant types"
        @keydown="onTabKeydown"
      >
        <button
          v-for="(path, i) in paths"
          :key="path.name"
          :id="`path-tab-${i}`"
          ref="tabRefs"
          type="button"
          role="tab"
          class="ptab"
          :class="{ 'ptab--active': i === active }"
          :aria-selected="i === active"
          :aria-controls="`path-panel-${i}`"
          :tabindex="i === active ? 0 : -1"
          @click="active = i"
        >
          <span class="ptab__no" aria-hidden="true">{{ path.no }}</span>
          <span class="ptab__name">{{ path.name }}</span>
          <span class="ptab__tag">{{ path.tag }}</span>
        </button>
      </div>

      <div
        v-for="(path, i) in paths"
        :key="path.name"
        v-show="i === active"
        :id="`path-panel-${i}`"
        role="tabpanel"
        :aria-labelledby="`path-tab-${i}`"
        class="paths__panel"
      >
        <img :src="path.icon" alt="" class="paths__icon" />
        <div class="paths__panel-copy">
          <h3 class="paths__panel-title">{{ path.title }}</h3>
          <p class="paths__panel-text">{{ path.text }}</p>
          <p class="paths__route">
            <span class="paths__route-label">Route:</span>
            <span class="paths__route-stops">{{ path.route }}</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { admisiIcons, admisiIllustrations } from "../illustrations";

const art = admisiIllustrations.signUp;

const paths = [
  {
    no: "01",
    name: "Fresh applicant",
    tag: "first degree",
    icon: admisiIcons.user,
    title: "The full lobby, in order",
    text: "Finished school and starting fresh. This applicant visits every counter once: register, clear the admission bill, fill in personal data, pick a study program, upload documents, and leave with a student number.",
    route: "All six counters, first to last",
  },
  {
    no: "02",
    name: "Credit transfer",
    tag: "recognized prior learning",
    icon: admisiIcons.folder,
    title: "Same lobby, one extra counter",
    text: "Brings earlier coursework or work experience and asks the university to count it. An extra evaluation step reviews what can carry over, so the study journey can start closer to the finish line.",
    route: "The six counters, plus a prior-learning evaluation",
  },
  {
    no: "03",
    name: "Teacher track",
    tag: "teacher programs",
    icon: admisiIcons.graduation,
    title: "A short form about the classroom",
    text: "Applicants joining teacher education answer a few extra questions about where and what they teach. The answers shape how the program supports them once the semester begins.",
    route: "The six counters, plus a teaching-context form",
  },
  {
    no: "04",
    name: "Disability support",
    tag: "assisted study",
    icon: admisiIcons.userCheck,
    title: "Tell the lobby what helps",
    text: "An optional form asks what support makes studying workable — materials, exam arrangements, or something else. The university follows up before the term starts, not after.",
    route: "The six counters, plus a support-needs form",
  },
] as const;

const active = ref(0);
const tabRefs = ref<HTMLButtonElement[]>([]);

function onTabKeydown(event: KeyboardEvent) {
  const last = paths.length - 1;
  let next: number | null = null;

  if (event.key === "ArrowRight") next = active.value === last ? 0 : active.value + 1;
  if (event.key === "ArrowLeft") next = active.value === 0 ? last : active.value - 1;
  if (event.key === "Home") next = 0;
  if (event.key === "End") next = last;

  if (next === null) return;
  event.preventDefault();
  active.value = next;
  tabRefs.value[next]?.focus();
}
</script>

<style scoped>
.paths__header {
  display: grid;
  gap: 1.25rem;
  align-items: center;
  margin-bottom: 1.5rem;
}

.paths-title {
  font-family: var(--admisi-font-display);
  font-size: 1.85rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--admisi-ink);
  margin-bottom: 0.75rem;
}

.paths-intro {
  font-family: var(--admisi-font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--admisi-muted);
  max-width: 38rem;
}

.paths__art {
  margin: 0;
  width: min(100%, 15rem);
  justify-self: center;
}

.paths__art-img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 11rem;
  object-fit: contain;
}

.paths__directory {
  border: 1px solid var(--admisi-line);
  border-radius: 0.75rem;
  background: #ffffff;
  overflow: hidden;
}

.paths__tabs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.ptab {
  display: grid;
  gap: 0.2rem;
  justify-items: start;
  padding: 1rem 1.1rem 1.05rem;
  border: 0;
  border-bottom: 1px solid var(--admisi-line);
  background: transparent;
  font-family: var(--admisi-font-body);
  font-size: 1rem;
  text-align: left;
  color: var(--admisi-muted);
  cursor: pointer;
  transition:
    background-color 150ms ease-out,
    color 150ms ease-out,
    box-shadow 150ms ease-out;
}

.ptab:nth-child(odd) {
  border-right: 1px solid var(--admisi-line);
}

.ptab:hover {
  background: color-mix(in srgb, var(--admisi-green) 6%, #ffffff);
}

.ptab:focus-visible {
  outline: 2px solid var(--admisi-ink);
  outline-offset: -2px;
}

.ptab--active {
  background: color-mix(in srgb, var(--admisi-green) 9%, #ffffff);
  color: var(--admisi-ink);
  box-shadow: inset 0 -3px 0 var(--admisi-green);
}

.ptab__no {
  font-family: var(--admisi-font-mono);
  font-size: 1rem;
  color: var(--admisi-green);
}

.ptab__name {
  font-weight: 600;
  color: var(--admisi-ink);
}

.ptab__tag {
  color: var(--admisi-muted);
}

.paths__panel {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 1.1rem;
  align-items: start;
  padding: 1.35rem 1.25rem 1.5rem;
}

.paths__icon {
  width: 2.6rem;
  height: 2.6rem;
  object-fit: contain;
  margin-top: 0.15rem;
}

.paths__panel-title {
  font-family: var(--admisi-font-display);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--admisi-ink);
  margin-bottom: 0.45rem;
}

.paths__panel-text {
  font-family: var(--admisi-font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--admisi-muted);
  max-width: 44rem;
}

.paths__route {
  margin-top: 0.9rem;
  padding-top: 0.75rem;
  border-top: 1px dashed color-mix(in srgb, var(--admisi-green) 35%, transparent);
  font-family: var(--admisi-font-mono);
  font-size: 1rem;
  color: var(--admisi-ink);
}

.paths__route-label {
  color: var(--admisi-green);
  font-weight: 700;
  margin-right: 0.4rem;
}

@media (min-width: 768px) {
  .paths__header {
    grid-template-columns: minmax(0, 1fr) minmax(10rem, 15rem);
    gap: 2rem;
  }

  .paths__art {
    width: 100%;
    justify-self: end;
  }

  .paths__tabs {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .ptab {
    border-right: 1px solid var(--admisi-line);
  }

  .ptab:last-child {
    border-right: 0;
  }

  .paths__panel {
    padding: 1.6rem 1.75rem 1.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ptab {
    transition: none;
  }
}
</style>
