<template>
  <div class="flex">
    <div
      v-if="$route.query.preview !== 'full'"
      class="bg-slate-800 text-white justify-between w-full max-w-[280px] hidden xl:flex"
    >
      <div class="w-full min-h-screen">
        <div class="p-2">
          <div class="flex justify-between p-4 bg-slate-700 w-full rounded-lg">
            <ClientOnly>
              <NuxtLink to="/"
                ><font-awesome-icon
                  class="text-xl cursor-pointer"
                  :icon="['fa', 'home']"
              /></NuxtLink>
              <NuxtLink :to="{ query: { preview: 'full' } }">
                <font-awesome-icon class="text-xl" :icon="['fa', 'times']" />
              </NuxtLink>
            </ClientOnly>
          </div>
        </div>
        <div class="mt-8 px-2">
          <NuxtLink
            v-for="(chellange, i) in chellanges"
            class="sidebar--link px-3 block hover:text-white hover:bg-white hover:bg-opacity-25 p-4 text-slate-300 rounded-lg transition-all"
            :to="chellange.path"
            ><div class="flex">
              <div class="mr-2">{{ i + 1 }}.</div>
              <div>{{ chellange.title }}</div>
            </div></NuxtLink
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
    title: "QR Code",
    path: "/chellanges/frontend-mentor/qrcode",
  },
  {
    title: "Order Summary",
    path: "/chellanges/frontend-mentor/order-summary",
  },
  {
    title: "Single Page Developer Portofolio",
    path: "/chellanges/frontend-mentor/3-single-page-developer-portofolio",
  },
  {
    title: "Result Summary Component",
    path: "/chellanges/frontend-mentor/4-result-summary-component",
  },
  {
    title: "Password Generator App",
    path: "/chellanges/frontend-mentor/5-password-generator-app",
  },
  {
    title: "Product Preview Card Component",
    path: "/chellanges/frontend-mentor/6-product-preview-card-component",
  },
  {
    title: "NFT Preview Card Component",
    path: "/chellanges/frontend-mentor/7-nft-preview-card-component",
  },
  {
    title: "Tic Tac Toe Game",
    path: "/chellanges/frontend-mentor/8-tic-tac-toe-game",
  },
  {
    title: "Stats Preview Card Component",
    path: "/chellanges/frontend-mentor/9-stats-preview-card-component",
  },
  {
    title: "FAQ Accordion Card",
    path: "/chellanges/frontend-mentor/10-faq-accordion-card",
  },
  {
    title: "Fylo Data Storage Component",
    path: "/chellanges/frontend-mentor/11-fylo-data-storage-component",
  },
  {
    title: "3 Column Preview Card Component",
    path: "/chellanges/frontend-mentor/12-3-column-preview-card-component",
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
