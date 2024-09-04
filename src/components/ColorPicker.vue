
<template>
  <div class="color-picker">
    <div class="selected-color" :style="{ backgroundColor: props.selectedColor }" @click="toggleDropdown"></div>
    <div v-if="isDropdownOpen" class="color-options">
      <div
        v-for="color in props.colors"
        :key="color.value"
        class="color-option"
        :style="{ backgroundColor: color.value }"
        @click="selectColor(color.value)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { ColorOption } from '@/types/config';

const props = defineProps<{
  colors: ColorOption[];
  selectedColor: string;
  onSelectColor: (color: string) => void;
}>();

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectColor = (color: string) => {
  props.onSelectColor(color);
  isDropdownOpen.value = false;
};
</script>

<style scoped>
.color-picker {
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.selected-color {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
}

.color-options {
  position: absolute;
  top: 50px;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  border: 1px solid #ccc;
  padding: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.color-option {
  width: 30px;
  height: 30px;
  margin: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}
</style>
