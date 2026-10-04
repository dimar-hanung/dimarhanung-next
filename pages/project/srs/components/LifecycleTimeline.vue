<template>
  <ol class="timeline" data-reveal="group">
    <li
      v-for="(stage, index) in stages"
      :key="stage.id"
      class="step"
      :style="{ '--i': index }"
    >
      <span class="step__dot" aria-hidden="true">
        {{ String(index + 1).padStart(2, "0") }}
      </span>
      <div class="step__copy">
        <h3 class="step__title">{{ stage.title }}</h3>
        <p class="step__summary">{{ stage.summary }}</p>
        <ul class="step__list">
          <li v-for="item in stage.highlights" :key="item">{{ item }}</li>
        </ul>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import type { SrsStage } from "../data";

defineProps<{
  stages: SrsStage[];
}>();
</script>

<style scoped>
/* Vertical on small screens, horizontal from 960px. The connecting line is the
   list's ::before, drawn behind the numbered dots. */
.timeline {
  position: relative;
  display: grid;
  gap: 2rem;
}

.timeline::before {
  content: "";
  position: absolute;
  top: 1.5rem;
  bottom: 1.5rem;
  left: 1.5rem;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(var(--srs-copper-soft), var(--srs-accent));
  opacity: 0.45;
}

.step {
  position: relative;
  display: grid;
  grid-template-columns: 3rem minmax(0, 1fr);
  gap: 1.25rem;
}

.step__dot {
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 2px solid var(--srs-copper-soft);
  background: var(--srs-page-solid);
  font-family: var(--srs-font-display);
  font-size: 1rem;
  font-weight: 600;
  color: var(--srs-copper);
}

.step__title {
  font-family: var(--srs-font-display);
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 3rem;
  color: var(--srs-ink);
}

.step__summary {
  font-family: var(--srs-font-body);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--srs-muted);
}

.step__list {
  display: grid;
  gap: 0.3rem;
  margin-top: 0.75rem;
  padding-left: 0.85rem;
  border-left: 2px solid var(--srs-line);
  font-family: var(--srs-font-body);
  font-size: 1rem;
  line-height: 1.5;
  color: var(--srs-ink);
}

@media (max-width: 639px) {
  .timeline {
    gap: 1.5rem;
  }
}

@media (min-width: 960px) {
  .timeline {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 1.5rem;
  }

  .timeline::before {
    top: 1.5rem;
    bottom: auto;
    left: 1.5rem;
    right: calc(20% - 2.7rem);
    width: auto;
    height: 2px;
    transform: translateY(-50%);
    background: linear-gradient(90deg, var(--srs-copper-soft), var(--srs-accent));
  }

  .step {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .step__title {
    line-height: 1.3;
  }

  .step__summary {
    margin-top: 0.35rem;
  }
}

/* Motion: the connecting line draws itself, then each numbered dot pops in
   after the step's text has started to rise (the rise comes from the page's
   shared group reveal). Hidden states only apply once `.srs-motion` is armed. */
@media (prefers-reduced-motion: no-preference) {
  .timeline {
    /* Vertical line grows down on phones, horizontal line grows right on desktop. */
    --line-from: 1 0;
  }

  .timeline::before {
    transform-origin: top;
  }

  .srs-motion .timeline:not(.is-revealed)::before {
    scale: var(--line-from);
  }

  .srs-motion .timeline.is-revealed::before {
    animation: line-draw 1200ms var(--srs-ease) both;
  }

  .srs-motion .timeline:not(.is-revealed) .step__dot {
    opacity: 0;
  }

  .srs-motion .timeline.is-revealed .step__dot {
    animation: dot-pop 600ms cubic-bezier(0.34, 1.56, 0.64, 1) calc(150ms + var(--i) * 180ms) both;
  }

  @media (min-width: 960px) {
    .timeline {
      --line-from: 0 1;
    }

    .timeline::before {
      transform-origin: left;
    }
  }
}

@keyframes line-draw {
  from {
    scale: var(--line-from);
  }
}

@keyframes dot-pop {
  from {
    opacity: 0;
    transform: scale(0.4);
  }
}
</style>
