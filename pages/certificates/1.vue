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

<script>
export default {
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    value: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      thumbPosition: "0px",
      progressHeight: "50%",
      isDragging: false,
    };
  },
  mounted() {
    this.updateSlider(this.value);
  },
  methods: {
    handleClick(event) {
      const rect = this.$refs.sliderTrack.getBoundingClientRect();
      const newValue =
        ((rect.bottom - event.clientY) / rect.height) * (this.max - this.min) +
        this.min;
      this.updateSlider(newValue);
      this.$emit("input", newValue);
    },
    handleMouseDown() {
      this.isDragging = true;
      window.addEventListener("mousemove", this.handleMouseMove);
      window.addEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseUp() {
      this.isDragging = false;
      window.removeEventListener("mousemove", this.handleMouseMove);
      window.removeEventListener("mouseup", this.handleMouseUp);
    },
    handleMouseMove(event) {
      if (!this.isDragging) return;
      const rect = this.$refs.sliderTrack.getBoundingClientRect();
      const newValue =
        ((rect.bottom - event.clientY) / rect.height) * (this.max - this.min) +
        this.min;
      this.updateSlider(newValue);
      this.$emit("input", newValue);
    },
    updateSlider(value) {
      const clampedValue = Math.max(this.min, Math.min(this.max, value));
      const percentage =
        ((clampedValue - this.min) / (this.max - this.min)) * 100;
      this.progressHeight = percentage + "%";
      this.thumbPosition = `calc(${percentage}% - 10px)`;
    },
  },
};
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
