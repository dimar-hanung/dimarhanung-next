<template>
  <figure class="myut-illus" :class="`myut-illus--${variant}`">
    <div class="myut-illus__frame">
      <img
        :src="src"
        :alt="alt"
        class="myut-illus__img"
        loading="lazy"
        decoding="async"
      />
    </div>
    <figcaption v-if="caption" class="myut-illus__caption">
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
    variant?: "section" | "accent" | "flush";
  }>(),
  {
    variant: "section",
  },
);
</script>

<style scoped>
.myut-illus {
  margin: 0;
}

.myut-illus__frame {
  border-radius: 0.45rem;
  border: 1px solid color-mix(in srgb, var(--myut-navy) 16%, transparent);
  background: var(--myut-letter);
  overflow: hidden;
}

.myut-illus__img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

.myut-illus--section .myut-illus__img {
  max-height: 18rem;
  padding: 0.75rem;
}

.myut-illus--accent .myut-illus__frame {
  border-color: color-mix(in srgb, var(--myut-vermillion) 28%, transparent);
  background: color-mix(in srgb, var(--myut-amber) 10%, var(--myut-letter));
}

.myut-illus--accent .myut-illus__img {
  max-height: 12rem;
  padding: 0.5rem;
}

.myut-illus--flush .myut-illus__frame {
  border: 0;
  background: transparent;
  border-radius: 0;
}

.myut-illus--flush .myut-illus__img {
  max-height: 11rem;
  padding: 0;
}

@media (min-width: 768px) {
  .myut-illus--flush .myut-illus__img {
    max-height: 13rem;
  }
}

.myut-illus__caption {
  margin-top: 0.5rem;
  font-family: var(--myut-font-body);
  font-size: 1rem;
  color: var(--myut-muted);
  text-align: center;
}
</style>
