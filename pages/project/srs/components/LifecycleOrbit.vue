<template>
  <section
    class="orbit-panel"
    aria-labelledby="orbit-heading"
  >
    <div class="orbit-panel__header">
      <div class="orbit-panel__copy">
        <h2 id="orbit-heading" class="orbit-display">
          Student journey orbit
        </h2>
        <p class="orbit-body text-[var(--srs-muted)]">
          Tap a stage to see what SRS supports at each point in the academic
          lifecycle. This is a simplified view, not every workflow or rule.
        </p>
      </div>
      <SrsIllustration
        class="orbit-panel__art"
        variant="flush"
        :src="srsIllustrations.lifecycle.src"
        :alt="srsIllustrations.lifecycle.alt"
      />
    </div>

    <div class="orbit-stage">
      <div
        class="orbit-ring"
        :class="{ 'orbit-ring--reduced': prefersReducedMotion }"
        aria-hidden="true"
      >
        <div
          v-for="(stage, index) in stages"
          :key="stage.id"
          class="orbit-anchor"
          :class="{ 'orbit-anchor--active': activeIndex === index }"
          :style="{ '--orbit-angle': `${(index / stages.length) * 360 - 90}deg` }"
        >
          <span class="orbit-node" />
        </div>
      </div>

      <div class="orbit-core" aria-live="polite">
        <p class="orbit-core__label">Current stage</p>
        <p class="orbit-display orbit-core__title">
          {{ activeStage.title }}
        </p>
        <p class="orbit-body orbit-core__summary">
          {{ activeStage.summary }}
        </p>
        <ul class="orbit-core__list">
          <li
            v-for="item in activeStage.highlights"
            :key="item"
            class="orbit-body"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <div
        class="orbit-controls"
        role="tablist"
        aria-label="Academic lifecycle stages"
      >
        <button
          v-for="(stage, index) in stages"
          :key="stage.id"
          type="button"
          role="tab"
          class="orbit-tab"
          :class="{ 'orbit-tab--active': activeIndex === index }"
          :aria-selected="activeIndex === index"
          :aria-controls="`orbit-panel-${stage.id}`"
          @click="selectStage(index)"
          @keydown.left.prevent="selectStage((activeIndex - 1 + stages.length) % stages.length)"
          @keydown.right.prevent="selectStage((activeIndex + 1) % stages.length)"
        >
          <span class="orbit-tab__index">{{ String(index + 1).padStart(2, "0") }}</span>
          <span class="orbit-tab__title">{{ stage.short }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SrsIllustration from "./SrsIllustration.vue";
import { srsIllustrations } from "../illustrations";

interface LifecycleStage {
  id: string;
  title: string;
  short: string;
  summary: string;
  highlights: string[];
}

const stages: LifecycleStage[] = [
  {
    id: "enroll",
    title: "Enrollment & identity",
    short: "Enroll",
    summary:
      "Staff capture and verify student identity, program choice, and foundational profile data.",
    highlights: [
      "Personal data intake and validation",
      "Program and study-path assignment",
      "Account provisioning for students",
    ],
  },
  {
    id: "register",
    title: "Course registration",
    short: "Register",
    summary:
      "Each term, students and staff coordinate course selection, schedules, and delivery preferences.",
    highlights: [
      "Semester-based course enrollment",
      "Schedule and location coordination",
      "Support for varied study formats",
    ],
  },
  {
    id: "study",
    title: "Active study period",
    short: "Study",
    summary:
      "While studying, records stay current: status changes, academic events, and supporting documents.",
    highlights: [
      "Ongoing profile maintenance",
      "Academic status tracking",
      "Document and report generation",
    ],
  },
  {
    id: "assess",
    title: "Assessment & results",
    short: "Assess",
    summary:
      "Exam registration, score handling, and academic progress checks feed back into the student record.",
    highlights: [
      "Exam scheduling support",
      "Grade and result management",
      "Progress monitoring over terms",
    ],
  },
  {
    id: "graduate",
    title: "Graduation readiness",
    short: "Graduate",
    summary:
      "As students near completion, SRS helps staff prepare graduation steps and final academic clearance.",
    highlights: [
      "Graduation preparation workflows",
      "Final academic verification",
      "Completion and ceremony support",
    ],
  },
];

const activeIndex = ref(0);
const prefersReducedMotion = ref(false);

const activeStage = computed(() => stages[activeIndex.value]);

function selectStage(index: number) {
  activeIndex.value = index;
}

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
});
</script>

