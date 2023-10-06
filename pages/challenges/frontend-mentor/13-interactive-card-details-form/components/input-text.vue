<template>
  <div>
    <label :for="id" v-if="label">{{ label }}</label>
    <div class="mt-2 w-full">
      <input
        class="block w-full p-2 rounded-lg outline-none focus:ring-4 border"
        :id="id"
        type="text"
        :placeholder="placeholder"
        :value="modelValue"
        @input="onInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  placeholder?: string;
  modelValue: string;
  id: string;
  label?: string;
  formatter: (value: string) => string;
}

const props = withDefaults(defineProps<Props>(), {
  formatter: (str: string) => str,
});
const emit = defineEmits<{
  (e: "change", id: number): void;

  (e: "update:modelValue", value: string): void;
}>();

const onInput = ($event: Event) => {
  emit(
    "update:modelValue",
    props.formatter(($event.target as HTMLInputElement).value)
  );
};

onMounted(() => {
  emit("update:modelValue", props.formatter(props.modelValue));
});
</script>
