<template>
  <div
    class="transition-all select-none text-[#E6E5EA]"
    :class="[disabled ? 'cursor-not-allowed' : 'cursor-pointer']"
    @click="$emit('update:value', disabled ? value : !value)"
  >
    <!-- <input type="checkbox" class="hidden" v-model="value" /> -->
    <div class="flex place-items-center">
      <div>
        <div
          class="transition-all w-6 min-w-[1.5rem] h-6 rounded-sm text-white grid place-items-center border-2"
          :class="[
            value ? 'bg-[#A4FFAF] border-transparent' : 'border-[#A4FFAF]',
            disabled ? 'bg-neutral-5' : '',
          ]"
        >
          <Transition name="scale" mode="out-in">
            <icon-check class="block text-xl" v-if="value" />
          </Transition>
        </div>
      </div>
      <input type="checkbox" class="hidden" :value="value" :checked="value" />
      <div class="p-2">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import iconCheck from "./icon-check.vue";

export interface Props {
  value: boolean;
  disabled?: boolean;
}

const emit = defineEmits<{
  (e: "change", id: number): void;

  (e: "update:value", value: boolean): void;
}>();

const props = withDefaults(defineProps<Props>(), { disabled: false });
</script>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s;
  transform: scale(1);
}

.scale-enter,
.scale-leave-to {
  transform: scale(0);
}
</style>
