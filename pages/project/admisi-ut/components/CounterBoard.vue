<template>
  <div class="journey">
    <div class="board" aria-hidden="true" data-reveal="up">
      <span class="board__text">Admisi UT · six counters, one ticket</span>
      <span class="board__lamps">
        <span
          v-for="(counter, index) in counters"
          :key="counter.id"
          class="board__lamp"
          :style="{ '--i': index }"
        />
      </span>
    </div>

    <ol class="counters" data-reveal="group">
      <li
        v-for="(counter, index) in counters"
        :key="counter.id"
        class="counter admisi-lift"
        :style="{ '--i': index }"
      >
        <p class="counter__no">
          <span>Counter</span>
          {{ String(index + 1).padStart(2, "0") }}
        </p>
        <div class="counter__body">
          <span class="counter__glyph" aria-hidden="true">
            <Icon :name="counter.icon" class="counter__icon" />
          </span>
          <h3 class="counter__title">{{ counter.title }}</h3>
          <p class="counter__text">{{ counter.summary }}</p>
        </div>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import type { AdmisiCounter } from "../data";

defineProps<{
  counters: AdmisiCounter[];
}>();
</script>

<style scoped>
/* The lobby's LED board, kept as a static header: one lamp per counter. */
.board {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem 1.5rem;
  margin-bottom: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 0.9rem;
  background: var(--admisi-board);
  color: var(--admisi-led);
  font-family: var(--admisi-font-mono);
  font-size: 0.9375rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.board__lamps {
  display: inline-flex;
  gap: 0.5rem;
}

.board__lamp {
  width: 0.65rem;
  height: 0.65rem;
  border-radius: 50%;
  background: var(--admisi-led);
  box-shadow: 0 0 10px color-mix(in srgb, var(--admisi-led) 70%, transparent);
}

.counters {
  display: grid;
  gap: 1rem;
}

@media (min-width: 640px) {
  .counters {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 960px) {
  .counters {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.counter {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid var(--admisi-line);
  background: var(--admisi-panel);
}

.counter__no {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 0.6rem 1.25rem;
  background: var(--admisi-board);
  color: var(--admisi-led);
  font-family: var(--admisi-font-mono);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.counter__no span {
  font-size: 0.8125rem;
  font-weight: 400;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  opacity: 0.8;
}

.counter__body {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.35rem 0.9rem;
  padding: 1.25rem;
}

.counter__glyph {
  grid-row: span 2;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.75rem;
  background: var(--admisi-tint);
  color: var(--admisi-accent);
}

.counter__icon {
  width: 1.4rem;
  height: 1.4rem;
}

.counter__title {
  font-family: var(--admisi-font-display);
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--admisi-ink);
}

.counter__text {
  font-family: var(--admisi-font-body);
  font-size: 1rem;
  line-height: 1.55;
  color: var(--admisi-muted);
}

/* Motion: the board's lamps switch on one by one when it scrolls in. Lamps
   are lit by default, so nothing stays dark without JS or with reduced motion. */
@media (prefers-reduced-motion: no-preference) {
  .admisi-motion .board:not(.is-revealed) .board__lamp {
    opacity: 0.25;
    box-shadow: none;
  }

  .admisi-motion .board.is-revealed .board__lamp {
    animation: lamp-on 450ms ease-out calc(500ms + var(--i) * 160ms) both;
  }
}

@keyframes lamp-on {
  from {
    opacity: 0.25;
    box-shadow: none;
  }

  60% {
    opacity: 1;
    box-shadow: 0 0 18px var(--admisi-led);
  }
}
</style>
