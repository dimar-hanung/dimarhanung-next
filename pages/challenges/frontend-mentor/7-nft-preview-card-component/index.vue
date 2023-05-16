<template>
  <div class="min-h-screen bg-[#0D192C] grid place-items-center">
    <main
      class="card bg-[#15263F] p-6 pb-6 max-w-[21.875rem] rounded-[0.938rem]"
    >
      <div class="w-full relative rounded-lg overflow-hidden cursor-pointer">
        <img
          class="w-full"
          src="/challenges/7-nft-preview-card-component/images/image-equilibrium.jpg"
          alt=""
        />

        <div
          class="absolute opacity-0 hover:opacity-100 transition-opacity w-full h-full bg-[#00FFF8] left-0 top-0 grid place-items-center bg-opacity-50"
        >
          <icon-view />
        </div>
      </div>
      <h1
        class="mt-6 text-white font-semibold text-[1.375rem] transition-colors hover:text-[#00FFF8] cursor-pointer"
      >
        Equilibrium #3429
      </h1>
      <h2 class="text-[#8BACD9] mt-4 text-lg font-light">
        Our Equilibrium collection promotes balance and calm.
      </h2>
      <div class="flex justify-between mt-6">
        <div class="flex place-items-center">
          <div class="mr-[0.375rem]"><icon-ethereum /></div>
          <div class="text-[#00FFF8] font-semibold">0.041 ETH</div>
        </div>
        <div class="flex place-items-center">
          <div class="mr-2"><icon-clock /></div>
          <div class="text-[#8BACD9]">3 days left</div>
        </div>
      </div>

      <hr class="mt-6" />

      <div class="flex place-items-center mt-4">
        <img
          class="w-8 h-8 rounded-full border border-white mr-4"
          src="/challenges/7-nft-preview-card-component/images/image-avatar.png"
          alt="creator avatar"
        />

        <div class="text-[#8BACD9]">
          Creation of
          <a
            href="https://www.linkedin.com/in/dimar-hanung/"
            target="_blank"
            class="text-white transition-colors hover:text-[#00FFF8] cursor-pointer"
            >Jules Wyvern</a
          >
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import iconEthereum from "./components/icon-ethereum.vue";
import iconClock from "./components/icon-clock.vue";
import iconView from "./components/icon-view.vue";

useSeoMeta({
  title: "Front-End Mentor - Preview Card Component",
  description: "Front-End Mentor - Preview Card Component with tailwind css",
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap");
.card {
  font-family: "Outfit", sans-serif;
  box-shadow: 0px 25px 50px rgba(0, 0, 0, 0.0952917);
}
</style>
