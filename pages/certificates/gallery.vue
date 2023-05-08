<template>
  <div>
    <div class="flex flex-wrap justify-center gap-4 bg-slate-200 p-4">
      <div
        v-for="item in certificates"
        class="bg-white pb-8 shadow-2xl rounded-xl overflow-hidden w-96"
      >
        <nuxt-img
          :src="item.imageUrl"
          sizes="sm:384px"
          format="webp"
          :quality="50"
        />
        <div class="p-2">
          <h3 class="text-2xl font-bold">
            <a
              :href="item.cradential"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ item.title }}
            </a>
          </h3>
          <p>
            {{
              new Date(item.date).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </p>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import certicatesData from "./certificates.json";

const certificates = reactive(certicatesData);
</script>
