<template>
  <div class="flex flex-wrap gap-4 mb-8">
    <div class="flex items-center text-blue-600">
      <Icon name="mdi:calendar" class="mr-2" />
      <span>Start Date: {{ startDate }}</span>
    </div>
    <div class="flex items-center text-green-600">
      <Icon name="mdi:clock" class="mr-2" />
      <span>Duration: {{ duration }}</span>
    </div>
    <div class="flex items-center text-purple-600">
      <Icon name="mdi:user" class="mr-2" />
      <span>Team: {{ teamSize }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  startDate: string;
  duration: string;
  teamSize: string;
}

withDefaults(defineProps<Props>(), {
  startDate: "2023-06-01",
  duration: "3 months",
  teamSize: "5 members",
});
</script>
