<script setup lang="ts">

import Card from "@/components/cards/Card.vue";
import MainMenuButton from "@/components/buttons/MainMenuButton.vue";
import {ArrowLeftIcon} from "@heroicons/vue/24/outline";
</script>

<template>
  <MainMenuButton background-color="transparent" target="/" :label="ArrowLeftIcon" class="absolute top-3 left-32" />
  <div class="flex flex-row">
    <Card title="Souper-Capy" category="capybara" img-url="CapyHero.png" :difficulty="0"/>
    <Card title="Anxious Possum" category="possum" img-url="AnxiousPossum.png" :difficulty="1"/>
    <Card title="Anxious Possum" category="possum" img-url="AnxiousPossum.png" :difficulty="1"/>
    <Card title="Anxious Possum" category="possum" img-url="AnxiousPossum.png" :difficulty="2"/>
  </div>
</template>

<style scoped>

</style>