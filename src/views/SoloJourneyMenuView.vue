<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue';
import axios from 'axios';
import Card from '@/components/cards/Card.vue';
import MainMenuButton from '@/components/buttons/MainMenuButton.vue';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

interface Boss {
  id: number;
  name: string;
  description: string;
  default_life: number;
  image_url: string;
  bossCategories: { category: { name: string } }[];
}

const bosses = ref<Boss[]>([]);
const isAuthenticated = computed(() => !!authStore.token);

async function fetchPlayerData(playerId: number) {
  try {
    const response = await axios.get(`http://localhost:3000/game/player/${playerId}`);
    console.log(response.data);
  } catch (error) {
    console.error(`Error fetching player data: ${error}`);
  }
}



onMounted(async () => {
  bosses.value = await getBosses();
  // TODO : Create different action on Autenticated and not Autenticated
  if (authStore.player?.id) {
    console.log('fetching player data')
    await fetchPlayerData(authStore.player.id);
  }

});

watch(
    () => authStore.player?.id,
    (newId) => {
      if (newId) {
        fetchPlayerData(newId);
      }
    }
);

async function getBosses(): Promise<Boss[]> {
  try {
    const response = await axios.get<Boss[]>('http://localhost:3000/boss/three');
    return response.data;
  } catch (error) {
    console.error('Error fetching bosses:', error);
    return [];
  }
}


function getBossCategory(boss: Boss): string {
  if (boss.bossCategories && boss.bossCategories.length > 0) {
    return boss.bossCategories[0].category.name;
  }
  return 'Unknown Category';
}
</script>

<template>
  <div>
    <MainMenuButton background-color="transparent" target="/" :label="ArrowLeftIcon" class="absolute top-3 left-32" />
    <div class="flex flex-row">
      <Card
          @click="() => $router.push({ name: 'game'})"
          class="cursor-pointer"
          v-for="boss in bosses"
          :key="boss.id"
          :title="boss.name"
          :category="getBossCategory(boss)"
          :img-url="boss.image_url"
          :difficulty="1"
      />
      <RouterLink to="shop">
        <Card class="h-full" title="It's shopping time!" category="shop" img-url="Shop.png"/>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>