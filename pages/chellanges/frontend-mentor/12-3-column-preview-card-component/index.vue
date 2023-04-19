<template>
  <div class="min-h-screen bg-[#F2F2F2] grid md:place-items-center md:p-3">
    <main
      class="flex flex-wrap w-full h-full max-h-[500px] max-w-[920px] rounded-lg md:overflow-hidden"
    >
      <section class="w-full md:w-1/3 bg-[#E28625] h-full p-12 relative">
        <icon-sedans />
        <h1
          class="font-big-shoulders text-[#F2F2F2] text-[2.5rem] mt-9 font-bold"
        >
          SEDANS
        </h1>
        <p class="font-lexend text-white opacity-75">
          Choose a sedan for its affordability and excellent fuel economy. Ideal
          for cruising in the city or on your next road trip.
        </p>
        <button
          class="py-3 px-8 text-[#E28625] bg-[#F2F2F2] transition-all border-2 border-transparent hover:border-white hover:bg-transparent hover:text-white rounded-3xl absolute bottom-12"
        >
          Learn More
        </button>
      </section>
      <section class="w-full md:w-1/3 bg-[#006971] h-full p-12 relative">
        <icon-suvs />
        <h1
          class="font-big-shoulders text-[#F2F2F2] text-[2.5rem] mt-9 font-bold"
        >
          SUVS
        </h1>
        <p class="font-lexend text-white opacity-75">
          Take an SUV for its spacious interior, power, and versatility. Perfect
          for your next family vacation and off-road adventures.
        </p>
        <button
          class="py-3 px-8 text-[#006971] bg-[#F2F2F2] transition-all border-2 border-transparent hover:border-white hover:bg-transparent hover:text-white rounded-3xl absolute bottom-12"
        >
          Learn More
        </button>
      </section>
      <section class="w-full md:w-1/3 bg-[#004140] h-full p-12 relative">
        <icon-luxury />
        <h1
          class="font-big-shoulders text-[#F2F2F2] text-[2.5rem] mt-9 font-bold"
        >
          LUXURY
        </h1>
        <p class="font-lexend text-white opacity-75">
          Cruise in the best car brands without the bloated prices. Enjoy the
          enhanced comfort of a luxury rental and arrive in style.
        </p>
        <button
          class="py-3 px-8 text-[#004140] bg-[#F2F2F2] transition-all border-2 border-transparent hover:border-white hover:bg-transparent hover:text-white rounded-3xl absolute bottom-12"
        >
          Learn More
        </button>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import iconLuxury from "./components/icon-luxury.vue";
import iconSedans from "./components/icon-sedans.vue";
import iconSuvs from "./components/icon-suvs.vue";
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700&family=Lexend+Deca&display=swap");

.font-big-shoulders {
  font-family: "Big Shoulders Display", cursive;
}

.font-lexend {
  font-family: "Lexend Deca", sans-serif;
}
</style>
