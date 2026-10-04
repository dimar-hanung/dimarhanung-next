<template>
  <ul class="modules" aria-label="SRS functional domains">
    <li v-for="module in modules" :key="module.id" class="module">
      <span class="module__glyph" aria-hidden="true">
        <Icon :name="module.icon" class="module__icon" />
      </span>
      <p class="module__track">{{ module.track }}</p>
      <h4 class="module__title">{{ module.label }}</h4>
      <p class="module__text">{{ module.description }}</p>
      <ul class="module__tags" aria-label="Tags">
        <li v-for="tag in module.tags" :key="tag" class="module__tag">
          {{ tag }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { SrsModule } from "../data";

defineProps<{
  modules: SrsModule[];
}>();
</script>

<style scoped>
.modules {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  gap: 1rem;
}

.module {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid var(--srs-line);
  background: var(--srs-panel);
  transition: border-color 150ms ease-out;
}

.module:hover {
  border-color: var(--srs-line-strong);
}

.module__glyph {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  margin-bottom: 1rem;
  border-radius: 0.75rem;
  background: var(--srs-tint);
  color: var(--srs-accent);
}

.module__icon {
  width: 1.4rem;
  height: 1.4rem;
}

.module__track {
  font-family: var(--srs-font-body);
  font-size: 0.9375rem;
  color: var(--srs-copper);
}

.module__title {
  margin-top: 0.15rem;
  font-family: var(--srs-font-display);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.25;
  color: var(--srs-ink);
}

.module__text {
  flex: 1;
  margin-top: 0.6rem;
  font-family: var(--srs-font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--srs-muted);
}

.module__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1rem;
}

@media (max-width: 639px) {
  .module {
    display: grid;
    grid-template-columns: 2.5rem minmax(0, 1fr);
    column-gap: 1rem;
    padding: 1.15rem;
  }

  .module__glyph {
    grid-row: span 3;
    align-self: start;
    width: 2.5rem;
    height: 2.5rem;
    margin-bottom: 0;
  }

  .module__tags {
    display: none;
  }
}

.module__tag {
  padding: 0.15rem 0.65rem;
  border-radius: 999px;
  border: 1px solid var(--srs-line);
  font-family: var(--srs-font-body);
  font-size: 0.9375rem;
  color: var(--srs-accent);
}
</style>
