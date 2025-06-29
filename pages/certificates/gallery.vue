<template>
  <div>
    <div
      class="py-10 px-6 md:px-10 min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-800"
    >
      <h1
        class="text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500 bg-clip-text text-transparent"
      >
        Sertifikat Saya
      </h1>
      <p
        class="text-center text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto"
      >
        Kumpulan sertifikasi profesional yang telah diperoleh sepanjang
        perjalanan karir di bidang teknologi dan pengembangan perangkat lunak.
      </p>

      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        <ClientOnly>
          <div
            v-for="(item, index) in certificates"
            :key="index"
            class="w-full"
          >
            <TransformCardContainer>
              <TransformCardBody
                class="w-full h-auto rounded-xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-lg hover:shadow-xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/5 transition-all duration-300"
              >
                <!-- Gambar sertifikat dengan efek hover -->
                <TransformCardItem
                  :translate-z="40"
                  class="relative w-full overflow-hidden"
                >
                  <div
                    class="relative group w-full aspect-[4/3] overflow-hidden"
                  >
                    <nuxt-img
                      :src="item.imageUrl"
                      class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                      format="webp"
                      :quality="80"
                    />
                    <div
                      class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    ></div>
                    <div
                      class="absolute bottom-0 left-0 right-0 p-4 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                    >
                      <a
                        v-if="item.cradential"
                        :href="item.cradential"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200"
                      >
                        <span>Lihat Sertifikat</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                          ></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                      </a>
                    </div>
                  </div>
                </TransformCardItem>

                <!-- Konten sertifikat -->
                <TransformCardItem :translate-z="50" class="p-5 w-full">
                  <h3
                    class="text-xl font-bold text-slate-800 dark:text-white mb-2"
                  >
                    {{ item.title }}
                  </h3>
                  <p class="text-sm text-slate-500 dark:text-slate-400 mb-3">
                    {{
                      new Date(item.date).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    }}
                  </p>
                  <p
                    class="text-slate-600 dark:text-slate-300 text-sm line-clamp-3"
                  >
                    {{ item.desc }}
                  </p>
                </TransformCardItem>
              </TransformCardBody>
            </TransformCardContainer>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import certicatesData from "./certificates.json";

const certificates = reactive(certicatesData);
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
