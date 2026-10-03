<template>
  <section
    aria-labelledby="how-i-work-heading"
    class="container mx-auto px-2 text-muted-900 dark:text-muted-100"
  >
    <div
      class="grid grid-cols-1 gap-12 border-t border-primary-500/25 pt-12 lg:grid-cols-12"
    >
      <!-- The claim -->
      <div class="lg:col-span-5">
        <p class="text-base text-muted-500">How I work</p>
        <h2
          id="how-i-work-heading"
          class="mt-3 text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Fast, and
          <span class="text-primary-600 dark:text-primary-400"
            >not&nbsp;AI&nbsp;slop.</span
          >
        </h2>
        <p class="mt-6 max-w-md text-lg text-muted-600 dark:text-muted-400">
          I vibe code. AI writes a lot of the first draft, so an idea becomes
          working software not in
          <PencilHighlight tone="negative">weeks</PencilHighlight>, but in
          <PencilHighlight tone="positive" :delay="400">days</PencilHighlight>.
          What keeps it from turning into
          <PencilHighlight tone="negative" :delay="800">AI slop</PencilHighlight>
          is
          <PencilHighlight tone="positive" :delay="1200"
            >{{ yearsLabel }} years</PencilHighlight
          >
          of professional engineering: I know what good code looks like, so I
          can tell when the output isn't.
        </p>
      </div>

      <!-- What backs the claim -->
      <ol
        class="divide-y divide-muted-300 dark:divide-muted-800 lg:col-span-7"
      >
        <li
          v-for="(point, index) in points"
          :key="point.title"
          class="grid grid-cols-[2.5rem_1fr] gap-x-4 py-6 first:pt-0 last:pb-0"
        >
          <span
            class="text-lg font-bold tabular-nums text-primary-600 dark:text-primary-400"
            aria-hidden="true"
            >{{ String(index + 1).padStart(2, "0") }}</span
          >
          <div>
            <h3 class="text-xl font-bold">{{ point.title }}</h3>
            <p class="mt-2 text-base text-muted-600 dark:text-muted-400">
              <template v-for="part in point.body" :key="part.text">
                <PencilHighlight
                  v-if="part.tone"
                  :tone="part.tone"
                  :delay="part.tone === 'positive' ? 400 : 0"
                  >{{ part.text }}</PencilHighlight
                >
                <template v-else>{{ part.text }}</template>
              </template>
            </p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import PencilHighlight from "./PencilHighlight.vue";

const yearsLabel = "6+";

// Each body reads left to right; one red (negative) phrase, then one green (positive) phrase.
type BodyPart = { text: string; tone?: "negative" | "positive" };

const points: { title: string; body: BodyPart[] }[] = [
  {
    title: "Speed comes from AI",
    body: [
      { text: "I work with AI coding agents every day. Scaffolding and " },
      { text: "boilerplate", tone: "negative" },
      { text: " go quickly, so most of my time goes to the parts that need a " },
      { text: "human decision", tone: "positive" },
      { text: "." },
    ],
  },
  {
    title: `Judgment comes from ${yearsLabel} years in production`,
    body: [
      { text: "Years of shipping and maintaining real products taught me where " },
      { text: "things break", tone: "negative" },
      { text: ": state, edge cases, performance, and unreadable code. Every AI change " },
      { text: "gets checked", tone: "positive" },
      { text: " against that before it lands." },
    ],
  },
  {
    title: "Stable, not just a demo",
    body: [
      { text: "A " },
      { text: "quick demo", tone: "negative" },
      { text: " is easy. I read the diff, test in a real browser, and keep the code plain enough for a team to maintain, so it " },
      { text: "still works next month", tone: "positive" },
      { text: "." },
    ],
  },
  {
    title: "Adaptive by habit",
    body: [
      { text: "Tools change every few months. I " },
      { text: "drop what stops helping", tone: "negative" },
      { text: " and " },
      { text: "pick up new ones quickly", tone: "positive" },
      { text: ", keeping only what makes the work better." },
    ],
  },
];
</script>

