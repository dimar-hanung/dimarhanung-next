<template>
  <div class="form-group relative">
    <label :for="id">
      {{ label }} <span v-if="required" class="text-red-600">*</span>
    </label>

    <input
      :id="id"
      :name="id"
      v-model="searchTerm"
      :required="required"
      :disabled="disabled"
      :placeholder="placeholder"
      class="form-input"
      @focus="isDropdownVisible = true"
      @blur="handleBlur"
      ref="inputRef"
    />

    <span class="absolute right-12" v-if="isLoading">
      <Icon class="text-primary-link" name="svg-spinners:8-dots-rotate" />
    </span>

    <ul
      v-if="isDropdownVisible && filteredOptions.length > 0"
      class="dropdown-list mt-1 border border-gray-300 rounded-md bg-white shadow-md overflow-y-auto"
      :style="{
        width: dropdownWidth + 'px',
        height: filteredOptions.length <= 10 ? 'auto' : '20rem',
        maxHeight: '20rem',
      }"
    >
      <li
        v-for="option in filteredOptions"
        :key="option.value"
        @mousedown="selectOption(option)"
        class="cursor-pointer hover:bg-gray-100 p-2"
      >
        {{ option.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: true,
  },
  required: Boolean,
  disabled: Boolean,
  isLoading: Boolean,
  modelValue: [String, Number],
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    required: false,
    default: "Please select an option",
  },
});

const emit = defineEmits(["update:modelValue"]);
const searchTerm = ref("");
const isDropdownVisible = ref(false);
const dropdownWidth = ref(0);
const inputRef = ref(null);

const filteredOptions = computed(() => {
  return props.options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const selectOption = (option) => {
  searchTerm.value = option.label;
  emit("update:modelValue", option.value);
  isDropdownVisible.value = false;
};

const handleBlur = () => {
  setTimeout(() => {
    isDropdownVisible.value = false;
  }, 200);
};

// Mengatur lebar dropdown sesuai dengan input
onMounted(() => {
  if (inputRef.value) {
    dropdownWidth.value = inputRef.value.offsetWidth;
  }
});
</script>

<style scoped>
.text-gray-500 {
  color: gray;
}
.form-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
}
.form-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
.dropdown-list {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 10;
}
</style>
