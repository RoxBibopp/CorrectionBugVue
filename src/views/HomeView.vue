<template>
  <div>
    <h1>Chercher une ville</h1>
    <input v-model="city" placeholder="Entrez un nom de ville" @keyup.enter="search" />
    <button @click="search">Chercher</button>

    <h2>Ailleurs dans le monde :</h2>
    <div class="weather-list">
      <WeatherCard
        v-for="weather in defaultWeathers"
        :key="weather.city"
        :city="weather.city"
        :icon="weather.icon"
        :temperature="weather.temperature"
        :description="weather.description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,onMounted, computed} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import WeatherCard from '@/components/WeatherCard.vue';
import type { Weather } from '@/types/config';

const router = useRouter();
const store = useStore();
const city = ref<string>('');


const search = () : void => {
  if (city.value.trim() !== '') {
    store.dispatch('fetchWeather', city.value);
    router.push('/weather');
  }
};



onMounted(() => {
  store.dispatch('fetchDefaultWeathers')
});
const defaultWeathers = computed(() => store.getters.defaultWeathers as Weather[]) ;
</script>

<style scoped>
.capitals {
  margin-top: 20px;
}

.capitals button {
  margin: 5px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

.weather-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
