<template>
  <section
    ref="wrapper"
    @mousemove="updateWind"
    class="text-white mt-8 p-5 py-12 bg-gradient-to-br from-white dark:from-black to-primary-800 dark:to-primary-950 rounded-[2rem] relative z-[1] shadow-2xl overflow-hidden"
  >
    <div
      class="block shadow-inner absolute w-full h-full left-0 top-0 overflow-hidden"
    >
      <canvas class="w-full h-full" ref="canvas"></canvas>
      <div
        class="w-full h-full inner-shadow absolute left-0 top-0 bg-gradient-to-br from-white dark:from-black z-0"
      ></div>
    </div>
    <div
      class="tech-stack-group text-gray-500 hover:text-primary-600 dark:hover:text-gray-50 gap-4 mt-8 z-10 relative transition-all"
    >
      <h3 class="text-4xl text-center z-10 relative">Main Tech Stack</h3>
      <div class="flex flex-wrap justify-center gap-4">
        <div>
          <Icon class="tech-stack-item" name="logos:vue" size="100"></Icon>
          <p class="text-center mt-2">VueJs</p>
        </div>
        <div>
          <Icon
            class="tech-stack-item"
            name="logos:nuxt-icon"
            size="100"
          ></Icon>
          <p class="text-center mt-2">NuxtJs</p>
        </div>
        <div>
          <Icon
            class="tech-stack-item"
            name="logos:tailwindcss-icon"
            size="100"
          ></Icon>
          <p class="text-center mt-2">TailwindCss</p>
        </div>
        <div>
          <Icon class="tech-stack-item" name="logos:nestjs" size="100"></Icon>
          <p class="text-center mt-2">NestJs</p>
        </div>
        <div>
          <Icon
            class="tech-stack-item"
            name="logos:postgresql"
            size="100"
          ></Icon>
          <p class="text-center mt-2">PostgreSQL</p>
        </div>
        <div>
          <Icon
            class="tech-stack-item"
            name="logos:typescript-icon"
            size="100"
          ></Icon>
          <p class="text-center mt-2">TypeScript</p>
        </div>
        <div>
          <Icon class="tech-stack-item" name="logos:git-icon" size="100"></Icon>
          <p class="text-center mt-2">Git</p>
        </div>
        <div>
          <Icon
            class="tech-stack-item grayscale hover:grayscale-0 transition-all"
            name="logos:azure-icon"
            size="100"
          ></Icon>
          <p class="text-center mt-2">Azure</p>
        </div>
      </div>
    </div>
    <div
      class="tech-stack-group text-gray-500 hover:text-black dark:hover:text-gray-50 gap-4 mt-8 z-10 relative transition-all"
    >
      <h3 class="text-4xl text-center mt-20">Secondary Tech Stack</h3>
      <div class="flex flex-wrap justify-center gap-4">
        <div>
          <Icon name="logos:react" class="tech-stack-item" size="100"></Icon>
          <p class="text-center mt-2">ReactJS</p>
        </div>
        <div>
          <Icon
            name="logos:mongodb"
            class="bg-white rounded-full p-2 tech-stack-item"
            size="100"
          ></Icon>
          <p class="text-center mt-2">MongoDB</p>
        </div>
        <div>
          <Icon name="logos:flutter" class="tech-stack-item" size="100"></Icon>
          <p class="text-center mt-2">Flutter</p>
        </div>
        <div>
          <Icon name="logos:python" class="tech-stack-item" size="100"></Icon>
          <p class="text-center mt-2">Python</p>
        </div>
      </div>
    </div>
    <div
      class="tech-stack-group text-gray-500 hover:text-white dark:hover:text-gray-50 gap-4 mt-8 z-10 relative transition-all"
    >
      <h3 class="text-4xl text-center mt-20">Exploring</h3>
      <div class="flex flex-wrap justify-center gap-4">
        <div>
          <Icon
            class="bg-white p-2 rounded-full tech-stack-item"
            name="logos:openai-icon"
            size="100"
          ></Icon>
          <p class="text-center mt-2">OpenAI</p>
        </div>
        <div>
          <Icon
            name="logos:anthropic"
            class="bg-white rounded-full p-2 tech-stack-item"
            size="100"
          ></Icon>
          <p class="text-center mt-2">Anthropic</p>
        </div>
        <div>
          <Icon
            name="logos:hugging-face-icon"
            class="tech-stack-item"
            size="100"
          ></Icon>
          <p class="text-center mt-2">Hugging Face</p>
        </div>
        <div>
          <Icon name="logos:bun" class="tech-stack-item" size="100"></Icon>
          <p class="text-center mt-2">Bun</p>
        </div>
        <div>
          <Icon name="logos:firebase" class="tech-stack-item" size="100"></Icon>
          <p class="text-center mt-2">Firebase</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const canvas = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId: number;

const numSnowflakes = 200;
const snowflakes: Snowflake[] = [];
let wind = { x: 0, y: 0 };

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
}

function createSnowflake(): Snowflake {
  const spawnFromLeft = Math.random() < 0.5;

  const x = spawnFromLeft
    ? Math.random() * window.innerWidth * -0.2
    : Math.random() * window.innerWidth * 1.2;

  const y = spawnFromLeft
    ? Math.random() * window.innerHeight
    : Math.random() * -window.innerHeight;

  return {
    x,
    y,
    radius: Math.random() * 3 + 1,
    speed: Math.random() * 1 + 0.5,
  };
}

function updateSnowflakes() {
  ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight);

  snowflakes.forEach((snowflake) => {
    ctx!.beginPath();
    ctx!.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
    ctx!.fillStyle = "white";
    ctx!.fill();
    ctx!.closePath();

    snowflake.x += wind.x;
    snowflake.y += wind.y + snowflake.speed;

    if (
      snowflake.y > window.innerHeight ||
      snowflake.x < 0 ||
      snowflake.x > window.innerWidth
    ) {
      const index = snowflakes.indexOf(snowflake);
      snowflakes.splice(index, 1);
      snowflakes.push(createSnowflake());
    }
  });

  animationFrameId = requestAnimationFrame(updateSnowflakes);
}

function updateWind(event: MouseEvent) {
  const rect = canvas.value!.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  wind.x = (mouseX - window.innerWidth / 2) / 300;
  wind.y = mouseY / 400;
}

onMounted(() => {
  ctx = canvas.value?.getContext("2d") || null;

  if (ctx) {
    canvas.value!.width = canvas.value!.offsetWidth;
    canvas.value!.height = canvas.value!.offsetHeight;

    for (let i = 0; i < numSnowflakes; i++) {
      snowflakes.push(createSnowflake());
    }

    // animationFrameId = requestAnimationFrame(updateSnowflakes);
  }
});

function startAnimation() {
  if (animationFrameId) return;
  animationFrameId = requestAnimationFrame(updateSnowflakes);
}

const wrapper = ref<HTMLElement | null>(null);

useEventListener("scroll", () => {
  const percentage =
    ((window.innerHeight - (wrapper.value?.getBoundingClientRect().top ?? 0)) /
      window.innerHeight) *
    100;

  if (percentage > 0 && percentage < 150) {
    startAnimation();
  } else {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = 0;
  }
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped>
.dark .inner-shadow {
  /* inner shadow */
  box-shadow: inset 0px 0px 66px -14px rgba(0, 0, 0, 1);
}

.tech-stack-item {
  margin-top: 2rem;
  filter: grayscale(100%);
  transition: all 0.3s;
}

.tech-stack-group:hover .tech-stack-item {
  filter: grayscale(0%);
}
</style>