<style scoped>
.orbit-panel {
  border: 1px solid color-mix(in srgb, var(--srs-teal) 22%, transparent);
  border-radius: 1.25rem;
  background: var(--srs-panel);
  padding: 1.75rem;
}

.orbit-panel__header {
  display: grid;
  gap: 1rem;
  margin-bottom: 1.75rem;
  align-items: center;
}

.orbit-panel__copy {
  min-width: 0;
}

.orbit-panel__art {
  width: min(100%, 12rem);
  justify-self: center;
}

@media (min-width: 700px) {
  .orbit-panel__header {
    grid-template-columns: minmax(0, 1fr) minmax(8rem, 13rem);
    gap: 1.5rem;
  }

  .orbit-panel__art {
    width: 100%;
    justify-self: end;
  }
}

.orbit-stage {
  display: grid;
  gap: 2rem;
}

@media (min-width: 900px) {
  .orbit-stage {
    grid-template-columns: minmax(0, 1fr) minmax(16rem, 22rem);
    align-items: center;
  }
}

.orbit-ring {
  --orbit-radius: calc(50cqw + 0.5px);
  container-type: inline-size;
  position: relative;
  width: min(20rem, 100%);
  aspect-ratio: 1;
  height: auto;
  margin-inline: auto;
  overflow: visible;
  border-radius: 50%;
  border: 1px dashed color-mix(in srgb, var(--srs-copper) 45%, transparent);
  box-sizing: border-box;
}

.orbit-ring--reduced .orbit-node {
  transition: none;
}

.orbit-anchor {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  transform: rotate(var(--orbit-angle));
}

.orbit-node {
  position: absolute;
  top: 0;
  left: var(--orbit-radius);
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: color-mix(in srgb, var(--srs-copper) 55%, white);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--srs-copper) 22%, transparent);
  transform: translate(-50%, -50%) rotate(calc(-1 * var(--orbit-angle)));
  transition:
    width 200ms ease-out,
    height 200ms ease-out,
    background-color 200ms ease-out;
}

.orbit-anchor--active .orbit-node {
  width: 0.9rem;
  height: 0.9rem;
  background: var(--srs-copper);
}

.orbit-core {
  border-top: 1px solid color-mix(in srgb, var(--srs-teal) 15%, transparent);
  padding-top: 1.5rem;
}

@media (min-width: 900px) {
  .orbit-core {
    border-top: none;
    padding-top: 0;
    border-left: 1px solid color-mix(in srgb, var(--srs-teal) 15%, transparent);
    padding-left: 2rem;
  }
}

.orbit-core__label {
  font-size: 1rem;
  color: var(--srs-muted);
  margin-bottom: 0.35rem;
}

.orbit-core__title {
  font-size: 1.75rem;
  color: var(--srs-ink);
  margin-bottom: 0.75rem;
}

.orbit-core__summary {
  margin-bottom: 1rem;
}

.orbit-core__list {
  display: grid;
  gap: 0.5rem;
  padding-left: 1.1rem;
  color: var(--srs-ink);
}

.orbit-controls {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.orbit-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 0.9rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--srs-teal) 20%, transparent);
  background: var(--srs-page);
  color: var(--srs-ink);
  font-size: 1rem;
  cursor: pointer;
  transition:
    border-color 150ms ease-out,
    background-color 150ms ease-out,
    color 150ms ease-out;
}

.orbit-tab:hover {
  border-color: color-mix(in srgb, var(--srs-copper) 50%, transparent);
}

.orbit-tab:focus-visible {
  outline: 2px solid var(--srs-copper);
  outline-offset: 2px;
}

.orbit-tab--active {
  background: color-mix(in srgb, var(--srs-teal) 12%, var(--srs-page));
  border-color: var(--srs-teal);
  color: var(--srs-teal);
}

.orbit-tab__index {
  font-variant-numeric: tabular-nums;
  color: var(--srs-copper);
  font-weight: 600;
}

.orbit-display {
  font-family: var(--srs-font-display);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.orbit-body {
  font-family: var(--srs-font-body);
  font-size: 1rem;
  line-height: 1.6;
}
</style>
