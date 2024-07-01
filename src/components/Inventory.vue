<script setup lang="ts">
import HeroIcon from "@/components/icons/HeroIcon.vue";
import {BeakerIcon, KeyIcon, RocketLaunchIcon, ScissorsIcon, ShieldCheckIcon} from "@heroicons/vue/24/outline";
import {onMounted, ref} from "vue";
import axios from 'axios';
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const ApiUrl = import.meta.env.VITE_API_URL;

interface Item {
  id: number;
  name: string;
}

const items = ref<Item[]>([]);

async function getInventoryItem() {
 try {
  const response = await axios.get(`${ApiUrl}/game/player/${authStore.player!.id}/inventory`)
   console.log(response.data);
  return response.data
 } catch (error) {
   console.error(`Error fetching player data: ${error}`);
 }
}

onMounted(async () => {
  items.value = await getInventoryItem();
});

</script>

<template>
  <div class="bg-[url('src/assets/img/wood.png')] p-3 bg-no-repeat bg-cover w-full md:w-1/2 m-auto">
    <div class="bg-[url('src/assets/img/board.png')] bg-no-repeat bg-cover flex flex-col content-center md:h-full md:grid md:grid-cols-2 md:gap-6 p-2">
      <div>
        <p class="text-center text-white">Inventory</p>
        <div class="flex items-center justify-around w-full">
          <div class="grid grid-cols-3 gap-6 text-gray-200 mt-1">
            <HeroIcon :size="12" :icon="BeakerIcon"/>
            <HeroIcon :size="12" :icon="RocketLaunchIcon"/>
            <HeroIcon :size="12" :icon="KeyIcon"/>
            <HeroIcon :size="12" :icon="BeakerIcon"/>
            <HeroIcon :size="12" :icon="ScissorsIcon"/>
            <HeroIcon :size="12" :icon="ShieldCheckIcon"/>
          </div>
        </div>
      </div>
      <div class="mt-6 md:mt-0">
        <p class="text-center text-white">Special items</p>
        <div class="flex items-center justify-around w-full">
          <div class="grid grid-cols-3 gap-2 text-gray-200 mt-1">
            <p class="bg-gray-950 p-2 px-4 cursor-pointer scale-90 hover:scale-100">X</p>
            <p class="bg-gray-950 p-2 px-4 cursor-pointer scale-90 hover:scale-100">X</p>
            <p class="bg-gray-950 p-2 px-4 cursor-pointer scale-90 hover:scale-100">X</p>
            <p class="bg-gray-950 p-2 px-4 cursor-pointer scale-90 hover:scale-100">X</p>
            <p class="bg-gray-950 p-2 px-4 cursor-pointer scale-90 hover:scale-100">X</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>