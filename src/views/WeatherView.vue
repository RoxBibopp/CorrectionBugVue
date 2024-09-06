<template>
  <div class="weather-container">

    <div v-if="weather" class="current-weather">

      <h2>Météo à {{ city }}</h2>
      <img :src="weather.current.condition.icon" alt="Weather Icon" class="weather-icon" />
      <p class="temperature">Temperature: {{ weather.current.temp_c }}°C</p>
      <p class="description">{{ weather.current.condition.text }}</p>
    </div>
    
    <div v-if="forecast.length" class="forecast">
      <h3>Prévisions pour les prochains jours</h3>
      <div class="forecast-cards">
        <div v-for="(day, index) in forecast" :key="index" class="forecast-card">  
          <hr>
          <p class="forecast-day">{{ formatDateToDay(day.date) }}</p>
          <p class="forecast-day">{{ day.date }}</p>
          <img :src="day.icon" alt="Weather Icon" class="forecast-icon" />
          <p class="forecast-temperature">{{ day.temperature }}°C</p>
          <p class="forecast-description">{{ day.description }}</p>
        </div>
      </div>
    </div>

    <router-link to="/" class="back-link">Retour</router-link>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { StoreState } from '@/types/config';
import { useStore } from 'vuex';

const store = useStore<StoreState>();
const city = computed(() => store.getters.city);
const weather = computed(() => store.getters.weather);
const forecast = ref<any[]>([]);
const API_KEY = 'fd08696ce7d247dba7572711243008';




onMounted(async () => {
  if (city.value) {
    console.log("city",city.value);
    
    await store.dispatch('fetchWeather', city.value);
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city.value}&days=7&lang=fr`);
    const data = await response.json();
    forecast.value = data.forecast.forecastday.map((day: any) => ({
      date: day.date,
      temperature: day.day.avgtemp_c,
      description: day.day.condition.text,
      icon: day.day.condition.icon
    }));
  }
});

const formatDateToDay = (dateString: string): string => {
  const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  const date = new Date(dateString);
  return daysOfWeek[date.getDate()];
}

const getIconUrl = (icon?: string): string => {
  return `https:${icon}`;
}
</script>

<style>
.weather-container {
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.current-weather, .forecast {
  margin-bottom: 20px;
}

.current-weather h2 {
  font-size: 1.5em;
  color: #333;
}

.weather-icon {
  width: 100px;
  height: 100px;
  display: block;
  margin: 10px auto;
}

.temperature {
  font-size: 1.2em;
  color: #555;
}

.description {
  font-size: 1em;
  color: #777;
}

.forecast h3 {
  font-size: 1.4em;
  color: #333;
  margin-bottom: 10px;
}

.forecast-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.forecast-card {
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 15px;
  flex: 1 1 150px;
  text-align: center;
}

.forecast-day {
  font-size: 1.1em;
  margin-bottom: 10px;
  color: #333;
}

.forecast-icon {
  width: 60px;
  height: 60px;
  display: block;
  margin: 0 auto 10px;
}

.forecast-temperature {
  font-size: 1.2em;
  color: #555;
}

.forecast-description {
  font-size: 1em;
  color: #777;
}

.back-link {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.back-link:hover {
  background-color: #0056b3;
}
</style>
