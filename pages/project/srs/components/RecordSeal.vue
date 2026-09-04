<template>
  <section
    class="seal-panel"
    aria-labelledby="seal-heading"
  >
    <div class="seal-panel__intro">
      <div class="seal-panel__copy">
        <h2 id="seal-heading" class="seal-display text-3xl">
          Record seal simulator
        </h2>
        <p class="seal-body mt-2 text-[var(--srs-muted)]">
          Build a sample student record card, then press the seal to mark it as
          verified. This is a visual demo. No data is saved or sent anywhere.
        </p>
      </div>
      <SrsIllustration
        class="seal-panel__art"
        variant="flush"
        :src="srsIllustrations.seal.src"
        :alt="srsIllustrations.seal.alt"
      />
    </div>

    <div class="seal-workspace">
      <form class="seal-form" @submit.prevent="applySeal">
        <div class="seal-field">
          <label class="seal-label" for="record-name">Display name</label>
          <input
            id="record-name"
            v-model="form.name"
            type="text"
            class="seal-input"
            maxlength="40"
            autocomplete="off"
          />
        </div>

        <div class="seal-field">
          <label class="seal-label" for="record-program">Program</label>
          <select
            id="record-program"
            v-model="form.program"
            class="seal-input"
          >
            <option value="Information Systems">Information Systems</option>
            <option value="Management">Management</option>
            <option value="English Literature">English Literature</option>
            <option value="Teacher Education">Teacher Education</option>
          </select>
        </div>

        <div class="seal-field">
          <label class="seal-label" for="record-term">Academic term</label>
          <select id="record-term" v-model="form.term" class="seal-input">
            <option value="2025/2026 - Odd">2025/2026 - Odd</option>
            <option value="2025/2026 - Even">2025/2026 - Even</option>
            <option value="2026/2027 - Odd">2026/2027 - Odd</option>
          </select>
        </div>

        <button
          type="submit"
          class="seal-button"
          :disabled="isSealed"
        >
          {{ isSealed ? "Record verified" : "Apply verification seal" }}
        </button>

        <button
          v-if="isSealed"
          type="button"
          class="seal-reset"
          @click="resetSeal"
        >
          Reset demo
        </button>
      </form>

      <div class="seal-card-wrap">
        <article
          class="seal-card"
          :class="{ 'seal-card--verified': isSealed }"
          aria-label="Sample student record card"
        >
          <header class="seal-card__header">
            <p class="seal-card__institution">Student Record System</p>
            <p class="seal-card__doc-type">Academic dossier (sample)</p>
          </header>

          <div class="seal-card__body">
            <div class="seal-card__row">
              <span class="seal-card__key">Name</span>
              <span class="seal-card__value">{{ form.name }}</span>
            </div>
            <div class="seal-card__row">
              <span class="seal-card__key">Program</span>
              <span class="seal-card__value">{{ form.program }}</span>
            </div>
            <div class="seal-card__row">
              <span class="seal-card__key">Term</span>
              <span class="seal-card__value">{{ form.term }}</span>
            </div>
            <div class="seal-card__row">
              <span class="seal-card__key">Record ID</span>
              <span class="seal-card__value tabular-nums">SRS-DEMO-0426</span>
            </div>
          </div>

          <div
            class="seal-stamp"
            :class="{ 'seal-stamp--visible': isSealed }"
            aria-hidden="true"
          >
            <span>Verified</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SrsIllustration from "./SrsIllustration.vue";
import { srsIllustrations } from "../illustrations";

const form = reactive({
  name: "Alexandra Putri",
  program: "Information Systems",
  term: "2025/2026 - Odd",
});

const isSealed = ref(false);

function applySeal() {
  isSealed.value = true;
}

function resetSeal() {
  isSealed.value = false;
}

watch(
  () => [form.name, form.program, form.term],
  () => {
    isSealed.value = false;
  },
);
</script>

<style scoped>
.seal-panel {
  border: 1px solid color-mix(in srgb, var(--srs-teal) 22%, transparent);
  border-radius: 1.25rem;
  background: var(--srs-panel);
  padding: 1.75rem;
}

.seal-panel__intro {
  display: grid;
  gap: 1rem;
  margin-bottom: 1.75rem;
  align-items: center;
}

.seal-panel__copy {
  min-width: 0;
}

.seal-panel__art {
  width: min(100%, 12rem);
  justify-self: center;
}

@media (min-width: 700px) {
  .seal-panel__intro {
    grid-template-columns: minmax(0, 1fr) minmax(8rem, 13rem);
    gap: 1.5rem;
  }

  .seal-panel__art {
    width: 100%;
    justify-self: end;
  }
}

