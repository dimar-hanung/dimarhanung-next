<template>
  <div class="mb-8">
    <h2 class="text-2xl font-semibold mb-4 dark:text-white">Team Members</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <div
        v-for="member in teamMembers"
        :key="member.name"
        class="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 flex items-center space-x-4"
      >
        <img
          :src="member.image || '/home/project/srs.png'"
          :alt="member.name"
          class="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 class="font-semibold dark:text-white">{{ member.name }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-300">
            {{ member.role }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

interface Props {
  teamMembers: TeamMember[];
}

defineProps<Props>();
</script>
