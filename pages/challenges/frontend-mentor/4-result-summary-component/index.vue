<template>
  <div
    class="grid place-items-center"
    :class="[
      $route.query.type == 'solution'
        ? 'bg-white min-h-[1080px]'
        : 'min-h-screen bg-[#ECF2FF]',
    ]"
  >
    <main
      class="card sm:flex w-full sm:max-w-[736px] h-full sm:max-h-[512px] bg-white sm:rounded-[32px] overflow-hidden"
    >
      <section
        class="card__result text-center w-full sm:w-1/2 pt-[24px] sm:pt-[38px] pb-[40px] sm:pb-[55px] rounded-b-[32px] sm:rounded-r-[32px]"
      >
        <h3 class="text-[#CAC9FF] text-lg sm:text-2xl font-bold">
          Your Result
        </h3>
        <div
          class="card__score w-[140px] sm:w-[200px] h-[140px] sm:h-[200px] rounded-full overflow-hidden grid place-items-center mx-auto mt-[24px] sm:mt-[35px]"
        >
          <div>
            <div
              class="text-[56px] leading-[72px] sm:text-[72px] font-extrabold"
            >
              76
            </div>
            <div
              class="text-[#CAC9FF] font-bold sm:text-lg opacity-[0.52] sm:mt-1"
            >
              of 100
            </div>
          </div>
        </div>
        <h3 class="mt-[24px] sm:mt-[28px] text-[24px] sm:text-[32px] font-bold">
          Great
        </h3>
        <p
          class="mt-[8px] sm:mt-[14px] text-[#CAC9FF] font-medium sm:text-lg leading-[21px] sm:leading-[23px] max-w-[260px] mx-auto"
        >
          Your scored higher than 65% of the people who have taken these tests.
        </p>
      </section>
      <section
        class="w-full pb-[30px] sm:pb-0 sm:w-1/2 px-[30px] sm:px-[40px] pt-[24px] sm:pt-[38px]"
      >
        <h3 class="text-[#303B59] font-bold text-[18px] sm:text-[24px]">
          Summary
        </h3>

        <ul>
          <li class="summary__item --red mt-[24px] sm:mt-[28px]">
            <div class="flex place-items-center">
              <icon-reaction class="mr-3" />
              <p class="font-medium text-lg">Reaction</p>
            </div>
            <p class="text-lg font-bold text-[#303B59]">
              <span class="mr-2">80</span>
              <span class="opacity-50">/ 100</span>
            </p>
          </li>
          <li class="summary__item --yellow mt-4">
            <div class="flex place-items-center">
              <icon-memory class="mr-3" />
              <p class="font-medium text-lg">Memory</p>
            </div>
            <p class="text-lg font-bold text-[#303B59]">
              <span class="mr-2">92</span>
              <span class="opacity-50">/ 100</span>
            </p>
          </li>
          <li class="summary__item --green mt-4">
            <div class="flex place-items-center">
              <icon-verbal class="mr-3" />
              <p class="font-medium text-lg">Verbal</p>
            </div>
            <p class="text-lg font-bold text-[#303B59]">
              <span class="mr-2">61</span>
              <span class="opacity-50">/ 100</span>
            </p>
          </li>
          <li class="summary__item --blue mt-4">
            <div class="flex place-items-center">
              <icon-visual class="mr-3" />
              <p class="font-medium text-lg">Visual</p>
            </div>
            <p class="text-lg font-bold text-[#303B59]">
              <span class="mr-2">73</span>
              <span class="opacity-50">/ 100</span>
            </p>
          </li>
        </ul>

        <button class="button__primary mt-[41px]">Continue</button>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import iconMemory from "./components/icon-memory.vue";
import iconReaction from "./components/icon-reaction.vue";
import iconVerbal from "./components/icon-verbal.vue";
import iconVisual from "./components/icon-visual.vue";

useSeoMeta({
  title: "Front-End Mentor - Summary Component",
  description: "Front-End Mentor - Summary Component with tailwind css",
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;700&family=Outfit:wght@400;700;800&family=Red+Hat+Display:wght@500;900&family=Space+Grotesk:wght@400;500;700&display=swap");

.card {
  font-family: "Hanken Grotesk", sans-serif;
  font-weight: 500;
  color: #ffffff;
  box-shadow: 0px 30px 60px rgba(61, 108, 236, 0.15);
}
.card__result {
  background: linear-gradient(180deg, #7755ff 0%, #6943ff 0.01%, #2f2ce9 100%);
}

.card__score {
  background: linear-gradient(
    180deg,
    #4d21c9 0%,
    rgba(37, 33, 201, 0) 100%,
    rgba(37, 33, 201, 0) 100%
  );
}

.summary__item {
  @apply w-full h-[56px] flex justify-between place-items-center px-4 rounded-xl;
}

.summary__item.--red {
  color: #ff5555;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.95)
    ),
    #ff5555;
}

.summary__item.--yellow {
  color: #ffb21e;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.95)
    ),
    #ffb21e;
}

.summary__item.--green {
  color: #00bb8f;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.95)
    ),
    #00bb8f;
}

.summary__item.--blue {
  color: #1125d6;
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.95)
    ),
    #1125d6;
}

.button__primary {
  @apply bg-[#303B59] rounded-[128px] h-[56px] w-full text-lg font-bold;
}
.button__primary:hover {
  background: linear-gradient(180deg, #7755ff 0%, #6943ff 0.01%, #2f2ce9 100%);
}
</style>
