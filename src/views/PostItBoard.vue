<template>
  <div>
    <div class="menuPostIt">
      <div class="colorPickerCtn">
        <label for="color">Choisir une couleur :</label>
        <ColorPicker
          class="colorPicker"
          :colors="colors"
          :selectedColor="selectedColor"
          :onSelectColor="selectColor"
        />
      </div>
      <div class="fontPickerCtn">
        <label for="fontFamily">Choisir une police :</label>
        <FontSelector 
        :fonts="fonts"
        :selectedFont="selectedFontFamily"
        :onSelectFont="selectFontFamily"
        />
      </div>
      <button @click="addPostIt">Ajouter un Post-it</button>
    </div>
    <div class="post-it-board" ref="board">
      <PostItComponent
        v-for="postIt in postIts"
        :key="postIt.id"
        :postIt="postIt"
        :onUpdate="updatePostIt"
        :onDelete="deletePostIt"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PostItComponent from '../components/PostIt.vue';
import ColorPicker from '../components/ColorPicker.vue';
import FontSelector from '../components/FontSelector.vue';
import type { PostIt } from '@/types/config';

const postIts = ref<PostIt[]>([]);
let nextId = 1;

const board = ref<HTMLElement | null>(null);

const selectedColor = ref<string>('rgb(255, 255, 154)'),
      selectedFontFamily = ref<string>('Arial'),
      colors = [
  { value: 'rgb(255, 255, 154)', label: 'Jaune' },
  { value: 'rgb(253, 218, 249)', label: 'Rose' },
  { value: 'rgb(208, 219, 255)', label: 'Bleu' },
  { value: 'rgb(208, 255, 212)', label: 'Vert' },
  { value: 'rgb(255, 229, 208)', label: 'Orange' },
],
      fonts = [
  'Arial',
  'Sevillana',
  'Playwrite CU',
  'Oswald',
  'Pacifico',
  'Jost',
]
const selectColor = (color: string) => {
  selectedColor.value = color;
};

const addPostIt = () => {
  postIts.value.push({
    id: nextId++,
    content: '',
    x: 100,
    y: 100,
    width: 200,
    height: 200,
    color: selectedColor.value,
    fontFamily: selectedFontFamily.value,
    fontSize: '18px',
    fontWeight: 'normal',
    fontStyle: 'normal',
  });
};

const updatePostIt = (updatedPostIt: PostIt) => {
  const index = postIts.value.findIndex((p) => p.id === updatedPostIt.id);
  if (index !== -1) {
    postIts.value[index] = updatedPostIt;
  }
};

const deletePostIt = (id: number) => {
  postIts.value = postIts.value.filter((p) => p.id !== id);
};

const selectFontFamily = (font: string) => {
  selectedFontFamily.value = font;
};
</script>

<style scoped lang="scss">
button {
  margin: 10px;
}

.post-it-board {
  position: relative;
  background-color: #f0f0f0;
  width: 100%;
  height: 100vh;
}

.colorPickerCtn,
.fontPickerCtn {
  display: flex;
  align-items: center;
  background-color: rgb(243, 243, 243);
  padding: 20px;
  margin-right: 10px;

  .colorPicker {
    margin-left: 20px;
  }
}
.menuPostIt {
  display: flex;
  margin: 10px;
}
</style>
