<template>
  <div class="min-h-screen h-full w-full grid place-items-center bg-slate-950">
    <div
      class="max-h-[800px] max-w-[1440px] fylo-data-container bg-[#0C122C] h-full grid place-items-center w-full rounded-sm p-4 relative overflow-hidden"
    >
      <div
        class="hidden md:block absolute bottom-0 left-0 w-full overflow-hidden"
      >
        <bg-desktop class="bottom-0 left-0" />
      </div>
      <div
        class="block md:hidden absolute top-0 h-full left-0 w-full overflow-hidden"
      >
        <bg-mobile class="bottom-0 left-0 h-full" />
      </div>

      <main
        class="block md:flex md:place-items-end gap-x-4 w-full max-w-[920px] relative"
      >
        <section
          class="bg-[#1E2D69] shadow-primary p-10 rounded-tr-[100px] rounded-[10px] w-full md:max-w-[350px]"
        >
          <div>
            <logo />
          </div>
          <div class="flex gap-x-4 mt-8">
            <div
              class="bg-[#0C122C] w-12 h-12 grid place-items-center rounded-[10px]"
            >
              <icon-document />
            </div>
            <div
              class="bg-[#0C122C] w-12 h-12 grid place-items-center rounded-[10px]"
            >
              <icon-folder />
            </div>
            <div
              class="bg-[#0C122C] w-12 h-12 grid place-items-center rounded-[10px]"
            >
              <icon-upload />
            </div>
          </div>
        </section>
        <section
          class="bg-[#1E2D69] text-[#DBD9FF] shadow-primary p-10 rounded-[10px] w-full relative mt-8 md:mt-0 md:max-h-[155px]"
        >
          <p>You’ve used 815 GB of your storage</p>
          <div class="mt-4">
            <div class="p-[3px] w-full rounded-[10px] bg-[#0C122C]">
              <div
                class="slider-gradient h-3 rounded-[8px] flex justify-end place-items-center pr-[2px]"
                :style="{ width: `${(storage.used / storage.total) * 100}%` }"
              >
                <div class="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <div class="flex justify-between mt-2 font-bold">
              <p>0 GB</p>
              <p>1000 GB</p>
            </div>
          </div>
          <div
            class="absolute md:top-0 md:right-0 px-10 md:-translate-y-1/2 left-1/2 md:left-auto -translate-x-1/2 md:-translate-x-0"
          >
            <div
              class="bg-white py-4 px-6 flex place-items-center gap-x-2 rounded-lg md:rounded-br-none relative"
            >
              <storage-arrow
                class="absolute bottom-0 right-0 translate-y-full hidden md:block"
              />
              <p class="text-[#0C122C] text-4xl font-bold">
                {{ storage.total - storage.used }}
              </p>
              <p
                class="text-sm font-bold text-[#0C122C] opacity-50 whitespace-nowrap"
              >
                GB LEFT
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import iconDocument from "./components/icon-document.vue";
import iconFolder from "./components/icon-folder.vue";
import iconUpload from "./components/icon-upload.vue";
import logo from "./components/logo.vue";
import storageArrow from "./components/storage-arrow.vue";
import bgDesktop from "./components/bg-desktop.vue";
import bgMobile from "./components/bg-mobile.vue";

useSeoMeta({
  title: "Front-End Mentor - Fylo Data Storage Component",
  description:
    "Front-End Mentor - Fylo Data Storage Component with tailwind css",
});

const storage = reactive({
  used: 815,
  total: 1000,
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap");

.fylo-data-container {
  font-family: "Raleway", sans-serif;
}
.slider-gradient {
  background: linear-gradient(90deg, #ffa197 0%, #ff4a95 100%);
}

.shadow-primary {
  box-shadow: 0px 75px 100px -30px rgba(0, 0, 0, 0.24776);
}
</style>
