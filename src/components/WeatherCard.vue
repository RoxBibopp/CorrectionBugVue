<template>
  <div class="weather-card">
    <h3>{{ weather.city }}</h3>
    <img :src="weather.icon" alt="Weather Icon" />
    <p>Temperature: {{ weather.temperature }}°C</p>
    <p>{{ weather.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import type { Weather } from '@/types/config';

const props = defineProps<{
  weather: Weather
}>();


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
