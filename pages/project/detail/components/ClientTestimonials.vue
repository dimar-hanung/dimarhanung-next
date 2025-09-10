<template>
  <div class="mb-8">
    <h2 class="text-2xl font-semibold mb-4 dark:text-white">
      Client Testimonials
    </h2>
    <div class="space-y-4">
      <div
        v-for="testimonial in testimonials"
        :key="testimonial.name"
        class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
      >
        <p class="italic mb-2 dark:text-white">"{{ testimonial.content }}"</p>
        <p class="text-sm text-gray-600 dark:text-gray-300">
          - {{ testimonial.name }}, {{ testimonial.company }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Testimonial {
  name: string;
  company: string;
  content: string;
}

interface Props {
  testimonials: Testimonial[];
}

defineProps<Props>();
</script>
