<template>
  <div class="project-container w-full relative">
    <img class="w-full relative" :src="image" alt="" />
    <div
      class="project-reference bg-black bg-opacity-75 grid place-items-center absolute w-full h-full left-0 top-0"
    >
      <div>
        <a
          :href="liveLink"
          target="_blank"
          class="font-bold max-w-max block mx-auto border-b-2 border-[#4EE1A0] tracking-widest hover:text-[#4EE1A0] transition-colors"
        >
          VIEW PROJECT
        </a>
        <a
          :href="githubLink"
          target="_blank"
          class="font-bold max-w-max block mx-auto border-b-2 border-[#4EE1A0] mt-16 tracking-widest hover:text-[#4EE1A0] transition-colors"
        >
          VIEW CODE
        </a>
      </div>
    </div>
  </div>
  <h3 class="font-bold text-2xl mt-5">{{ title }}</h3>
  <div class="flex gap-x-4 text-[#D9D9D9] mt-2">
    <div v-for="tag in tags">{{ tag }}</div>
  </div>
</template>
<script setup lang="ts">
export interface Props {
  image: string;
  title: string;
  liveLink: string;
  githubLink: string;
  tags: string[];
}

const props = defineProps<Props>();
</script>

<style scoped>
.project-reference {
  opacity: 0;
  transition: all ease 0.3s;
}

.project-container:hover .project-reference {
  opacity: 1;
}
</style>
