<template>
  <div v-if="show" class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 transition-opacity"
        aria-hidden="true"
        @click="closeModal"
      >
        <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>

      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-muted-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        @click.stop
      >
        <!-- Modal content -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (event: "update:show", value: boolean): void;
}>();

function closeModal() {
  emit("update:show", false);
}
</script>
