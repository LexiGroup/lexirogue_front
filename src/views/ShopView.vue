<script setup lang="ts">
import {ArrowLeftIcon} from "@heroicons/vue/24/outline";
import MainMenuButton from "@/components/buttons/MainMenuButton.vue";
import ShopCard from "@/components/cards/ShopCard.vue";
import Inventory from "@/components/Inventory.vue";
</script>

<template>
  <div class="h-20 mb-6 flex flex-row items-center justify-center">
    <MainMenuButton background-color="transparent" target="play" :label="ArrowLeftIcon" class="absolute top-3 left-4 sm:left-8 md:left-16 lg:left-32" />
    <p class="bg-gray-950 h-full text-white p-4 sm:p-6 hidden md:block">SCOREBOARD PLACEHOLDER</p>
  </div>
  <div class="flex flex-col items-center">
    <div class="w-full max-w-screen-lg">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
        <ShopCard img-url="knife.png" description="Double les 3 prochaines attaques" :price="5" title="Dague" category="Objet d'attaque"/>
        <ShopCard img-url="potion.png" description="Soigne 25 pv" :price="10" title="Potion" category="Objet de soin"/>
        <ShopCard img-url="relife.png" description="Dite ‘NON’ à la mort, et passez votre tour." :price="50" title="Seconde main" category="Objet d'attaque"/>
      </div>
      <Inventory/>
    </div>
  </div>
</template>

<style scoped>

</style>
