<template>
  <div
    class="relative min-h-screen bg-gray-900 flex items-center justify-center p-5 overflow-hidden perspective-1000"
  >
    <!-- 3D rotating container -->
    <div
      class="relative w-full max-w-xl transition-transform duration-200 ease-out"
      :style="{
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transformStyle: 'preserve-3d',
      }"
    >
      <!-- Glass card -->
      <div
        class="bg-white/10 rounded-2xl shadow-xl backdrop-blur-md p-8 text-white transition-all duration-300 ease-out overflow-hidden"
        @mouseenter="isHovering = true"
        @mouseleave="isHovering = false"
        :style="{
          boxShadow: isHovering
            ? '0 0 40px rgba(255, 255, 255, 0.2)'
            : '0 0 20px rgba(255, 255, 255, 0.1)',
          transform: 'translateZ(50px)',
        }"
      >
        <!-- Inner light reflection effect -->
        <div
          class="absolute inset-0 opacity-50 transition-opacity duration-300"
          :style="{
            background: `radial-gradient(circle at ${lightPosition}, rgba(255,255,255,0.2) 0%, transparent 50%)`,
            opacity: isHovering ? 0.8 : 0.5,
          }"
        ></div>

        <!-- Content -->
        <div class="relative z-10">
          <h1 class="text-4xl font-bold mb-4">Dimar Hanung</h1>
          <p class="mb-6">
            Experience true 3D depth. Move your cursor to rotate the interface!
          </p>
          <div class="mb-6">
            <input
              type="email"
              placeholder="Enter your email"
              class="w-full px-4 py-2 rounded-md bg-white/10 placeholder-gray-300 text-white outline-hidden focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>
          <button
            class="bg-blue-500 hover:bg-blue-600 transition-all duration-300 px-6 py-2 rounded-md text-white font-semibold"
          >
            Dive into 3D
          </button>
        </div>
      </div>

      <!-- 3D floating orbs -->
      <div
        class="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"
        style="transform: translateZ(-100px)"
      ></div>
      <div
        class="absolute top-1/3 right-1/4 w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"
        style="transform: translateZ(-150px)"
      ></div>
      <div
        class="absolute bottom-1/4 left-1/3 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
        style="transform: translateZ(-200px)"
      ></div>
    </div>

    <!-- Static background light effect -->
    <div
      class="absolute inset-0 opacity-50"
      :style="{
        background: `radial-gradient(600px circle at ${lightPosition}, rgba(29, 78, 216, 0.15), transparent 80%)`,
      }"
    ></div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from "vue";

export default {
  name: "DarkModeGlassmorphismLandingPage",
  setup() {
    const rotation = ref({ x: 0, y: 0 });
    const isHovering = ref(false);

    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      const x = (clientY - innerHeight / 2) / 20;
      const y = (innerWidth / 2 - clientX) / 20;

      rotation.value = { x, y };
    };

    onMounted(() => {
      window.addEventListener("mousemove", handleMouseMove);
    });

    onUnmounted(() => {
      window.removeEventListener("mousemove", handleMouseMove);
    });

    const lightPosition = computed(() => {
      const x = 50 + rotation.value.y * 2;
      const y = 50 - rotation.value.x * 2;
      return `${x}% ${y}%`;
    });

    return {
      rotation,
      isHovering,
      lightPosition,
    };
  },
};
</script>

<style scoped>
.perspective-1000 {
  perspective: 1000px;
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
</style>
