<template>
  <div
    class="border-2 overflow-hidden shadow rounded-xl w-72"
    :class="[selceted ? 'border-blue-700' : 'border-transparent']"
  >
    <div>
      <img :src="thumbUrl" alt="" />
    </div>

    <div class="p-2">
      <h2 class="font-bold text-lg">{{ title }}</h2>
      <hr class="my-3" />
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    thumbUrl: {
      type: String,
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },

    selceted: {
      type: Boolean,
      default: false,
    },
  },

  data() {},
};
</script>
