<template>
  <div
    class="tooltip-wrapper"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
  >
    <slot></slot>
    <Transition>
      <div v-show="visible" class="tooltip-content">
        <slot name="tooltip"></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const visible = ref(false);
let hideTimeout;

function showTooltip() {
  clearTimeout(hideTimeout);
  visible.value = true;
}

function hideTooltip() {
  hideTimeout = setTimeout(() => {
    visible.value = false;
  }, 100); // Short delay before hiding
}
</script>

<style scoped>
.tooltip-wrapper {
  position: relative;
  display: inline-block;
}

.tooltip-content {
  position: absolute;
  /* bottom: calc(-100%); */
  left: 50%;
  transform: translate(-50%, 25%);
  padding: 8px;
  background: #fff;
  color: #000;
  border-radius: 8px;
  white-space: nowrap;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translate(-50%, 25%) scale(0.8);
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: translate(-50%, 25%) scale(1);
}
</style>
