<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import axios from 'axios';
import Card from '@/components/cards/Card.vue';
import MainMenuButton from '@/components/buttons/MainMenuButton.vue';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import {useRouteStore} from "@/stores/routes";
import router from "@/router";
import Back from "@/components/buttons/back.vue";

const authStore = useAuthStore();
const routeStore = useRouteStore();

const apiUrl = import.meta.env.VITE_API_URL;

interface Boss {
  id: number;
  name: string;
  description: string;
  default_life: number;
  image_url: string;
  bossCategories: { category: { name: string } }[];
}

const bosses = ref<Boss[]>([]);
const easyBosses = ref<{ boss: Boss, letters: number }[]>([]);
const normalBosses = ref<{ boss: Boss, letters: number }[]>([]);
const hardBosses = ref<{ boss: Boss, letters: number }[]>([]);
const isAuthenticated = computed(() => !!authStore.token);
const isRoadselect = computed(() => !!routeStore.selectedRoute);

async function fetchPlayerData(playerId: number) {
  try {
    const response = await axios.get(`${apiUrl}/game/player/${playerId}`);
  } catch (error) {
    console.error(`Error fetching player data: ${error}`);
  }
}

function getNumberLetter(level: number): number {
  let length: number;
  if (level === 1) {
    length = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
  } else if (level === 2) {
    length = Math.floor(Math.random() * (8 - 6 + 1)) + 6;
  } else if (level === 3) {
    length = Math.floor(Math.random() * (14 - 7 + 1)) + 7;
  } else {
    length = 0;
  }
  return length;
}

onMounted(async () => {
  const allBosses = await getBosses();
  allBosses.forEach((boss, index) => {
    let difficulty: number;
    if (index % 3 === 0) {
      difficulty = 1;
    } else if (index % 3 === 1) {
      difficulty = 2;
    } else {
      difficulty = 3;
    }

    const letters = getNumberLetter(difficulty);
    if (difficulty === 1) {
      easyBosses.value.push({ boss, letters });
    } else if (difficulty === 2) {
      normalBosses.value.push({ boss, letters });
    } else if (difficulty === 3) {
      hardBosses.value.push({ boss, letters });
    }
  });


  if (authStore.player?.id) {
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
    const response = await axios.get<Boss[]>(`${apiUrl}/boss/three`);
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

function handleCardClick(boss: Boss, difficulty: number, letters: number) {
  routeStore.setRoute({
    bossId: boss.id,
    name: boss.name,
    difficulty,
    nbLetter: letters,
  });
  router.push({ name: 'game' });
}

</script>

<template>
  <div>
    <back background-color="white" :label="ArrowLeftIcon" target="/"/>
    <div class="flex flex-row flex-wrap justify-center mt-20">
      <div class="w-1/4 p-2">
        <div class="flex flex-col space-y-4">
          <Card
              v-for="{ boss, letters } in easyBosses"
              :key="boss.id"
              @click="handleCardClick(boss, 1, letters)"
              class="cursor-pointer"
              :title="boss.name"
              :category="getBossCategory(boss)"
              :img-url="boss.image_url"
              :difficulty="1"
              :nbLetter="letters"
          />
        </div>
      </div>
      <div class="w-1/4 p-2">
        <div class="flex flex-col space-y-4">
          <Card
              v-for="{ boss, letters } in normalBosses"
              :key="boss.id"
              @click="handleCardClick(boss, 2, letters)"
              class="cursor-pointer"
              :title="boss.name"
              :category="getBossCategory(boss)"
              :img-url="boss.image_url"
              :difficulty="2"
              :nbLetter="letters"
          />
        </div>
      </div>
      <div class="w-1/4 p-2">
        <div class="flex flex-col space-y-4">
          <Card
              v-for="{ boss, letters } in hardBosses"
              :key="boss.id"
              @click="handleCardClick(boss, 3, letters)"
              class="cursor-pointer"
              :title="boss.name"
              :category="getBossCategory(boss)"
              :img-url="boss.image_url"
              :difficulty="3"
              :nbLetter="letters"
          />
        </div>
      </div>
      <div v-if="isRoadselect" class="w-1/4 p-2">
        <RouterLink to="shop">
          <Card v-if="isRoadselect" class="h-full" title="It's shopping time!" category="shop" img-url="Shop.png"/>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

