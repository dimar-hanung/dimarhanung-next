<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-center items-center">
      <select-field
        v-model="selectedOption"
        :options="options"
        label="Select an option"
        placeholder="Please select an option"
      />
    </div>

    <div class="mt-8">
      <h2 class="text-2xl font-bold">Selected option:</h2>
      <p class="text-lg mt-2">{{ selectedOption }}</p>

      <h2 class="text-2xl font-bold mt-8">Options:</h2>

      <ul class="mt-2">
        <li v-for="option in options" :key="option.value">
          {{ option.label }}
        </li>

        <li v-if="!options.length" class="text-gray-500">
          No options available
        </li>

        <li v-if="options.length > 5" class="text-gray- 500">
          +{{ options.length - 5 }} more options
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectField from "@/components/select-field.vue";

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  { label: "Option 4", value: "option4" },
  { label: "Option 5", value: "option5" },
];

const selectedOption = ref("");
</script>
