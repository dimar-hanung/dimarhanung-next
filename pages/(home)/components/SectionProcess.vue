<template>
  <section id="process" aria-labelledby="process-heading" class="scroll-mt-16 py-[72px] md:py-[100px]">
    <div class="mx-auto max-w-7xl px-5 sm:px-6">
      <h2 id="process-heading" class="section-title mb-[26px] sm:mb-10">{{ t.process.title }}</h2>

      <ol class="steps grid grid-cols-1 gap-[30px] sm:grid-cols-2 sm:gap-x-0 sm:gap-y-9 lg:grid-cols-4 lg:gap-0">
        <li v-for="(step, index) in t.process.steps" :key="index" class="step relative">
          <span
            class="step-number z-[1] grid h-[46px] w-[46px] place-items-center rounded-full border-2 border-primary-500 bg-muted-100 text-[1.0625rem] font-bold text-primary-600 dark:bg-muted-900 dark:text-primary-400"
            aria-hidden="true"
            >{{ index + 1 }}</span
          >
          <h3 class="mt-2.5 text-[1.1875rem] font-bold sm:mt-5">{{ step.title }}</h3>
          <p class="mt-1.5 text-[0.9375rem] leading-normal text-muted-600 dark:text-muted-300">
            {{ step.body }}
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useHomeI18n();
</script>

<style scoped>
/* Dashed connector from each number to the next step. */
/* Phones: one column, number on the left, connector runs down. */
.step {
  padding-left: 64px;
}

.step-number {
  position: absolute;
  top: 0;
  left: 0;
}

.step::before {
  content: "";
  position: absolute;
  top: 46px;
  left: 22px;
  bottom: -30px;
  width: 2px;
  background: repeating-linear-gradient(
    180deg,
    var(--app-primary-300) 0 6px,
    transparent 6px 12px
  );
}

.step:last-child::before {
  display: none;
}

/* From sm: numbers sit above the text, connector runs right. */
@media (min-width: 640px) {
  .step {
    padding-left: 0;
    padding-right: 28px;
  }

  .step-number {
    position: relative;
  }

  .step::before {
    top: 22px;
    left: 46px;
    right: 0;
    bottom: auto;
    width: auto;
    height: 2px;
    background: repeating-linear-gradient(
      90deg,
      var(--app-primary-300) 0 6px,
      transparent 6px 12px
    );
  }

  /* Two columns: no connector out of the right-hand column. */
  .step:nth-child(2n)::before {
    display: none;
  }
}

@media (min-width: 1024px) {
  .step:nth-child(2n)::before {
    display: block;
  }

  .step:last-child::before {
    display: none;
  }
}
</style>
