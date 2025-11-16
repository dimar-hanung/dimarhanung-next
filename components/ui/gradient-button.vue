<template>
  <WaveSurface
    as="button"
    class="relative hover:scale-105 px-20 py-3 font-semibold text-white transition duration-300 ease-in-out rounded-lg shadow-lg group transform scale-100"
  >
    <span
      class="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 rounded-lg blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"
    ></span>
    <span
      class="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-600 rounded-lg group-hover:animate-pulse"
    ></span>
    <span class="relative"><slot></slot></span>
  </WaveSurface>
</template>

<script lang="ts" setup></script>
