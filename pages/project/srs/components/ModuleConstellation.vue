<template>
  <section aria-labelledby="constellation-heading">
    <div class="constellation-header">
      <div class="constellation-header__copy">
        <h2 id="constellation-heading" class="constellation-display text-3xl">
          Module constellation
        </h2>
        <p class="constellation-body mt-2 text-[var(--srs-muted)]">
          SRS is organized into domains that mirror how university staff work.
          Select a node to explore its role. High level only.
        </p>
      </div>
      <SrsIllustration
        class="constellation-header__art"
        :src="srsIllustrations.modules.src"
        :alt="srsIllustrations.modules.alt"
      />
    </div>

    <div class="constellation-layout">
      <div
        class="constellation-map"
        role="list"
        aria-label="SRS functional domains"
      >
        <button
          v-for="(module, index) in modules"
          :key="module.id"
          type="button"
          role="listitem"
          class="constellation-node"
          :class="[
            `constellation-node--${module.size}`,
            { 'constellation-node--active': activeId === module.id },
          ]"
          :style="gridPlacement(index)"
          :aria-pressed="activeId === module.id"
          @click="activeId = module.id"
        >
          <span class="constellation-node__glyph" aria-hidden="true">
            <Icon :name="module.icon" class="constellation-node__icon" />
          </span>
          <span class="constellation-node__label">{{ module.label }}</span>
        </button>
      </div>

      <div
        v-if="activeModule"
        class="constellation-detail"
        aria-live="polite"
      >
        <p class="constellation-detail__eyebrow">
          {{ activeModule.track }}
        </p>
        <h3 class="constellation-display constellation-detail__title">
          {{ activeModule.label }}
        </h3>
        <p class="constellation-body constellation-detail__text">
          {{ activeModule.description }}
        </p>
        <div class="constellation-detail__tags">
          <span
            v-for="tag in activeModule.tags"
            :key="tag"
            class="constellation-tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SrsIllustration from "./SrsIllustration.vue";
import { srsIllustrations } from "../illustrations";

interface SrsModule {
  id: string;
  label: string;
  track: string;
  icon: string;
  size: "lg" | "md" | "sm";
  description: string;
  tags: string[];
}

const modules: SrsModule[] = [
  {
    id: "undergrad",
    label: "Undergraduate & diploma",
    track: "Academic programs",
    icon: "mdi:book-open-page-variant-outline",
    size: "lg",
    description:
      "Core workflows for bachelor and diploma students: registration, course enrollment, personal data, and academic reporting.",
    tags: ["Registration", "Courses", "Reports"],
  },
  {
    id: "graduate",
    label: "Graduate studies",
    track: "Academic programs",
    icon: "mdi:school-outline",
    size: "md",
    description:
      "Dedicated flows for postgraduate students, with tailored data capture and validation suited to advanced programs.",
    tags: ["Postgraduate", "Validation"],
  },
  {
    id: "ppg",
    label: "Teacher certification",
    track: "Specialized track",
    icon: "mdi:certificate-outline",
    size: "sm",
    description:
      "A focused area for professional teacher education programs and their distinct record-keeping needs.",
    tags: ["PPG", "Professional"],
  },
  {
    id: "scholarship",
    label: "Scholarships",
    track: "Student support",
    icon: "mdi:hand-coin-outline",
    size: "sm",
    description:
      "Tools for managing scholarship-related student information alongside the main academic record.",
    tags: ["Financial aid"],
  },
  {
    id: "graduation",
    label: "Graduation",
    track: "Completion",
    icon: "mdi:trophy-outline",
    size: "md",
    description:
      "Preparation and processing as students approach graduation: clearance steps, ceremonies, and final checks.",
    tags: ["Ceremony", "Clearance"],
  },
  {
    id: "utilities",
    label: "Utilities",
    track: "Operations",
    icon: "mdi:cog-outline",
    size: "md",
    description:
      "Account management, password resets, and operational helpers that keep the platform running smoothly for staff.",
    tags: ["Accounts", "Admin"],
  },
  {
    id: "master",
    label: "Master data",
    track: "Foundation",
    icon: "mdi:database-outline",
    size: "lg",
    description:
      "Reference data and configuration that every other module depends on: programs, calendars, and shared lookups.",
    tags: ["Reference", "Config"],
  },
];

