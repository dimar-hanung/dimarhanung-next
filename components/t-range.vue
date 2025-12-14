<template>
  <div class="range-slider h-full">
    <div
      class="range-slider-track bg-white/40"
      @click="handleClick"
      ref="sliderTrack"
    >
      <div
        class="range-slider-progress"
        :style="{ height: progressHeight }"
      ></div>
      <div
        class="range-slider-thumb bg-green-100/40 relative"
        @mousedown="handleMouseDown"
        :style="{ bottom: thumbPosition }"
        ref="sliderThumb"
      >
        <div
          class="top-1/2 absolute text-xl font-bold whitespace-nowrap text-yellow-400"
          :style="{
            transform: `translateX(calc(-100% - 20px)) translateY(-50%)`,
          }"
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
  return `calc(${percentage.value}% - 10px)`;
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

.range-slider-track {
  position: relative;
  width: 30px;
  height: 100%;

  border-radius: 1rem;
  cursor: pointer;
}

.range-slider-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  /* background-color: #4caf50; */
  border-radius: 2px;
}

.range-slider-thumb {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  /* background-color: #4caf50; */
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}
</style>

<style scoped>
.range-slider {
  width: 100%;
  user-select: none;
}

.range-slider-track {
  position: relative;
  width: 30px;
  height: 100%;

  border-radius: 1rem;
  cursor: pointer;
}

.range-slider-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  /* background-color: #4caf50; */
  border-radius: 2px;
}

.range-slider-thumb {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 80px;
  /* background-color: #4caf50; */
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}
</style>
