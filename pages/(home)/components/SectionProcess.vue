<template>
  <section id="process" data-part="process" aria-labelledby="process-heading" class="scroll-mt-16 py-(--section-y)">
    <div class="mx-auto max-w-7xl px-5 sm:px-6">
      <h2 id="process-heading" data-part="section-title" class="section-title mb-[26px] sm:mb-10">
        {{ t.process.title }}
      </h2>

      <ol data-part="steps" class="grid grid-cols-1 gap-[30px] sm:grid-cols-2 sm:gap-x-0 sm:gap-y-9 lg:grid-cols-4 lg:gap-0">
        <li v-for="(step, index) in t.process.steps" :key="index" data-part="step" class="relative">
          <span
            data-part="step-number"
            class="z-[1] grid h-[46px] w-[46px] place-items-center text-[1.0625rem] font-bold"
            aria-hidden="true"
            >{{ index + 1 }}</span
          >
          <h3 data-part="step-title" class="mt-2.5 text-[1.1875rem] font-bold sm:mt-5">{{ step.title }}</h3>
          <p data-part="step-body" class="mt-1.5 text-[0.9375rem] leading-normal">
            {{ step.body }}
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
// The dashed connector between steps is drawn in pages/(home)/home-theme.css.
const { t } = useHomeI18n();
</script>
