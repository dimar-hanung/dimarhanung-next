<template>
  <div class="mb-8">
    <h2 class="text-2xl font-semibold mb-4 dark:text-white">
      Project Resources
    </h2>
    <div class="border rounded-lg">
      <button
        v-for="(resource, index) in resources"
        :key="resource.label"
        class="flex items-center p-4 w-full text-left transition-all duration-300 hover:scale-105 hover:shadow-md group"
        :class="[
          index < resources.length - 1 ? 'border-b' : '',
          resource.hoverColor,
        ]"
        @click="handleResourceClick(resource)"
      >
        <Icon
          :name="resource.icon"
          class="w-6 h-6 mr-3 transition-transform duration-300"
          :class="[resource.iconColor, resource.hoverAnimation]"
        />
        <span
          class="font-medium transition-colors duration-300"
          :class="resource.textHoverColor"
        >
          {{ resource.label }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Resource {
  label: string;
  icon: string;
  iconColor: string;
  textHoverColor: string;
  hoverColor: string;
  hoverAnimation: string;
  action?: string;
  url?: string;
}

interface Props {
  resources?: Resource[];
}

type Emits = {
  resourceClick: [resource: Resource];
};

const props = withDefaults(defineProps<Props>(), {
  resources: () => [
    {
      label: "Download Project Brief",
      icon: "mdi:download",
      iconColor: "text-blue-800",
      textHoverColor:
        "group-hover:text-blue-700 dark:group-hover:text-blue-300",
      hoverColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
      hoverAnimation: "group-hover:scale-110 group-hover:rotate-12",
    },
    {
      label: "View Live Demo",
      icon: "mdi:eye",
      iconColor: "text-green-800",
      textHoverColor:
        "group-hover:text-green-700 dark:group-hover:text-green-300",
      hoverColor: "hover:bg-green-50 dark:hover:bg-green-900/20",
      hoverAnimation: "group-hover:scale-110 group-hover:pulse",
    },
    {
      label: "View Source Code",
      icon: "mdi:code-json",
      iconColor: "text-purple-800",
      textHoverColor:
        "group-hover:text-purple-700 dark:group-hover:text-purple-300",
      hoverColor: "hover:bg-purple-50 dark:hover:bg-purple-900/20",
      hoverAnimation: "group-hover:scale-110 group-hover:bounce",
    },
    {
      label: "Contact Support",
      icon: "mdi:help-circle",
      iconColor: "text-red-800",
      textHoverColor: "group-hover:text-red-700 dark:group-hover:text-red-300",
      hoverColor: "hover:bg-red-50 dark:hover:bg-red-900/20",
      hoverAnimation: "group-hover:scale-110 group-hover:wiggle",
    },
  ],
});

const emit = defineEmits<Emits>();

const handleResourceClick = (resource: Resource) => {
  emit("resourceClick", resource);

  if (resource.url) {
    window.open(resource.url, "_blank");
  }
};
</script>
