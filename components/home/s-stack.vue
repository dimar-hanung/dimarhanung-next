<template>
  <section
    class="mt-8 p-5 py-12 bg-gradient-to-br from-slate-50 dark:from-black to-primary-100 dark:to-primary-950 rounded-[2rem] relative z-[1] shadow-2xl"
  >
    <h3 class="text-4xl text-center">Main Tech Stack</h3>
    <div class="flex flex-wrap justify-center gap-4 mt-8">
      <div>
        <Icon
          class="grayscale hover:grayscale-0 transition-all"
          name="logos:vue"
          size="100"
        ></Icon>
        <p class="text-center mt-2">VueJs</p>
      </div>
      <div>
        <Icon
          class="grayscale hover:grayscale-0 transition-all"
          name="logos:nuxt-icon"
          size="100"
        ></Icon>
        <p class="text-center mt-2">NuxtJs</p>
      </div>
      <div>
        <Icon
          class="grayscale hover:grayscale-0 transition-all"
          name="logos:tailwindcss-icon"
          size="100"
        ></Icon>
        <p class="text-center mt-2">TailwindCss</p>
      </div>
      <div>
        <Icon
          class="grayscale hover:grayscale-0 transition-all"
          name="logos:nestjs"
          size="100"
        ></Icon>
        <p class="text-center mt-2">NestJs</p>
      </div>
      <div>
        <Icon
          class="grayscale hover:grayscale-0 transition-all"
          name="logos:postgresql"
          size="100"
        ></Icon>
        <p class="text-center mt-2">PostgreSQL</p>
      </div>
      <div>
        <Icon
          class="grayscale hover:grayscale-0 transition-all"
          name="logos:typescript-icon"
          size="100"
        ></Icon>
        <p class="text-center mt-2">TypeScript</p>
      </div>
      <div>
        <Icon
          class="grayscale hover:grayscale-0 transition-all"
          name="logos:git-icon"
          size="100"
        ></Icon>
        <p class="text-center mt-2">Git</p>
      </div>
      <div>
        <Icon
          class="grayscale hover:grayscale-0 transition-all"
          name="logos:azure-icon"
          size="100"
        ></Icon>
        <p class="text-center mt-2">Azure</p>
      </div>
    </div>
    <h3 class="text-4xl text-center mt-20">Secondary Tech Stack</h3>
    <div class="flex flex-wrap justify-center gap-4 mt-8">
      <div>
        <Icon
          name="logos:react"
          class="grayscale hover:grayscale-0 transition-all"
          size="100"
        ></Icon>
        <p class="text-center mt-2">ReactJS</p>
      </div>

      <div>
        <Icon
          name="logos:mongodb"
          class="bg-white rounded-full p-2 grayscale hover:grayscale-0 transition-all"
          size="100"
        ></Icon>
        <p class="text-center mt-2">MongoDB</p>
      </div>
      <div>
        <Icon
          name="logos:flutter"
          class="grayscale hover:grayscale-0 transition-all"
          size="100"
        ></Icon>
        <p class="text-center mt-2">Flutter</p>
      </div>
      <div>
        <Icon
          name="logos:python"
          class="grayscale hover:grayscale-0 transition-all"
          size="100"
        ></Icon>
        <p class="text-center mt-2">Python</p>
      </div>
    </div>
    <h3 class="text-4xl text-center mt-20">Exploring</h3>
    <div class="flex flex-wrap justify-center gap-4 mt-8">
      <div>
        <Icon
          class="dark:bg-white p-2 rounded-full grayscale hover:grayscale-0 transition-all"
          name="logos:openai-icon"
          size="100"
        ></Icon>
        <p class="text-center mt-2">OpenAI</p>
      </div>
      <div>
        <Icon
          name="logos:anthropic"
          class="bg-white rounded-full p-2 grayscale hover:grayscale-0 transition-all"
          size="100"
        ></Icon>
        <p class="text-center mt-2">Anthropic</p>
      </div>
      <div>
        <Icon
          name="logos:hugging-face-icon"
          class="grayscale hover:grayscale-0 transition-all"
          size="100"
        ></Icon>
        <p class="text-center mt-2">Hugging Face</p>
      </div>
      <div>
        <Icon
          name="logos:bun"
          class="grayscale hover:grayscale-0 transition-all"
          size="100"
        ></Icon>
        <p class="text-center mt-2">Bun</p>
      </div>
      <div>
        <Icon
          name="logos:firebase"
          class="grayscale hover:grayscale-0 transition-all"
          size="100"
        ></Icon>
        <p class="text-center mt-2">Firebase</p>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts"></script>
