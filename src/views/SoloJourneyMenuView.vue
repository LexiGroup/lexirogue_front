<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import Card from '@/components/cards/Card.vue';
import MainMenuButton from '@/components/buttons/MainMenuButton.vue';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { RouterLink } from 'vue-router';

interface Boss {
  id: number;
  name: string;
  description: string;
  default_life: number;
}

const bosses = ref<Boss[]>([]);

onMounted(async () => {
  bosses.value = await getBosses();
});

async function getBosses(): Promise<Boss[]> {
  try {
    const response = await axios.get<Boss[]>('http://localhost:3000/boss/three');
    return response.data;
  } catch (error) {
    console.error('Error fetching bosses:', error);
    return [];
  }
}
</script>

<template>
  <div>
    <MainMenuButton background-color="transparent" target="/" :label="ArrowLeftIcon" class="absolute top-3 left-32" />
    <div class="flex flex-row">
      <Card v-for="boss in bosses" :key="boss.id" :title="boss.name" category="capybara" img-url="CapyHero.png" :difficulty="1"/>
      <RouterLink to="shop">
        <Card class="h-full" title="It's shopping time!" category="shop" img-url="Shop.png"/>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>

</style>