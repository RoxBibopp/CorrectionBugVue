import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import WeatherView from '../views/WeatherView.vue';
import PostItBoard from '@/views/PostItBoard.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
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
