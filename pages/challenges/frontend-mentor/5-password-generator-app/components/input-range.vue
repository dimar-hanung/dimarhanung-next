<template>
  <div class="custom-slider w-full">
    <input
      ref="slider"
      :value="sliderValue"
      @input="({ target }) => (sliderValue = parseFloat((target as HTMLInputElement).value))"
      type="range"
      :id="inputId"
      :min="min"
      :max="max"
      :step="step"
      class="slider w-full"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";

// define component props for the slider component
const { inputId, min, max, step, modelValue } = defineProps({
  inputId: {
    type: String,
    default: "slider",
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  modelValue: {
    type: Number,
    default: 50,
  },
});

// define emits for the slider component
const emit = defineEmits(["update:modelValue"]);

// define refs for the slider component
const sliderValue = ref(modelValue);
const slider = ref<HTMLInputElement | null>(null);

// function to get the progress of the slider
const getProgress = (value: number, min: string, max: string) => {
  return ((value - Number(min)) / (Number(max) - Number(min))) * 100;
};

// function to set the css variable for the progress
const setCSSProgress = (progress: number) => {
  if (slider.value)
    slider.value.style.setProperty("--ProgressPercent", `${progress}%`);
};

// watchEffect to update the css variable when the slider value changes
watchEffect(() => {
  if (slider.value) {
    // emit the updated value to the parent component
    emit("update:modelValue", sliderValue.value);

    // update the slider progress
    const progress = getProgress(
      sliderValue.value,
      slider.value.min,
      slider.value.max
    );

    // define extrawidth to ensure that the end of progress is always under the slider thumb.
    // let extraWidth = (100 - progress) / 10;

    // set the css variable
    setCSSProgress(progress);
  }
});
</script>
<style scoped>
.custom-slider {
  --trackHeight: 0.5rem;
  --thumbRadius: 1.75rem;
}

/* style the input element with type "range" */
.custom-slider input[type="range"] {
  position: relative;
  appearance: none;
  /* pointer-events: none; */
  border-radius: 999px;
  z-index: 0;
}

/* ::before element to replace the slider track */
.custom-slider input[type="range"]::before {
  content: "";
  position: absolute;
  width: var(--ProgressPercent, 100%);
  height: 100%;
  background: #a4ffaf;
  /* z-index: -1; */
  pointer-events: none;
  border-radius: 999px;
}

/* `::-webkit-slider-runnable-track` targets the track (background) of a range slider in chrome and safari browsers. */
.custom-slider input[type="range"]::-webkit-slider-runnable-track {
  appearance: none;
  background: #005a3c;
  height: var(--trackHeight);
  border-radius: 999px;
}

/* `::-moz-range-track` targets the track (background) of a range slider in Mozilla Firefox. */
.custom-slider input[type="range"]::-moz-range-track {
  appearance: none;
  background: #005a3c;
  height: var(--trackHeight);
  border-radius: 999px;
}

.custom-slider input[type="range"]::-webkit-slider-thumb {
  position: relative;
  /* top: 50%; 
  transform: translate(0, -50%);
  */
  width: var(--thumbRadius);
  height: var(--thumbRadius);
  margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2);
  background: #e6e5ea;
  border: solid 2px transparent;
  border-radius: 100%;
  cursor: pointer;
  pointer-events: all;
  appearance: none;
  z-index: 1;
  transition: all ease 0.3s;
}

.custom-slider input[type="range"]::-webkit-slider-thumb:hover {
  background: #18171f;
  border: solid 2px #a4ffaf;
}
</style>
