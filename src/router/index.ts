import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import WeatherView from '../views/WeatherView.vue';
import PostItBoard from '@/views/PostItBoard.vue';
import WeatherCard from '@/components/WeatherCard.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/weather',
    name: 'Weather',
    component: WeatherView
  },
  {
    path: '/PostIt',
    name: 'Postit',
    component: PostItBoard
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
