<script setup lang="ts">

import {ArrowLeftIcon} from "@heroicons/vue/24/outline";
import MainMenuButton from "@/components/buttons/MainMenuButton.vue";
import KeyboardInput from "@/components/game/KeyboardInput.vue";
import Inventory from "@/components/Inventory.vue";
import Scoreboard from "@/components/game/Scoreboard.vue";
import BuffDebuff from "@/components/game/BuffDebuff.vue";
import PlaceHolder from "@/components/game/WordleManager.vue";
</script>

<template>
  <div class="grid grid-cols-5 grid-rows-3 h-screen">
    <div>
      <MainMenuButton background-color="transparent" target="play" :label="ArrowLeftIcon"
                      class="lg:left-32"/>
      <BuffDebuff color="red"/>
      <BuffDebuff color="yellow"/>
      <BuffDebuff color="green"/>
    </div>
    <div class="col-span-3 row-span-2">
      <Scoreboard class="row-span-1"/>
      <PlaceHolder/>
      <KeyboardInput class="row-span-1"/>
    </div>
    <div class="row-start-3 col-start-5">
      <Inventory class="md:ml-5 md:h-full md:w-full"/>
    </div>
  </div>
</template>

<style scoped>

</style>