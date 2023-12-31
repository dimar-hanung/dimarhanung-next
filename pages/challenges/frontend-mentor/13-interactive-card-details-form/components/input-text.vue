<template>
  <div>
    <label :for="id" v-if="label">{{ label }}</label>
    <div class="mt-2 w-full">
      <input
        class="block w-full p-2 rounded-lg outline-none focus:ring-4 border"
        :class="[isValid || !modelValue ? '' : 'border-red-500 ring-red-500']"
        :id="id"
        type="text"
        :placeholder="placeholder"
        :value="modelValue"
        @input="onInput"
        ref="input"
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
  formatter?: (
    value: string,
    target?: HTMLInputElement,
    selectionStart?: number
  ) => string | FormatterReturn;
  maxLength?: number;
  type: "text" | "number";
  isValid?: boolean;
}

export interface FormatterReturn {
  value: string;
  selectionRange: number;
}

const props = withDefaults(defineProps<Props>(), {
  formatter: (
    str: string,
    target?: HTMLInputElement,
    selectionStart?: number
  ) => str,
  isValid: true,
});

const input = ref<null | HTMLInputElement>(null);

const focus = () => {
  input.value?.focus();
};

defineExpose({ focus });

const emit = defineEmits<{
  (e: "change", id: number): void;

  (e: "update:modelValue", value: string): void;
}>();

const onInput = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  const start = target.selectionStart;

  if (props.maxLength && target.value.length > props.maxLength) {
    target.value = target.value.slice(0, props.maxLength);
  }
  const output = props.formatter(target.value, target, start ?? 0);
  emit("update:modelValue", typeof output == "string" ? output : output.value);
  nextTick(() => {
    target.setSelectionRange(
      typeof output == "string" ? start : output.selectionRange,
      typeof output == "string" ? start : output.selectionRange
    );
  });
};

const isNumber = computed(() => {
  return;
});

onMounted(() => {
  const output = props.formatter(props.modelValue);
  emit("update:modelValue", typeof output == "string" ? output : output.value);
});
</script>
