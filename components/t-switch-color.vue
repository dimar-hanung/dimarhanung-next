<template>
  <div>
    <t-modal v-model:show="isOpen">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 bg-muted-300 dark:bg-muted-900 p-4"
      >
        <div v-for="color in primaryPresets" :key="color.name">
          <button
            type="button"
            class="group w-full flex items-center gap-3 p-2 rounded-lg hover:bg-muted-100 dark:hover:bg-muted-700/70 transition-colors duration-200"
            @click="() => switchPrimary(color)"
            :class="[
              currentPrimary === color.name
                ? 'ring-1 ring-primary-500 z-10 relative'
                : 'ring-0',
            ]"
          >
            <span
              class="block h-6 w-6 rounded-lg shrink-0"
              :class="color.class"
            ></span>
            <p>{{ color.label }}</p>
          </button>
        </div>
      </div>
      <hr class="border-muted-200 dark:border-muted-700" />
      <div>
        <div class="flex items-center p-4 bg-muted-200 dark:bg-muted-800">
          <div class="ml-auto flex items-center justify-end gap-2">
            <button
              v-for="color in mutedPresets"
              :key="color.name"
              type="button"
              class="block h-6 w-6 rounded-full"
              :class="[
                color.class,
                currentMuted === color.name
                  ? 'ring-1 ring-primary-500'
                  : 'ring-0',
              ]"
              :data-nui-tooltip="color.label"
              @click="() => switchMuted(color)"
            ></button>
            <t-switch-dark-mode></t-switch-dark-mode>>
          </div>
        </div>
      </div>
    </t-modal>
    <div
      @click="isOpen = !isOpen"
      v-wave
      class="text-2xl text-primary-500 cursor-pointer h-9 w-9 rounded grid place-items-center hover:bg-muted-200 dark:hover:bg-muted-700 hover:bg-opacity-50"
    >
      <Icon name="i-heroicons-paint-brush-solid"></Icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import colors from "tailwindcss/colors";
const currentPrimary = ref("violet");
const currentMuted = ref("slate");
// const color = useColorMode();
const isOpen = ref(false);
const primaryPresets = [
  {
    name: "indigo",
    label: "Indigo",
    shades: colors.indigo,
    class: "bg-indigo-500",
  },
  {
    name: "sky",
    label: "Sky",
    shades: colors.sky,
    class: "bg-sky-500",
  },
  {
    name: "purple",
    label: "Purple",
    shades: colors.purple,
    class: "bg-purple-500",
  },
  {
    name: "violet",
    label: "Violet",
    shades: colors.violet,
    class: "bg-violet-500",
  },
  {
    name: "lime",
    label: "Lime",
    shades: colors.lime,
    class: "bg-lime-500",
  },
  {
    name: "teal",
    label: "Teal",
    shades: colors.teal,
    class: "bg-teal-500",
  },
  {
    name: "emerald",
    label: "Emerald",
    shades: colors.emerald,
    class: "bg-emerald-500",
  },
  {
    name: "rose",
    label: "Rose",
    shades: colors.rose,
    class: "bg-rose-500",
  },
  {
    name: "pink",
    label: "Pink",
    shades: colors.pink,
    class: "bg-pink-500",
  },
  {
    name: "yellow",
    label: "Yellow",
    shades: colors.yellow,
    class: "bg-yellow-500",
  },
  {
    name: "orange",
    label: "Orange",
    shades: colors.orange,
    class: "bg-orange-500",
  },
  {
    name: "mauve",
    label: "Custom",
    shades: {
      50: "#EEECF9",
      100: "#DCD8F3",
      200: "#B6AEE5",
      300: "#9488D8",
      400: "#6E5DCB",
      500: "#4E3CB9",
      600: "#3E2F92",
      700: "#302470",
      800: "#1F1849",
      900: "#100C27",
      950: "#080613",
    },
    class: "bg-indigo-400",
  },
] as const;

const mutedPresets = [
  {
    name: "gray",
    label: "Gray",
    shades: colors.gray,
    class: "bg-gray-300 dark:bg-gray-900",
  },
  {
    name: "slate",
    label: "Slate",
    shades: colors.slate,
    class: "bg-slate-300 dark:bg-slate-900",
  },
  {
    name: "stone",
    label: "Stone",
    shades: colors.stone,
    class: "bg-stone-300 dark:bg-stone-900",
  },
  {
    name: "zinc",
    label: "Zinc",
    shades: colors.zinc,
    class: "bg-zinc-300 dark:bg-zinc-900",
  },
  {
    name: "neutral",
    label: "Neutral",
    shades: colors.neutral,
    class: "bg-neutral-300 dark:bg-neutral-900",
  },
  {
    name: "oled",
    label: "Oled",
    shades: {
      50: "#EEECF9",
      100: "#DCD8F3",
      200: "#B6AEE5",
      300: "#9488D8",
      400: "#6E5DCB",
      500: "#4E3CB9",
      600: "#3E2F92",
      700: "#302470",
      800: "#000000",
      900: "#000000",
      950: "#080613",
    },
    class: "bg-black dark:bg-black",
  },
] as const;

function switchPrimary(color: (typeof primaryPresets)[number]) {
  currentPrimary.value = color.name;
  switchColorShades("primary", color.shades);
  localStorage.setItem("primaryColor", color.name);
}
function switchMuted(color: (typeof mutedPresets)[number]) {
  currentMuted.value = color.name;
  switchColorShades("muted", color.shades);
  localStorage.setItem("mutedColor", color.name);
}

onBeforeMount(() => {
  const primary = localStorage.getItem("primaryColor");
  if (primary) {
    currentPrimary.value = primary;
    switchColorShades(
      "primary",
      primaryPresets.find((c) => c.name === primary)!.shades
    );
  }
  const muted = localStorage.getItem("mutedColor");
  if (muted) {
    currentMuted.value = muted;
    switchColorShades(
      "muted",
      mutedPresets.find((c) => c.name === muted)!.shades
    );
  }
});
</script>
