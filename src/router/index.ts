import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShopView from "@/views/ShopView.vue";
import GameView from "@/views/GameView.vue";
import SoloJourneyMenuView from "@/views/SoloJourneyMenuView.vue";
import Callback from '@/views/Callback.vue';
import RedirectGoogle from "@/views/RedirectGoogle.vue";

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
      component: SoloJourneyMenuView
    },
    {
      path: '/redirect-google',
      name: 'RedirectGoogle',
      component: RedirectGoogle,
    },
    {
      path: '/shop',
      name: 'shop',
      component: ShopView
    },
    {
      path: '/game',
      name: 'game',
      component: GameView
    },
    {
      path: '/auth/google/callback',
      component: Callback,
    },
  ]
})

export default router
