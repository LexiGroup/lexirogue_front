<script setup lang="ts">

import {ArrowLeftIcon} from "@heroicons/vue/24/outline";
import MainMenuButton from "@/components/buttons/MainMenuButton.vue";
import KeyboardInput from "@/components/game/KeyboardInput.vue";
import Inventory from "@/components/Inventory.vue";
import Scoreboard from "@/components/game/Scoreboard.vue";
import BuffDebuff from "@/components/game/BuffDebuff.vue";
import PlaceHolder from "@/components/game/WordleManager.vue";
import {onMounted, ref, watch} from "vue";
import { useAuthStore } from '@/stores/auth';
import axios from "axios";
import LifeUi from "@/components/game/LifeUi.vue";
import Back from "@/components/buttons/back.vue";

const authStore = useAuthStore();
const playerLife = ref<number>(0);
const score = ref<number>(0);


async function fetchPlayerData(playerId: number) {
  try {
    const response = await axios.get(`http://localhost:3000/game/player/${playerId}`);
    console.log(response.data);
    playerLife.value = response.data.life;
    score.value = response.data.score;
  } catch (error) {
    console.error(`Error fetching player data: ${error}`);
  }
}

onMounted(async () => {
  // TODO : Create different action on Autenticated and not Autenticated (Pop up who ask for username and create player on server)
  if (authStore.player?.id) {
    console.log('fetching player data' + authStore.player.id)
    const game = await fetchPlayerData(authStore.player.id);
  }
});

watch(
    () => authStore.player?.id,
    (newId) => {
      if (newId) {
        fetchPlayerData(newId);
        console.log('fetching player new id test test test')
      }
    }
);

</script>

<template>
  <div class="grid grid-cols-5 grid-rows-3 h-screen">
    <div>
      <back background-color="transparent" target="play" :label="ArrowLeftIcon"
                      class="lg:left-32"/>
      <BuffDebuff color="red"/>
      <BuffDebuff color="yellow"/>
      <BuffDebuff color="green"/>
    </div>
    <div class="col-span-3 row-span-2">
      <Scoreboard :score="score" class="row-span-1"/>
      <PlaceHolder/>
      <KeyboardInput class="row-span-1"/>
    </div>
    <div class="row-start-1 col-start-5">
      <LifeUi :life="playerLife" />
    </div>
    <div class="row-start-3 col-start-5">
      <Inventory class="md:ml-5 md:h-full md:w-full"/>
    </div>
  </div>
</template>

<style scoped>

</style>