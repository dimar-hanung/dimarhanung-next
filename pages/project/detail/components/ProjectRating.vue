<template>
  <div class="mb-8">
    <h2 class="text-2xl font-semibold mb-4 dark:text-white">
      Rate This Project
    </h2>
    <div class="flex items-center">
      <Icon
        name="mdi:star"
        v-for="star in 5"
        :key="star"
        class="w-8 h-8 cursor-pointer"
        :class="
          star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        "
        @click="handleRating(star)"
      />
      <span class="ml-2 text-gray-600 dark:text-gray-300">
        {{
          rating > 0
            ? `You rated this project ${rating} stars`
            : "Click to rate"
        }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  initialRating?: number;
}

type Emits = {
  "update:rating": [value: number];
};

const props = withDefaults(defineProps<Props>(), {
  initialRating: 0,
});

const emit = defineEmits<Emits>();

const rating = ref(props.initialRating);

const handleRating = (value: number) => {
  rating.value = value;
  emit("update:rating", value);
};
</script>
