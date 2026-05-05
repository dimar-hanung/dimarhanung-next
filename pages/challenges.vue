<template>
  <div class="flex h-screen overflow-hidden bg-[#0f172a]">
    <div
      v-if="$route.query.preview !== 'full'"
      class="bg-[#0B1120] border-r border-white/5 text-slate-400 w-full max-w-[300px] hidden xl:flex flex-col h-full"
    >
      <!-- Header -->
      <div
        class="p-5 flex items-center justify-between border-b border-white/5 shrink-0"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500"
          >
            <font-awesome-icon :icon="['fa', 'cloud']" />
          </div>
          <h3 class="font-bold text-slate-100 tracking-wide">Challenges</h3>
        </div>
        <ClientOnly>
          <div class="flex gap-1">
            <NuxtLink
              to="/"
              class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 hover:text-white transition-colors"
              title="Back to Home"
            >
              <font-awesome-icon :icon="['fa', 'home']" class="text-sm" />
            </NuxtLink>
            <NuxtLink
              :to="{ query: { preview: 'full' } }"
              class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5 hover:text-white transition-colors"
              title="Close Sidebar"
            >
              <font-awesome-icon :icon="['fa', 'times']" class="text-sm" />
            </NuxtLink>
          </div>
        </ClientOnly>
      </div>

      <!-- List -->
      <div class="flex-1 overflow-y-auto py-4 px-3 space-y-2 custom-scrollbar">
        <div v-for="group in challengeGroups" :key="group.key">
          <button
            class="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition-colors"
            @click="toggleGroup(group.key)"
          >
            <font-awesome-icon :icon="group.icon" class="text-sm" />
            <span class="flex-1 text-left">{{ group.label }}</span>
            <font-awesome-icon
              :icon="['fa', 'chevron-down']"
              class="text-xs transition-transform duration-200"
              :class="{ '-rotate-180': group.collapsed }"
            />
          </button>
          <div v-show="!group.collapsed" class="space-y-1">
            <NuxtLink
              v-for="challenge in group.items"
              :key="challenge.path"
              class="sidebar--link group/item flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-white/5 hover:text-slate-100"
              :to="challenge.path"
            >
              <span
                class="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover/item:bg-yellow-500 transition-colors shrink-0"
              ></span>
              <span class="text-sm font-medium truncate">{{
                challenge.title
              }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full h-full overflow-auto bg-[#0f172a]">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  key: (route) => route.fullPath,
});

useSeoMeta({
  title: "Challenges",
});

const route = useRoute();
const router = useRouter();
const { challengeGroups, navigateChallenge, toggleGroup } = useChallenges();

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
    navigateChallenge("prev");
  }
  if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "arrowdown") {
    navigateChallenge("next");
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}

a.sidebar--link.router-link-exact-active {
  background-color: rgba(255, 255, 255, 0.08);
  color: #fff;
}

a.sidebar--link.router-link-exact-active span:first-child {
  background-color: #eab308;
  box-shadow: 0 0 8px rgba(234, 179, 8, 0.5);
}
</style>