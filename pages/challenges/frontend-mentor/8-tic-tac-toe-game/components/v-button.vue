<template>
  <button
    class="t-button"
    :class="variant"
    :style="{
      height: getHeight(),
    }"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
export interface Props {
  variant: "yellow" | "blue" | "grey";
  size: "small" | "medium" | "large";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "yellow",
  size: "medium",
});

const getHeight = () => {
  switch (props.size) {
    case "small":
      return "52px";
    case "medium":
      return "68px";
    case "large":
      return "80px";
  }
};
</script>

<style scoped>
.t-button {
  border-radius: 15px;
  height: 68px;
  display: block;
  transition: all ease 0.3s;
}

.t-button.yellow {
  background: #f2b137;
  box-shadow: inset 0px -8px 0px #cc8b13;
}

.t-button.yellow:hover {
  background: #ffc860;
}

.t-button.blue {
  background: #31c3bd;
  box-shadow: inset 0px -8px 0px #118c87;
}

.t-button.blue:hover {
  background: #65e9e4;
}

.t-button.grey {
  background: #a8bfc9;
  box-shadow: inset 0px -4px 0px #6b8997;
}

.t-button.grey:hover {
  background: #dbe8ed;
}
</style>
