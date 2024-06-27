<script setup lang="ts">

import ScoreboardTimer from "@/components/game/ScoreboardTimer.vue";
</script>

<template>
  <div class="bg-[url('src/assets/img/wood.png')] p-3 bg-no-repeat bg-cover w-full md:w-1/2 m-auto">
    <div
        class="bg-[url('src/assets/img/board.png')] bg-no-repeat bg-cover p-2">
      <p class="text-center text-white font-bold text-2xl">Score: <span>352</span></p>
      <p class="text-center text-white text-lg">round <span>3</span></p>
      <ScoreboardTimer/>
    </div>
  </div>
</template>

<style scoped>

</style>