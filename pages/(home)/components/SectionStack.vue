<template>
  <section
    aria-labelledby="stack-heading"
    class="mx-auto max-w-7xl px-5 pb-[72px] sm:px-6 md:pb-[100px]"
  >
    <div class="border-t border-muted-200 pt-[72px] dark:border-muted-700 md:pt-[100px]">
      <h2 id="stack-heading" class="section-title">{{ t.stack.title }}</h2>
      <p class="section-sub">{{ t.stack.note }}</p>

      <dl
        class="mt-10 divide-y divide-muted-300 dark:divide-muted-800"
      >
        <div
          v-for="group in groups"
          :key="group.key"
          class="grid grid-cols-1 gap-4 py-6 first:pt-0 last:pb-0 lg:grid-cols-12"
        >
          <dt class="text-xl font-bold lg:col-span-3 lg:pt-1.5">{{ t.stack.groups[group.key] }}</dt>
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
const { t } = useHomeI18n();

// darkInvert: black monochrome marks that would vanish on the dark chip.
type Tool = { name: string; icon: string; darkInvert?: boolean };

const groups: { key: "frontend" | "backend" | "ai"; tools: Tool[] }[] = [
  {
    key: "frontend",
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
    key: "backend",
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
    key: "ai",
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
