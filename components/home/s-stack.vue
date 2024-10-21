<template>
  <section
    ref="wrapper"
    @mousemove="updateWind"
    class="text-white mt-8 p-5 py-12 bg-gradient-to-br from-black to-primary-800 dark:to-primary-950 relative z-[1] shadow-2xl overflow-hidden border-y-4 border-primary-500"
  >
    <div
      class="block shadow-inner absolute w-full h-full left-0 top-0 overflow-hidden"
    >
      <canvas class="w-full h-full" ref="canvas"></canvas>
    </div>
    <div
      class="tech-stack-group text-slate-300 hover:text-white dark:hover:text-gray-50 gap-4 z-10 relative transition-all"
    >
      <h3 class="text-3xl text-center z-10 relative" v-motion-pop-visible>
        Main Tech Stack
      </h3>
      <div class="flex flex-wrap justify-center gap-4">
        <Tooltip>
          <div v-motion-roll-visible-right>
            <Icon
              name="logos:vue"
              class="tech-stack-item transform hover:scale-125"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>VueJs</template>
        </Tooltip>

        <Tooltip>
          <div class="hover:scale-105" v-motion-roll-visible-right :delay="50">
            <Icon
              name="logos:nuxt-icon"
              class="tech-stack-item transform hover:scale-125"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>NuxtJs</template>
        </Tooltip>

        <Tooltip>
          <div
            class="transform hover:scale-150"
            v-motion-roll-visible-right
            :delay="100"
          >
            <Icon
              name="logos:tailwindcss-icon"
              class="tech-stack-item block transform hover:scale-125"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>TailwindCss</template>
        </Tooltip>

        <Tooltip>
          <div class="hover:scale-105" v-motion-roll-visible-right :delay="150">
            <Icon
              name="logos:nestjs"
              class="tech-stack-item block transform hover:scale-125"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>NestJs</template>
        </Tooltip>

        <Tooltip>
          <div class="hover:scale-105" v-motion-roll-visible-right :delay="200">
            <Icon
              name="logos:postgresql"
              class="tech-stack-item block transform hover:scale-125"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>PostgreSQL</template>
        </Tooltip>

        <Tooltip>
          <div class="hover:scale-105" v-motion-roll-visible-right :delay="250">
            <Icon
              name="logos:typescript-icon"
              class="tech-stack-item block transform hover:scale-125"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>TypeScript</template>
        </Tooltip>

        <Tooltip>
          <div class="hover:scale-105" v-motion-roll-visible-right :delay="300">
            <Icon
              name="logos:git-icon"
              class="tech-stack-item block transform hover:scale-125"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>Git</template>
        </Tooltip>

        <Tooltip>
          <div class="hover:scale-105" v-motion-roll-visible-right :delay="350">
            <Icon
              name="logos:azure-icon"
              class="tech-stack-item grayscale hover:grayscale-0 transition-all transform hover:scale-125"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>Azure</template>
        </Tooltip>
      </div>
    </div>
    <div
      class="tech-stack-group text-slate-300 hover:text-white gap-4 mt-8 z-10 relative transition-all"
    >
      <h3 class="text-3xl text-center mt-14" v-motion-pop-visible>
        Secondary Tech Stack
      </h3>
      <div class="flex flex-wrap justify-center gap-4">
        <Tooltip>
          <div v-motion-roll-visible-right>
            <Icon
              name="logos:react"
              class="tech-stack-item block transform hover:scale-125"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>ReactJS</template>
        </Tooltip>

        <Tooltip>
          <div v-motion-roll-visible-right :delay="50">
            <Icon
              name="logos:mongodb"
              class="bg-white rounded-full p-2 tech-stack-item transform hover:scale-125"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>MongoDB</template>
        </Tooltip>

        <Tooltip>
          <div
            class="transform hover:scale-150"
            v-motion-roll-visible-right
            :delay="100"
          >
            <Icon
              name="logos:flutter"
              class="tech-stack-item block transform hover:scale-125"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>Flutter</template>
        </Tooltip>

        <Tooltip>
          <div v-motion-roll-visible-right :delay="150">
            <Icon
              name="logos:python"
              class="tech-stack-item block transform hover:scale-125"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>Python</template>
        </Tooltip>
      </div>
    </div>
    <div
      class="tech-stack-group text-slate-300 hover:text-white dark:hover:text-gray-50 gap-4 mt-8 z-10 relative transition-all"
    >
      <h3 class="text-3xl text-center mt-14" v-motion-pop-visible>Exploring</h3>
      <div class="flex flex-wrap justify-center gap-4">
        <Tooltip>
          <div v-motion-roll-visible-right>
            <Icon
              name="logos:openai-icon"
              class="bg-white p-2 rounded-full tech-stack-item transform hover:scale-125"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>OpenAI</template>
        </Tooltip>

        <Tooltip>
          <div class="hover:scale-105" v-motion-roll-visible-right :delay="50">
            <Icon
              name="logos:anthropic"
              class="bg-white rounded-full p-2 tech-stack-item transform hover:scale-125"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>Anthropic</template>
        </Tooltip>

        <Tooltip>
          <div
            class="transform hover:scale-150"
            v-motion-roll-visible-right
            :delay="100"
          >
            <Icon
              name="logos:hugging-face-icon"
              class="tech-stack-item block transform hover:scale-125"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>Hugging Face</template>
        </Tooltip>

        <Tooltip>
          <div class="hover:scale-105" v-motion-roll-visible-right :delay="150">
            <Icon
              name="logos:bun"
              class="tech-stack-item block transform hover:scale-125"
              size="50"
            ></Icon>
          </div>
          <template #tooltip>Bun</template>
        </Tooltip>
        <Tooltip>
          <div class="hover:scale-105" v-motion-roll-visible-right :delay="200">
            <Icon
              name="logos:firebase"
              class="tech-stack-item block transform hover:scale-125"
              size="50"
            ></Icon>
          </div>

          <template #tooltip> Firebase</template>
        </Tooltip>
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
    radius: Math.random() * 1 + 0.1,
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
