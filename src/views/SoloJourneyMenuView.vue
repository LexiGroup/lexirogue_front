<script setup lang="ts">

import Card from "@/components/cards/Card.vue";
import MainMenuButton from "@/components/buttons/MainMenuButton.vue";
import {ArrowLeftIcon} from "@heroicons/vue/24/outline";
</script>

<template>
  <MainMenuButton background-color="transparent" target="/" :label="ArrowLeftIcon" class="absolute top-3 left-32" />
  <div class="flex flex-row">
    <Card title="Souper-Capy" category="capybara" img-url="CapyHero.png" :difficulty="1"/>
    <Card title="Anxious Possum" category="possum" img-url="AnxiousPossum.png" :difficulty="2"/>
    <Card title="Anxious Possum" category="possum" img-url="AnxiousPossum.png" :difficulty="3"/>
    <RouterLink to="shop">
      <Card class="h-full" title="It's shopping time!" category="shop" img-url="Shop.png"/>
    </RouterLink>
  </div>
</template>

<style scoped>

</style>