const activeId = ref(modules[0].id);

const activeModule = computed(() =>
  modules.find((m) => m.id === activeId.value),
);

const placements = [
  { gridColumn: "1 / 3", gridRow: "1" },
  { gridColumn: "3", gridRow: "1 / 3" },
  { gridColumn: "1", gridRow: "2" },
  { gridColumn: "2", gridRow: "2" },
  { gridColumn: "1 / 3", gridRow: "3" },
  { gridColumn: "3", gridRow: "3" },
  { gridColumn: "1 / 4", gridRow: "4" },
];

function gridPlacement(index: number) {
  return placements[index] ?? {};
}
</script>

<style scoped>
.constellation-header {
  display: grid;
  gap: 1.25rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.constellation-header__copy {
  min-width: 0;
}

.constellation-header__art {
  width: min(100%, 18rem);
  justify-self: center;
}

@media (min-width: 768px) {
  .constellation-header {
    grid-template-columns: minmax(0, 1.2fr) minmax(12rem, 18rem);
    gap: 2rem;
  }

  .constellation-header__art {
    width: 100%;
    justify-self: end;
  }
}

.constellation-layout {
  display: grid;
  gap: 1.5rem;
}

@media (min-width: 960px) {
  .constellation-layout {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: start;
  }
}

.constellation-map {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
  min-height: 0;
}

@media (max-width: 639px) {
  .constellation-node {
    grid-column: auto !important;
    grid-row: auto !important;
  }
}

@media (min-width: 640px) {
  .constellation-map {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    min-height: 22rem;
  }
}

.constellation-node {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 0.35rem;
  padding: 1rem;
  text-align: left;
  border-radius: 0.85rem;
  border: 1px solid color-mix(in srgb, var(--srs-teal) 18%, transparent);
  background: var(--srs-page);
  color: var(--srs-ink);
  cursor: pointer;
  transition:
    border-color 180ms ease-out,
    background-color 180ms ease-out,
    transform 180ms cubic-bezier(0.22, 1, 0.36, 1);
}

.constellation-node:hover {
  border-color: color-mix(in srgb, var(--srs-copper) 55%, transparent);
  transform: translateY(-2px);
}

.constellation-node:focus-visible {
  outline: 2px solid var(--srs-copper);
  outline-offset: 2px;
}

.constellation-node--active {
  background: color-mix(in srgb, var(--srs-teal) 10%, var(--srs-page));
  border-color: var(--srs-teal);
}

.constellation-node--lg {
  min-height: 5.5rem;
}

.constellation-node--md {
  min-height: 5rem;
}

.constellation-node--sm {
  min-height: 4.75rem;
}

@media (min-width: 640px) {
  .constellation-node--lg {
    min-height: 7.5rem;
  }

  .constellation-node--md {
    min-height: 6.5rem;
  }

  .constellation-node--sm {
    min-height: 5.5rem;
  }
}

.constellation-node__glyph {
  display: grid;
  place-items: center;
  color: var(--srs-copper);
  line-height: 1;
}

.constellation-node__icon {
  width: 1.35rem;
  height: 1.35rem;
}

.constellation-node__label {
  font-family: var(--srs-font-body);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.constellation-detail {
  border: 1px solid color-mix(in srgb, var(--srs-teal) 22%, transparent);
  border-radius: 1.25rem;
  background: var(--srs-panel);
  padding: 1.5rem;
}

.constellation-detail__eyebrow {
  font-size: 1rem;
  color: var(--srs-copper);
  margin-bottom: 0.35rem;
}

.constellation-detail__title {
  font-size: 1.65rem;
  color: var(--srs-ink);
  margin-bottom: 0.75rem;
}

.constellation-detail__text {
  margin-bottom: 1.25rem;
}

.constellation-detail__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.constellation-tag {
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  border: 1px solid color-mix(in srgb, var(--srs-teal) 25%, transparent);
  background: var(--srs-page);
  font-size: 1rem;
  color: var(--srs-teal);
}

.constellation-display {
  font-family: var(--srs-font-display);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.constellation-body {
  font-family: var(--srs-font-body);
  font-size: 1rem;
  line-height: 1.6;
}
</style>