.seal-workspace {
  display: grid;
  gap: 2rem;
}

@media (min-width: 900px) {
  .seal-workspace {
    grid-template-columns: minmax(0, 1fr) minmax(18rem, 22rem);
    align-items: start;
  }
}

.seal-form {
  display: grid;
  gap: 1rem;
}

.seal-field {
  display: grid;
  gap: 0.4rem;
}

.seal-label {
  font-family: var(--srs-font-body);
  font-size: 1rem;
  font-weight: 600;
  color: var(--srs-ink);
}

.seal-input {
  width: 100%;
  padding: 0.7rem 0.85rem;
  border-radius: 0.65rem;
  border: 1px solid color-mix(in srgb, var(--srs-teal) 28%, transparent);
  background: #ffffff;
  color: var(--srs-ink);
  font-family: var(--srs-font-body);
  font-size: 1rem;
  transition:
    border-color 150ms ease-out,
    box-shadow 150ms ease-out;
}

.seal-input:focus-visible {
  outline: none;
  border-color: var(--srs-copper);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--srs-copper) 25%, transparent);
}

.seal-button {
  margin-top: 0.25rem;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 0.65rem;
  background: var(--srs-teal);
  color: #f8f6f1;
  font-family: var(--srs-font-body);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 150ms ease-out;
}

.seal-button:hover:not(:disabled) {
  background: color-mix(in srgb, var(--srs-teal) 85%, black);
}

.seal-button:disabled {
  opacity: 0.7;
  cursor: default;
}

.seal-button:focus-visible {
  outline: 2px solid var(--srs-copper);
  outline-offset: 2px;
}

.seal-reset {
  padding: 0.55rem 0.2rem;
  border: none;
  background: transparent;
  color: var(--srs-copper);
  font-family: var(--srs-font-body);
  font-size: 1rem;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
  justify-self: start;
}

.seal-card-wrap {
  display: flex;
  justify-content: center;
}

.seal-card {
  position: relative;
  width: 100%;
  max-width: 20rem;
  padding: 1.25rem;
  border-radius: 0.5rem;
  background: linear-gradient(
    165deg,
    #fffdf8 0%,
    #f6efe3 55%,
    #ebe2d2 100%
  );
  border: 1px solid color-mix(in srgb, var(--srs-copper) 35%, transparent);
  box-shadow:
    0 1px 0 color-mix(in srgb, white 80%, transparent) inset,
    0 12px 28px color-mix(in srgb, var(--srs-ink) 12%, transparent);
  overflow: hidden;
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.seal-card--verified {
  transform: rotate(-1.5deg);
}

.seal-card__header {
  border-bottom: 1px solid color-mix(in srgb, var(--srs-copper) 30%, transparent);
  padding-bottom: 0.85rem;
  margin-bottom: 0.85rem;
}

.seal-card__institution {
  font-family: var(--srs-font-display);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--srs-teal);
}

.seal-card__doc-type {
  font-size: 1rem;
  color: var(--srs-muted);
  margin-top: 0.15rem;
}

.seal-card__body {
  display: grid;
  gap: 0.65rem;
}

.seal-card__row {
  display: grid;
  grid-template-columns: 5.5rem 1fr;
  gap: 0.5rem;
  align-items: baseline;
}

.seal-card__key {
  font-size: 1rem;
  color: var(--srs-muted);
}

.seal-card__value {
  font-size: 1rem;
  font-weight: 600;
  color: var(--srs-ink);
}

.seal-stamp {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  width: 5.5rem;
  height: 5.5rem;
  display: grid;
  place-items: center;
  border: 3px double color-mix(in srgb, var(--srs-copper) 70%, transparent);
  border-radius: 50%;
  color: color-mix(in srgb, var(--srs-copper) 85%, transparent);
  font-family: var(--srs-font-display);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transform: scale(1.8) rotate(-18deg);
  opacity: 0;
  transition:
    opacity 280ms ease-out,
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
  pointer-events: none;
}

.seal-stamp--visible {
  opacity: 1;
  transform: scale(1) rotate(-18deg);
}

.seal-display {
  font-family: var(--srs-font-display);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--srs-ink);
}

.seal-body {
  font-family: var(--srs-font-body);
  font-size: 1rem;
  line-height: 1.6;
}

@media (prefers-reduced-motion: reduce) {
  .seal-card,
  .seal-stamp {
    transition: none;
  }

  .seal-card--verified {
    transform: none;
  }

  .seal-stamp--visible {
    transform: rotate(-18deg);
  }
}
</style>
