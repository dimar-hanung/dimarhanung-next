<template>
  <div class="flex">
    <div
      v-if="$route.query.preview !== 'full'"
      class="bg-slate-800 text-white justify-between w-full max-w-[280px] hidden xl:flex"
    >
      <div class="w-full min-h-screen">
        <div class="flex justify-between p-4 bg-slate-700 w-full">
          <ClientOnly>
            <NuxtLink to="/"
              ><font-awesome-icon
                class="text-xl text-yellow-500 cursor-pointer"
                :icon="['fa', 'home']"
            /></NuxtLink>
            <NuxtLink :to="{ query: { preview: 'full' } }">
              <font-awesome-icon :icon="['fa', 'times']" />
            </NuxtLink>
          </ClientOnly>
        </div>
        <div class="mt-8">
          <NuxtLink
            v-for="chellange in chellanges"
            class="sidebar--link px-3 block hover:text-yellow-500 p-4"
            :to="chellange.path"
            ><div>{{ chellange.title }}</div></NuxtLink
          >
        </div>
      </div>
    </div>
    <div class="w-full">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
});

useSeoMeta({
  title: "FrontEnd Mentor (●'◡'●)",
});

const route = useRoute();
const router = useRouter();

const chellanges = [
  {
    title: "1 - QR Code",
    path: "/chellanges/frontend-mentor/qrcode",
  },
  {
    title: "2 - Order Summary",
    path: "/chellanges/frontend-mentor/order-summary",
  },
  {
    title: "3 - Single Page Developer Portofolio",
    path: "/chellanges/frontend-mentor/3-single-page-developer-portofolio",
  },
  {
    title: "4 - Result Summary Component",
    path: "/chellanges/frontend-mentor/4-result-summary-component",
  },
  {
    title: "5 - Password Generator App",
    path: "/chellanges/frontend-mentor/5-password-generator-app",
  },
];

// event listener when press "f" key
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "f") {
    const fullScreen = route.query.preview === "full";
    router.push({
      query: {
        ...route.query,
        preview: fullScreen ? undefined : "full",
      },
    });
  }

  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "arrowup") {
    const index = chellanges.findIndex((chellange) => {
      return chellange.path === route.path;
    });
    if (index > 0) {
      router.push({
        path: chellanges[index - 1].path,
        query: { ...route.query },
      });
    }
  }
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "arrowdown") {
    const index = chellanges.findIndex((chellange) => {
      return chellange.path === route.path;
    });
    if (index < chellanges.length - 1) {
      router.push({
        path: chellanges[index + 1].path,
        query: { ...route.query },
      });
    }
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
  // find index of current route
  const index = chellanges.findIndex((chellange) => {
    return chellange.path === route.path;
  });
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<style>
a.sidebar--link.router-link-exact-active {
  @apply text-yellow-400 bg-slate-700;
}
</style>
