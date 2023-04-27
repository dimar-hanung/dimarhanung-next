<template>
  <div
    class="faq-accordion-card-container min-h-screen grid place-items-center py-60 md:py-4 px-4"
  >
    <main
      class="card block md:flex bg-white w-full max-w-[920px] h-full md:max-h-[509px] relative"
    >
      <section
        class="absolute md:relative w-full md:w-1/2 h-full top-0 md:top-auto"
      >
        <div class="h-full md:overflow-hidden relative">
          <illustrationWomanOnlineDesktop
            class="absolute hidden md:block md:top-1/2 -translate-y-1/2 md:-translate-x-20"
          />
          <illustrationWomanOnlineMobile
            class="block md:hidden absolute min-w-[240px] w-[240px] -top-5 -translate-y-1/2 left-1/2 -translate-x-1/2"
          />

          <bgPatternMobile
            class="block md:hidden absolute top-0 left-1/2 -translate-x-1/2"
          />

          <bgPatternDesktop
            class="hidden md:block absolute left-0 -top-1/2 -translate-y-10 -translate-x-[60%]"
          />
        </div>
        <illustrationBoxDesktop
          class="hidden md:block absolute z-10 top-0 md:top-1/2 md:-translate-x-24 left-1 -translate-y-10"
        />
      </section>

      <section
        class="w-full md:w-1/2 pt-16 px-8 pb-8 overflow-y-auto rounded-r-lg z-20 relative"
      >
        <h1 class="font-bold text-3xl">FAQ</h1>

        <v-details
          class="mt-11"
          :title="'How many team members can I invite?'"
          content="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
        <v-details
          class="mt-11"
          :title="'How do I reset my password?'"
          content="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
        <v-details
          class="mt-11"
          :title="'Can I cancel my subscription?'"
          content="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
        <v-details
          class="mt-11"
          :title="'Do you provide additional support?'"
          content="lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        />
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import bgPatternDesktop from "./components/bg-pattern-desktop.vue";
import bgPatternMobile from "./components/bg-pattern-mobile.vue";
import vDetails from "./components/v-details.vue";
import illustrationBoxDesktop from "./components/illustration-box-desktop.vue";
import illustrationWomanOnlineDesktop from "./components/illustration-woman-online-desktop.vue";
import illustrationWomanOnlineMobile from "./components/illustration-woman-online-mobile.vue";
</script>

<style scoped>
.faq-accordion-card-container {
  background: linear-gradient(180deg, #b068e9 0%, #6463e7 100%);
}

.card {
  box-shadow: 0px 50px 50px -20px rgba(53, 18, 122, 0.497159);
  border-radius: 23px;
}

/* custom scroll thumb */
::-webkit-scrollbar {
  width: 10px;
}
</style>
