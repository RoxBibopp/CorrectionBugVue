<template>
  <div class="font-selector">
    <div class="selected-font" @click="toggleDropdown">
      {{ selectedFont }}
    </div>
    <div v-if="isDropdownOpen" class="font-dropdown">
      <div
        v-for="font in fonts"
        :key="font"
        class="font-option"
        :style="{ fontFamily: font }"
        @click="selectFont(font)"
      >
        {{ font }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const props = defineProps<{
  fonts: string[];
  selectedFont: string;
  onSelectFont: (font: string) => void;
}>();

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectFont = (font: string) => {
  // isDropdownOpen.value = false;
  props.onSelectFont(font);
  toggleDropdown();
};
</script>

<style scoped>
.font-selector {
  position: relative;
  display: inline-block;
  cursor: pointer;
  width: 150px;
}

.selected-font {
  padding: 5px;
  border: 1px solid #ccc;
  background-color: #fff;
}

.font-dropdown {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  z-index: 1;
  width: 100%;
}

.font-option {
  padding: 5px;
  font-size: 16px;
}

.font-option:hover {
  background-color: #f0f0f0;
}
</style>
