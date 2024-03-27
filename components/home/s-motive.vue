<template>
  <div
    ref="quoteWrapper"
    class="text-5xl text-center text-muted-800 mt-24 h-screen grid place-items-center relative rounded-3xl"
  >
    <div
      class="absolute top-0 left-0 w-full h-full overflow-hidden rounded-3xl py-8"
    >
      <canvas
        ref="canvasRef"
        class="w-full h-full bg-white dark:bg-black rounded-3xl"
      ></canvas>
    </div>

    <p
      ref="quoteContent"
      class="py-24 border-t border-b border-muted-800 relative bg-slate-100 bg-opacity-40 w-full backdrop-blur-2xl"
    >
      Sekecil apapun progress, itu adalah progress.
    </p>
  </div>
</template>

<script setup lang="ts">
const quoteWrapper = ref<HTMLElement | null>(null);
const quoteContent = ref<HTMLElement | null>(null);
let scrolling = false;
let debounceTimeout: NodeJS.Timeout | number | null = null;
const debounceTime = 200; // Adjust the debounce time as needed (in milliseconds)
const isAnimating = ref(false);

const easeInOutQuad = (t: number) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

const smoothScroll = (distance: number) => {
  if (scrolling) return;
  scrolling = true;

  const startPosition = window.scrollY;
  const startTime = performance.now();

  const animateScroll = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    const duration = 500; // Adjust the duration as needed

    if (elapsedTime < duration) {
      const timeProgress = elapsedTime / duration;
      const easedProgress = easeInOutQuad(timeProgress);
      window.scrollTo(0, startPosition + distance * easedProgress);
      // console.log("scrolling", debounceTimeout);
      requestAnimationFrame(animateScroll);
    } else {
      window.scrollTo(0, startPosition + distance);
      scrolling = false;
    }
  };

  requestAnimationFrame(animateScroll);
};

useEventListener("scroll", () => {
  if (debounceTimeout) {
    clearTimeout(debounceTimeout);
    scrolling = false;
  }

  debounceTimeout = setTimeout(() => {
    const percentage =
      ((window.innerHeight -
        (quoteWrapper.value?.getBoundingClientRect().top ?? 0)) /
        window.innerHeight) *
      100;

    if (percentage > 0 && percentage < 100) {
      startAnimation();
    }

    if (percentage <= -20 || percentage >= 120) {
      stopAnimation();
    }

    if (percentage > 40 && percentage < 100) {
      const scrollDistance =
        (quoteWrapper.value?.getBoundingClientRect().height ?? 0) *
        (1 - percentage / 100);

      smoothScroll(scrollDistance);
    } else {
      scrolling = false;
    }
  }, debounceTime);
});

// s

const canvasRef = ref<HTMLCanvasElement | null>(null);

interface Circle {
  x: number;
  y: number;
  radius: number;
  color: string;
  blurRadius: number;
  speed: number;
}

const circles: Circle[] = [];

const createCircle = (): Circle => {
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  const radius = Math.random() * 1 + 1;
  const color = `hsl(${Math.random() * 360}, 100%, 60%)`;
  const blurRadius = Math.random() * 50 + 10;
  const speed = Math.random() * 2;
  return { x, y, radius, color, blurRadius, speed };
};

const animate = () => {
  if (!canvasRef.value) return;

  const ctx = canvasRef.value.getContext("2d");
  if (!ctx) return;

  circles.forEach((circle) => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);

    ctx.fillStyle = circle.color;

    // ctx.fillStyle = "#00000017";
    ctx.shadowColor = circle.color;
    ctx.shadowBlur = circle.blurRadius;
    ctx.strokeStyle = "black";

    ctx.fill();
    circle.radius += circle.blurRadius / 10000;
    circle.blurRadius += circle.speed * 2;
    if (circle.blurRadius > Math.floor(Math.random() * 1000) + 500) {
      const index = circles.indexOf(circle);
      circles.splice(index, 1);
    }
  });

  if (circles.length < 10) {
    circles.push(createCircle());
  }

  if (!isAnimating.value) return;

  requestAnimationFrame(animate);
};

const startAnimation = () => {
  if (isAnimating.value) return;
  isAnimating.value = true;
  animate();
};

const stopAnimation = () => {
  isAnimating.value = false;
};

onMounted(() => {
  if (canvasRef.value) {
    canvasRef.value.width = window.innerWidth;
    canvasRef.value.height = window.innerHeight;
    // animate();
  }
});
</script>
