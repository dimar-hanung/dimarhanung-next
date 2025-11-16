<template>
  <div class="range-slider">
    <div class="range-slider-track" @click="handleClick" ref="sliderTrack">
      <div
        class="range-slider-progress"
        :style="{ height: progressHeight }"
      ></div>
      <div
        class="range-slider-thumb"
        @mousedown="handleMouseDown"
        :style="{ bottom: thumbPosition }"
        ref="sliderThumb"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Props {
  min?: number;
  max?: number;
  value?: number;
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  value: 50,
});

const emit = defineEmits<{
  (e: "input", value: number): void;
}>();

const sliderTrack = ref<HTMLElement | null>(null);
const sliderThumb = ref<HTMLElement | null>(null);
const thumbPosition = ref("0px");
const progressHeight = ref("50%");
const isDragging = ref(false);

const updateSlider = (value: number) => {
  const clampedValue = Math.max(props.min, Math.min(props.max, value));
  const percentage =
    ((clampedValue - props.min) / (props.max - props.min)) * 100;
  progressHeight.value = percentage + "%";
  thumbPosition.value = `calc(${percentage}% - 10px)`;
};

const handleClick = (event: MouseEvent) => {
  if (!sliderTrack.value) return;
  const rect = sliderTrack.value.getBoundingClientRect();
  const newValue =
    ((rect.bottom - event.clientY) / rect.height) * (props.max - props.min) +
    props.min;
  updateSlider(newValue);
  emit("input", newValue);
};

const handleMouseMove = (event: MouseEvent) => {
  if (!isDragging.value || !sliderTrack.value) return;
  const rect = sliderTrack.value.getBoundingClientRect();
  const newValue =
    ((rect.bottom - event.clientY) / rect.height) * (props.max - props.min) +
    props.min;
  updateSlider(newValue);
  emit("input", newValue);
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
  height: 800px;
  user-select: none;
}

.range-slider-track {
  position: relative;
  width: 4px;
  height: 100%;
  background-color: #ddd;
  border-radius: 2px;
  cursor: pointer;
}

.range-slider-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #4caf50;
  border-radius: 2px;
}

.range-slider-thumb {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background-color: #4caf50;
  border-radius: 50%;
  cursor: pointer;
}
</style>

<style scoped>
.range-slider {
  width: 100%;
  height: 800px;
  user-select: none;
}

.range-slider-track {
  position: relative;
  width: 4px;
  height: 100%;
  background-color: #ddd;
  border-radius: 2px;
  cursor: pointer;
}

.range-slider-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #4caf50;
  border-radius: 2px;
}

.range-slider-thumb {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 20px;
  background-color: #4caf50;
  border-radius: 50%;
  cursor: pointer;
}
</style>
