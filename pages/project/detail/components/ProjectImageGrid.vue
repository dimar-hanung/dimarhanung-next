<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="group relative overflow-hidden rounded-lg aspect-video bg-gray-100 dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      @click="handleImageClick(image, index)"
    >
      <img
        :src="image"
        :alt="'Project Screenshot ' + (index + 1)"
        class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      ></div>
      <div
        class="absolute bottom-3 left-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <p class="text-sm font-medium">View {{ index + 1 }}</p>
      </div>
      <!-- Click indicator -->
      <div
        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <div class="bg-white/20 backdrop-blur-sm rounded-full p-2">
          <Icon name="mdi:magnify-plus" class="text-white text-xl" />
        </div>
      </div>
      <!-- Hover overlay with subtle animation -->
      <div
        class="absolute inset-0 ring-2 ring-blue-500 ring-opacity-0 group-hover:ring-opacity-50 transition-all duration-300 rounded-lg"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  images: string[];
}

const props = defineProps<Props>();
const emit = defineEmits<{
  imageClick: [image: string, alt: string];
}>();

const handleImageClick = (image: string, index: number) => {
  emit("imageClick", image, "Project Screenshot " + (index + 1));
};
</script>
