<template>
  <div class="range-slider h-full">
    <div
      class="range-slider-track bg-white bg-opacity-40"
      @click="handleClick"
      ref="sliderTrack"
    >
      <div
        class="range-slider-progress"
        :style="{ height: progressHeight }"
      ></div>
      <div
        class="range-slider-thumb bg-green-100 bg-opacity-40 relative"
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
    label: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      //   thumbPosition: "0px",
      //   progressHeight: "50%",
      isDragging: false,
    };
  },
  mounted() {
    this.updateSlider(this.value);
  },
  computed: {
    progressHeight() {
      const percentage =
        ((this.value - this.min) / (this.max - this.min)) * 100;
      return percentage + "%";
    },
    thumbPosition() {
      return `calc(${this.percentage}% - 10px)`;
    },
    percentage() {
      return ((this.value - this.min) / (this.max - this.min)) * 100;
    },
  },
  //   watch: {
  //     value(value) {
  //       const clampedValue = Math.floor(
  //         Math.max(this.min, Math.min(this.max, value))
  //       );
  //       const percentage =
  //         ((clampedValue - this.min) / (this.max - this.min)) * 100;
  //       this.progressHeight = percentage + "%";
  //       this.thumbPosition = `calc(${percentage}% - 10px)`;
  //     },
  //   },
  methods: {
    handleClick(event) {
      const rect = this.$refs.sliderTrack.getBoundingClientRect();
      const newValue =
        ((rect.bottom - event.clientY) / rect.height) * (this.max - this.min) +
        this.min;
      this.updateSlider(newValue);
      console.log("handleClick: " + newValue);
      //   this.$emit("input", newValue);
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
      //   this.$emit("input", newValue);
    },
    updateSlider(value) {
      const clampedValue = Math.floor(
        Math.max(this.min, Math.min(this.max, value))
      );

      console.log("updateSlider: " + Math.floor(clampedValue));
      this.$emit("input", Math.abs(clampedValue));
    },
  },
};
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
