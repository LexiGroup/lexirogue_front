<script setup lang="ts">
import HeroIcon from "@/components/icons/HeroIcon.vue";
import {BeakerIcon, KeyIcon, RocketLaunchIcon, ScissorsIcon, ShieldCheckIcon} from "@heroicons/vue/24/outline";

interface Item {
  id: number;
  name: string;
}
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