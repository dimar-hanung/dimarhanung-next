<template>
  <section>
    <h2
      class="flex justify-between cursor-pointer"
      :class="[isOpen ? 'font-bold' : '']"
      @click="isOpen = !isOpen"
    >
      {{ title }}
      <iconArrowDown
        class="scale-150 transition-all"
        :class="[isOpen ? 'rotate-180' : 'rotate-0']"
      />
    </h2>
    <p v-if="isOpen" class="mt-4">{{ content }}</p>
  </section>
</template>

<script setup lang="ts">
import iconArrowDown from "./icon-arrow-down.vue";

export interface Props {
  title: string;
  content: string;
}

const isOpen = ref(false);

const props = withDefaults(defineProps<Props>(), {
  title: "",
  content: "",
});
</script>
