<template>
  <div class="weather-card">
    <h3>{{ city }}</h3>
    <img :src=" icon "  alt="Weather Icon" />
    <p>Temperature: {{ temperature }}°C</p>
    <p>{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  city: String,
  icon: String,
  temperature: Number,
  description: String
});
</script>

<style scoped>

.weather-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  margin: 10px;
  width: 200px;
}

.weather-card img {
  width: 50px;
  height: 50px;
}
</style>
