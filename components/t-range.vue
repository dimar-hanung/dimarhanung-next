<template>
  <div class="range-slider h-full flex items-center justify-center py-4 group">
    <div
      class="range-slider-track w-2 bg-white/10 backdrop-blur-sm rounded-full relative h-full cursor-pointer hover:bg-white/20 transition-colors border border-white/5"
      @click="handleClick"
      ref="sliderTrack"
    >
      <div
        class="range-slider-progress bg-gradient-to-t from-white/20 to-white/50 rounded-full w-full absolute bottom-0 transition-all duration-100"
        :style="{ height: progressHeight }"
      ></div>
      <div
        class="range-slider-thumb absolute left-1/2 -translate-x-1/2 w-5 h-12 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] cursor-grab active:cursor-grabbing hover:scale-110 transition-transform border border-white/50 flex items-center justify-center"
        @mousedown="handleMouseDown"
        :style="{ bottom: thumbPosition }"
        ref="sliderThumb"
      >
        <div class="w-1 h-4 bg-gray-300/50 rounded-full"></div>
        <div
          class="absolute top-1/2 -translate-y-1/2 right-full mr-6 text-sm font-medium whitespace-nowrap text-white bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full shadow-xl transition-all duration-300"
          :class="{ 'scale-105 bg-black/60 border-white/30': isDragging }"
        >
          {{ label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

interface Props {
  min?: number;
  max?: number;
  value?: number;
  label?: string;
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  value: 50,
  label: "",
});

const emit = defineEmits<{
  (e: "input", value: number): void;
}>();

const sliderTrack = ref<HTMLElement | null>(null);
const sliderThumb = ref<HTMLElement | null>(null);
const isDragging = ref(false);

const percentage = computed(() => {
  return ((props.value - props.min) / (props.max - props.min)) * 100;
});

const progressHeight = computed(() => {
  return percentage.value + "%";
});

const thumbPosition = computed(() => {
  return `calc(${percentage.value}% - 24px)`;
});

const updateSlider = (value: number) => {
  const clampedValue = Math.floor(
    Math.max(props.min, Math.min(props.max, value))
  );

  console.log("updateSlider: " + Math.floor(clampedValue));
  emit("input", Math.abs(clampedValue));
};

const handleClick = (event: MouseEvent) => {
  if (!sliderTrack.value) return;
  const rect = sliderTrack.value.getBoundingClientRect();
  const newValue =
    ((rect.bottom - event.clientY) / rect.height) * (props.max - props.min) +
    props.min;
  updateSlider(newValue);
  console.log("handleClick: " + newValue);
};

const handleMouseMove = (event: MouseEvent) => {
  if (!isDragging.value || !sliderTrack.value) return;
  const rect = sliderTrack.value.getBoundingClientRect();
  const newValue =
    ((rect.bottom - event.clientY) / rect.height) * (props.max - props.min) +
    props.min;
  updateSlider(newValue);
};

const handleMouseUp = () => {
  isDragging.value = false;
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("mouseup", handleMouseUp);
};

const handleMouseDown = () => {
  isDragging.value = true;
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);
};

onMounted(() => {
  updateSlider(props.value);
});
</script>

<style scoped>
.range-slider {
  width: 100%;
  user-select: none;
}
</style>
