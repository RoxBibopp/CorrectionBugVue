<template>
  <div
    :style="{
      position: 'absolute',
      top: postIt.y + 'px',
      left: postIt.x + 'px',
      width: postIt.width + 'px',
      height: postIt.height + 'px',
      backgroundColor: postIt.color,
      cursor: isDragging ? 'grabbing' : 'grab',
      fontFamily: postIt.fontFamily, 
      fontSize: postIt.fontSize,     
      fontWeight: postIt.fontWeight, 
      fontStyle: postIt.fontStyle  
    }"
    @mousedown="startDrag"
    class="postit"
  >
  <textarea 
    v-model="postIt.content" 
    style="
      width: 100%; 
      height: 100%; 
      resize: none; 
      border: none; 
      background: transparent; 
      font-family: inherit; 
      font-size: inherit; 
      font-weight: inherit; 
      font-style: inherit;"
  ></textarea>
    <div
      style="
        width: 10px;
        height: 10px;
        position: absolute;
        right: 0;
        bottom: 0;
        cursor: se-resize;
        background-color: none;
      "
      @mousedown.stop="startResize"
    ></div>
    <div @click="() => props.onDelete(props.postIt.id)" class="close">X</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { PostIt } from '@/types/config';

const props = defineProps<{
  postIt: PostIt;
  onUpdate: (updatedPostIt: PostIt) => void;
  onDelete: (id: number) => void;
}>();

const isDragging = ref(false),
      isResizing = ref(false),
      initialPosition = ref({ x: 0, y: 0 }),
      initialSize = ref({ width: 0, height: 0 });

const startDrag = (e: MouseEvent) => {
  isDragging.value = true;
  initialPosition.value = { x: e.clientX - props.postIt.x, y: e.clientY - props.postIt.y };
};

const drag = (e: MouseEvent) => {
  if (isDragging.value) {
    props.onUpdate({
      ...props.postIt,
      x: e.clientX - initialPosition.value.x,
      y: e.clientY - initialPosition.value.y,
    });
  }
};

const stopDrag = () => {
  isDragging.value = false;
};

const startResize = (e: MouseEvent) => {
  isResizing.value = true;
  initialSize.value = { width: e.clientX, height: e.clientY };
};

const resize = (e: MouseEvent) => {
  if (isResizing.value) {
    props.onUpdate({
      ...props.postIt,
      width: props.postIt.width + (e.clientX - initialSize.value.width),
      height: props.postIt.height + (e.clientY - initialSize.value.height),
    });
    initialSize.value = { width: e.clientX, height: e.clientY };
  }
};

const stopResize = () => {
  isResizing.value = false;
};

onMounted(() => {
  window.addEventListener('mousemove', drag);
  window.addEventListener('mouseup', stopDrag);

  window.addEventListener('mousemove', resize);
  window.addEventListener('mouseup', stopResize);
});

</script>


<style scoped>
textarea {
  border: none;
  background-color: transparent;
  outline: none;
  overflow: hidden;
}

.postit {
  background-color: rgb(255, 255, 149);
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 24px -4px rgba(0,0,0,0.3);
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-family: 'Courier New', Courier, monospace !important;
}
</style>
