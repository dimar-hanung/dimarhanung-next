<template>
  <div
    class="stats-preview-container min-h-screen grid place-items-center bg-[#0A0C1C] p-4"
  >
    <main
      class="flex flex-wrap md:flex-nowrap justify-between w-full h-full bg-[#1B1937] max-w-[1110px] md:max-h-[446px] rounded-lg overflow-hidden"
    >
      <!-- mobile -->
      <section class="relative w-full grid place-items-center md:hidden">
        <div class="absolute w-full h-full bg-[#AB5CDB] bg-opacity-60"></div>
        <img
          class="w-full rounded"
          src="/challenges/9-stats-preview-card-component/image-header-mobile.jpg"
          alt=""
        />
      </section>

      <!-- content -->
      <section class="p-4 py-10 md:p-16 w-full md:w-auto">
        <div class="max-w-[25rem] mx-auto">
          <h1
            class="text-center md:text-left text-3xl md:text-4xl text-white font-bold"
          >
            Get <span class="text-[#AB5CDB]">insights</span> that help your
            business grow.
          </h1>
          <p
            class="text-center md:text-left leading-6 text-[0.875rem] text-white opacity-75 mt-6 tracking-wide"
          >
            Discover the benefits of data analytics and make better decisions
            regarding revenue, customer experience, and overall efficiency.
          </p>

          <div
            class="text-center md:text-left flex flex-wrap md:flex-nowrap justify-center gap-14 mt-[4.5rem]"
          >
            <div class="flex flex-col">
              <h2 class="text-2xl text-white font-bold">10k+</h2>
              <p
                class="text-xs mt-1 font-normal text-white opacity-60 font-lexend tracking-[0.065rem] uppercase"
              >
                Companies
              </p>
            </div>

            <div class="flex flex-col">
              <h2 class="text-2xl text-white font-bold">314</h2>
              <p
                class="text-xs mt-1 font-normal text-white opacity-60 font-lexend tracking-[0.065rem] uppercase"
              >
                Templates
              </p>
            </div>

            <div class="flex flex-col">
              <h2 class="text-2xl text-white font-bold">12M+</h2>
              <p
                class="text-xs mt-1 font-normal text-white opacity-60 font-lexend tracking-[0.065rem] uppercase"
              >
                Queries
              </p>
            </div>
          </div>
        </div>
      </section>
      <!-- desktop -->
      <section class="hidden md:grid relative place-items-center">
        <div class="absolute w-full h-full bg-[#AB5CDB] bg-opacity-60"></div>
        <img
          class="w-full block"
          src="/challenges/9-stats-preview-card-component/image-header-desktop.jpg"
          alt=""
        />
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
useSeoMeta({
  title: "Front-End Mentor - Stat Preview Card Component",
  description:
    "Front-End Mentor - Stat Preview Card Component with tailwind css",
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Lexend+Deca&display=swap");
.stats-preview-container {
  font-family: "Inter", sans-serif;
}

.font-lexend {
  font-family: "Lexend Deca", sans-serif;
}
</style>
