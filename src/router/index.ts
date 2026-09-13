import { createRouter, createWebHistory } from 'vue-router'

import HomeView from "../pages/homeView.vue";
import MenuInicial from "../pages/menuInicial.vue";

const routes = [
  {
    path:"/home",
    name:"Home",
    component:HomeView
  },
  {
    path:"/",
    name:"MenuInicial",
    component:MenuInicial
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
