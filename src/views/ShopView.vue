<script setup lang="ts">
import {ArrowLeftIcon} from "@heroicons/vue/24/outline";
import MainMenuButton from "@/components/buttons/MainMenuButton.vue";
import ShopCard from "@/components/cards/ShopCard.vue";
import Inventory from "@/components/Inventory.vue";

import {computed, defineProps, onMounted, ref} from 'vue';

interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  value: string;
  itemCategories: { category: { name: string } }[];
}

import { useRouteStore } from "@/stores/routes";
import axios from 'axios';
const routeStore = useRouteStore();
const isRoadselect = computed(() => !!routeStore.selectedRoute);
const items = ref<Item[]>([]);

const apiUrl = import.meta.env.VITE_API_URL;

async function getShopItem() {
 if(isRoadselect.value){
   try {
     const response = await axios.get(`${apiUrl}/items/search/level/difficulty/three/${routeStore.selectedRoute?.difficulty}`)
     return response.data;
   } catch (error) {
     console.error(`Error fetching player data: ${error}`);
   }
 } else {
    alert('No route selected');
 }
}

onMounted(async () => {
  items.value = await getShopItem();
});

function getItemCategory(item: Item): string {
  if (item.itemCategories && item.itemCategories.length > 0) {
    return item.itemCategories[0].category.name;
  }
  return 'Unknown';
}

</script>

<template>
  <div class="h-20 mb-6 flex flex-row items-center justify-center">
    <MainMenuButton background-color="transparent" target="play" :label="ArrowLeftIcon" class="absolute top-3 left-4 sm:left-8 md:left-16 lg:left-32" />
    <p class="bg-gray-950 h-full text-white p-4 sm:p-6 hidden md:block">SCOREBOARD PLACEHOLDER</p>
  </div>
  <div class="flex flex-col items-center">
    <div class="w-full max-w-screen-lg">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
        <ShopCard v-for="item in items" img-url="knife.png" :description="item.description" :price="item.price" :title="item.name" :category="getItemCategory(item)"/>

      </div>
      <Inventory/>
    </div>
  </div>
</template>

<style scoped>

</style>
