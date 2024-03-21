<template>
  <div
    @mousemove="updateWind"
    class="grid place-items-center bg-white min-h-screen w-full"
  >
    <div
      class="box-snow w-[1300px] h-[900px] rounded-3xl relative overflow-hidden"
    >
      <canvas
        width="1300"
        height="900"
        class="bg-sky-900 block shadow-inner z-10"
        ref="canvas"
      ></canvas>
      <div
        class="w-full inner-shadow h-full absolute left-0 top-0 bg-gradient-to-br from-[#00eeff70] to-[#ffd00085]"
      ></div>
    </div>
  </div>
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

  wind.x = (mouseX - window.innerWidth / 2) / 100;
  wind.y = mouseY / 100;
}

onMounted(() => {
  ctx = canvas.value?.getContext("2d") || null;

  if (ctx) {
    // canvas.value!.width = window.innerWidth;
    // canvas.value!.height = window.innerHeight;

    for (let i = 0; i < numSnowflakes; i++) {
      snowflakes.push(createSnowflake());
    }

    animationFrameId = requestAnimationFrame(updateSnowflakes);
  }
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped>
.inner-shadow {
  /* inner shadow */
  box-shadow: inset 0px 0px 66px -14px rgba(0, 0, 0, 1);
}
</style>
