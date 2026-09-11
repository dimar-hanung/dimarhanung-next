<template>
  <div
    class="tooltip-wrapper"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
  >
    <slot></slot>
    <Transition>
      <div
        v-show="visible"
        class="tooltip-content"
        role="tooltip"
      >
        <slot name="tooltip"></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from "vue";

const visible = ref(false);
let hideTimeout;
let showTimeout;

function showTooltip() {
  clearTimeout(hideTimeout);
  clearTimeout(showTimeout);
  showTimeout = setTimeout(() => {
    visible.value = true;
  }, 60);
}

function hideTooltip() {
  clearTimeout(showTimeout);
  hideTimeout = setTimeout(() => {
    visible.value = false;
  }, 80);
}

onUnmounted(() => {
  clearTimeout(hideTimeout);
  clearTimeout(showTimeout);
});
</script>

<style scoped>
.tooltip-wrapper {
  position: relative;
  display: inline-flex;
}

.tooltip-content {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 10px);
  z-index: 20;
  padding: 8px 12px;
  background: #fff;
  color: #000;
  border-radius: 8px;
  white-space: nowrap;
  pointer-events: none;
  font-size: 1rem;
  line-height: 1.4;
  transform: translateX(-50%);
}

.v-enter-active,
.v-leave-active {
  transition:
    opacity 160ms cubic-bezier(0.23, 1, 0.32, 1),
    transform 160ms cubic-bezier(0.23, 1, 0.32, 1);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(4px) scale(0.96);
}

.v-enter-to,
.v-leave-from {
  opacity: 1;
  transform: translateX(-50%) scale(1);
}
</style>
