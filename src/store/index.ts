import { createStore } from 'vuex';
import type { WeatherState, Weather } from '@/types/config';

const API_KEY = 'fd08696ce7d247dba7572711243008';
const API_URL = 'https://api.weatherapi.com/v1/current.json';

export default createStore<WeatherState>({
  state: {
    city: localStorage.getItem('city') || '',
    weather: JSON.parse(localStorage.getItem('weather') || 'null'),
    defaultWeathers: []
  },
  mutations: {
    setCity(state, city: string) {
      state.city = city;
      localStorage.setItem('city', city);
    },
    setWeather(state, weather: Weather | null) {
      state.weather = weather;
      localStorage.setItem('weather', JSON.stringify(weather));
    },
    setDefaultWeathers(state, weathers: Weather[]) {
      state.defaultWeathers = weathers;
    }
  },
  actions: {
    async fetchWeather({ commit }, city: string) {
      try {
        const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}&aqi=no&lang=fr`);
        if (!response.ok) {
          throw new Error('Ville non trouvée');
        }
        const data = await response.json();
        localStorage.setItem('weather', '');
        commit('setWeather', null);
        const weatherData: Weather = {
          city: data.location.name,
          temperature: data.current.temp_c,
          description: data.current.condition.text,
          icon: `https:${data.current.condition.icon}`
        };
        commit('setCity', city);
        console.log("Local storage changé :",localStorage.city);
        commit('setWeather', data);
      } catch (error) {
        console.error('Erreur:', error);
        commit('setWeather', null);
      }
    },
    async fetchDefaultWeathers({ commit }) {
      const defaultCities: string[] = ['Paris', 'London', 'Tokyo', 'New York'];
      try {
        const weatherPromises :any[] = defaultCities.map(city =>
          fetch(`${API_URL}?key=${API_KEY}&q=${city}&aqi=no&lang=fr`).then(response => response.json())
        );
        const data = await Promise.all(weatherPromises);
        const weathers: Weather[] = data.map(item => ({
          city: item.location.name,
          temperature: item.current.temp_c,
          description: item.current.condition.text,
          icon: `https:${item.current.condition.icon}`
        }));
        commit('setDefaultWeathers', weathers);
      } catch (error) {
        console.error('Erreur :', error);
      }
    }
  },
  getters: {
    city: (state: WeatherState) => state.city,
    weather: (state: WeatherState) => state.weather,
    defaultWeathers: (state: WeatherState) => state.defaultWeathers
  }
});
