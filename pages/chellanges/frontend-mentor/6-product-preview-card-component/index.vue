<template>
  <div class="min-h-screen bg-[#F2EAE2] grid place-items-center px-4">
    <main
      class="bg-white flex flex-wrap max-w-[37.5rem] rounded-[0.625rem] overflow-hidden"
    >
      <section class="w-full sm:w-1/2">
        <img
          class="hidden sm:block w-full"
          src="/chellanges/6-product-preview-card-component/images/image-product-desktop.jpg"
          alt=""
        />
        <img
          class="block sm:hidden w-full"
          src="/chellanges/6-product-preview-card-component/images/image-product-mobile.jpg"
          alt=""
        />
      </section>
      <section class="w-full sm:w-1/2 p-6 sm:p-8">
        <p class="font-montserrat tracking-[0.313rem] text-xs text-[#6C7289]">
          PERFUME
        </p>
        <h1
          class="font-fraunces text-[2rem] leading-[2rem] text-[#1C232B] mt-5"
        >
          Gabrielle Essence Eau De Parfum
        </h1>
        <h2
          class="mt-4 sm:mt-6 text-[#6C7289] text-sm leading-[1.438rem] font-montserrat"
        >
          A floral, solar and voluptuous interpretation composed by Olivier
          Polge, Perfumer-Creator for the House of CHANEL.
        </h2>
        <div class="flex place-items-center mt-5">
          <div class="text-[#3D8168] font-bold text-[2rem] font-fraunces mr-5">
            $149.99
          </div>
          <div
            class="text-[#6C7289] font-montserrat font-medium text-sm line-through"
          >
            $169.99
          </div>
        </div>

        <button
          class="bg-[#3D8168] hover:bg-[#1A4032] transition-all mt-6 rounded-lg text-sm text-white font-bold font-montserrat block w-full py-3"
        >
          <div class="flex justify-center mx-auto">
            <icon-cart class="mr-3" /> Add to Card
          </div>
        </button>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import iconCart from "./components/icon-cart.vue";
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Fraunces:wght@700&family=Montserrat:wght@500;700&display=swap");

.font-fraunces {
  font-family: "Fraunces", serif;
}
.font-montserrat {
  font-family: "Montserrat", sans-serif;
}
</style>
