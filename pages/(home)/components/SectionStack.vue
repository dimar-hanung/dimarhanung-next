<template>
  <section
    aria-labelledby="stack-heading"
    class="container mx-auto px-2 text-muted-900 dark:text-muted-100"
  >
    <div class="border-t border-primary-500/25 pt-12">
      <p class="text-base text-muted-500">Stack</p>
      <h2
        id="stack-heading"
        class="mt-3 text-4xl font-bold tracking-tight sm:text-5xl"
      >
        Tools I ship with
      </h2>

      <dl
        class="mt-10 divide-y divide-muted-300 dark:divide-muted-800"
      >
        <div
          v-for="group in groups"
          :key="group.title"
          class="grid grid-cols-1 gap-4 py-6 first:pt-0 last:pb-0 lg:grid-cols-12"
        >
          <dt class="text-xl font-bold lg:col-span-3 lg:pt-1.5">{{ group.title }}</dt>
          <dd class="flex flex-wrap gap-2 lg:col-span-9">
            <span
              v-for="tool in group.tools"
              :key="tool.name"
              class="flex items-center gap-2 rounded-lg bg-muted-50 px-3 py-2 text-base font-medium dark:bg-muted-800"
            >
              <Icon
                :name="tool.icon"
                size="24"
                :class="{ 'dark:invert': tool.darkInvert }"
                aria-hidden="true"
              />
              {{ tool.name }}
            </span>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup lang="ts">
// darkInvert: black monochrome marks that would vanish on the dark chip.
type Tool = { name: string; icon: string; darkInvert?: boolean };

const groups: { title: string; tools: Tool[] }[] = [
  {
    title: "Frontend",
    tools: [
      { name: "Vue", icon: "logos:vue" },
      { name: "Nuxt", icon: "logos:nuxt-icon" },
      { name: "React", icon: "logos:react" },
      { name: "TypeScript", icon: "logos:typescript-icon" },
      { name: "Tailwind CSS", icon: "logos:tailwindcss-icon" },
      { name: "Flutter", icon: "logos:flutter-icon" },
    ],
  },
  {
    title: "Backend & Data",
    tools: [
      { name: "NestJS", icon: "logos:nestjs" },
      { name: "PostgreSQL", icon: "logos:postgresql" },
      { name: "MongoDB", icon: "logos:mongodb-icon" },
      { name: "Python", icon: "logos:python" },
      { name: "Bun", icon: "logos:bun" },
      { name: "Firebase", icon: "logos:firebase-icon" },
      { name: "Azure", icon: "logos:azure-icon" },
      { name: "Git", icon: "logos:git-icon" },
    ],
  },
  {
    title: "AI & Tooling",
    tools: [
      { name: "Cursor", icon: "logos:cursor-icon", darkInvert: true },
      { name: "OpenCode", icon: "material-icon-theme:opencode" },
      { name: "GitHub Copilot", icon: "selfhst:github-copilot", darkInvert: true },
      { name: "OpenAI", icon: "logos:openai-icon", darkInvert: true },
      { name: "Claude", icon: "logos:claude-icon" },
      { name: "Hugging Face", icon: "logos:hugging-face-icon" },
    ],
  },
];
</script>
