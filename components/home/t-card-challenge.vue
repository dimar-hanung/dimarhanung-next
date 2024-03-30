<template>
  <NuxtLink :to="url" :external="true" target="_blank">
    <t-card class="challenge-card flex gap-x-2 mt-2">
      <div class="flex justify-between w-full gap-2">
        <div class="w-12 min-w-[3rem]">
          <NuxtImg :src="logo" class="rounded-full" alt="" />
        </div>
        <div class="flex-grow">
          <div class="flex justify-between">
            <div>
              <p class="font-bold px-1">{{ title }}</p>
              <div class="flex gap-2">
                <span v-for="(badge, i) in badges" :key="`BADGE-${i}`">
                  {{ badge }}
                </span>
              </div>
            </div>
            <Icon
              class="challenge-external-link-icon text-3xl"
              name="mdi:external-link"
            />
          </div>

          <hr class="my-2" />

          <p class="leading-5">
            {{ description }}
          </p>
        </div>
      </div>
    </t-card>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  logo: string;
  title: string;
  description: string;
  badges: string[];
  url: string;
}

const props = defineProps<Props>();
</script>

<style scoped>
.challenge-card:hover .challenge-external-link-icon {
  @apply text-blue-500;
}
</style>
