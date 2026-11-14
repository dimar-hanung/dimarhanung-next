<template>
  <section
    aria-label="Motto"
    class="container mx-auto px-2 text-muted-900 dark:text-muted-100"
  >
    <figure class="border-t border-primary-500/25 pt-12">
      <p class="text-base text-muted-500">Motto</p>
      <blockquote class="mt-3 max-w-4xl">
        <p
          class="gradient-text pb-1 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl lg:text-5xl"
        >
          When it feels like you've hit your limit, that's the moment you need
          to push harder!
        </p>
      </blockquote>
      <div aria-hidden="true" class="mt-6 flex items-center gap-2">
        <div class="rounded-full h-2 w-12 bg-primary-300"></div>
        <div class="rounded-full h-2 w-12 bg-primary-500"></div>
        <div class="rounded-full h-2 w-12 bg-primary-700"></div>
      </div>
    </figure>
  </section>
</template>

<style scoped>
.gradient-text {
  background: linear-gradient(
    270deg,
    var(--app-primary-700),
    var(--app-primary-600),
    var(--app-primary-500),
    var(--app-primary-700)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 300% 100%;
  animation: gradient 8s linear infinite;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.dark .gradient-text {
  background-image: linear-gradient(
    270deg,
    var(--app-primary-400),
    var(--app-primary-300),
    var(--app-primary-200),
    var(--app-primary-400)
  );
}

@keyframes gradient {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: -200% 50%; /* Move beyond the left edge */
  }
}

.gradient-text {
  transition: all 0.3s ease-in-out;
}

.gradient-text:hover {
  text-shadow: 0 0 10px color-mix(in srgb, var(--app-primary-500) 20%, transparent),
    0 0 20px color-mix(in srgb, var(--app-primary-600) 20%, transparent);
}

@media (max-width: 768px) {
  .gradient-text {
    background-size: 400% 100%;
  }
}
</style>
