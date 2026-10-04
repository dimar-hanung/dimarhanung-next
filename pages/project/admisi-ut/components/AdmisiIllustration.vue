<template>
  <figure class="aillus" :class="`aillus--${variant}`">
    <div class="aillus__frame">
      <img
        :src="src"
        :alt="alt"
        class="aillus__img"
        loading="lazy"
        decoding="async"
      />
    </div>
    <figcaption v-if="caption" class="aillus__caption">
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
.aillus {
  margin: 0;
}

.aillus__frame {
  border-radius: 0.75rem;
  border: 1px solid var(--admisi-line);
  background: #ffffff;
  overflow: hidden;
}

.aillus__img {
  display: block;
  width: 100%;
  max-width: 100%;
  height: auto;
  object-fit: contain;
}

.aillus--section .aillus__img {
  max-height: 18rem;
  padding: 0.75rem;
}

.aillus--accent .aillus__frame {
  border-color: color-mix(in srgb, var(--admisi-green) 30%, transparent);
  background: color-mix(in srgb, var(--admisi-green) 7%, #ffffff);
}

.aillus--accent .aillus__img {
  max-height: 12rem;
  padding: 0.5rem;
}

.aillus--flush .aillus__frame {
  border: 0;
  background: transparent;
  border-radius: 0;
}

.aillus--flush .aillus__img {
  max-height: 11rem;
  padding: 0;
}

@media (min-width: 768px) {
  .aillus--flush .aillus__img {
    max-height: 13rem;
  }
}

.aillus__caption {
  margin-top: 0.5rem;
  font-family: var(--admisi-font-body);
  font-size: 1rem;
  color: var(--admisi-muted);
  text-align: center;
}
</style>
