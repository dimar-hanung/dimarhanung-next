<template>
  <figure
    class="srs-illus"
    :class="`srs-illus--${variant}`"
  >
    <div class="srs-illus__frame">
      <img
        :src="src"
        :alt="alt"
        class="srs-illus__img"
        loading="lazy"
        decoding="async"
      />
    </div>
    <figcaption
      v-if="caption"
      class="srs-illus__caption"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string;
    alt: string;
    caption?: string;
    variant?: "hero" | "section" | "accent" | "flush";
  }>(),
  {
    variant: "section",
  },
);
</script>

<style scoped>
.srs-illus {
  margin: 0;
}

.srs-illus__frame {
  border-radius: 1rem;
  border: 1px solid color-mix(in srgb, var(--srs-teal) 18%, transparent);
  background: color-mix(in srgb, var(--srs-panel) 90%, white);
  overflow: hidden;
}

.srs-illus__img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

.srs-illus--hero .srs-illus__frame {
  border-radius: 1.25rem;
  background: color-mix(in srgb, var(--srs-panel) 92%, white);
  box-shadow: 0 16px 40px color-mix(in srgb, var(--srs-ink) 10%, transparent);
}

.srs-illus--hero .srs-illus__img {
  max-height: min(22rem, 58vw);
  padding: 0.75rem;
}

@media (min-width: 900px) {
  .srs-illus--hero .srs-illus__img {
    max-height: 22rem;
    padding: 1rem;
  }
}

.srs-illus--section .srs-illus__img {
  max-height: 18rem;
  padding: 0.75rem;
}

.srs-illus--accent .srs-illus__frame {
  border-color: color-mix(in srgb, var(--srs-copper) 30%, transparent);
  background: color-mix(in srgb, var(--srs-copper) 6%, var(--srs-panel));
}

.srs-illus--accent .srs-illus__img {
  max-height: 12rem;
  padding: 0.5rem;
}

.srs-illus--flush .srs-illus__frame {
  border: 0;
  background: transparent;
  border-radius: 0;
}

.srs-illus--flush .srs-illus__img {
  max-height: 11rem;
  padding: 0;
}

@media (min-width: 768px) {
  .srs-illus--flush .srs-illus__img {
    max-height: 13rem;
  }
}

.srs-illus__caption {
  margin-top: 0.5rem;
  font-family: var(--srs-font-body);
  font-size: 1rem;
  color: var(--srs-muted);
  text-align: center;
}

@media (prefers-reduced-motion: no-preference) {
  .srs-illus--hero .srs-illus__img {
    transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .srs-illus--hero:hover .srs-illus__img {
    transform: scale(1.02);
  }
}
</style>
