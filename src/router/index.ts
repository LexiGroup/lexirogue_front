import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SoloJourneyMenu from "@/components/SoloJourneyMenu.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //TODO: Se renseigner sur la lazy loading de routes
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/play',
      name: 'solo-journey',
      component: SoloJourneyMenu
    }
  ]
})

export default router
