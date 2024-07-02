<script setup lang="ts">
import MainMenuButton from "@/components/buttons/MainMenuButton.vue";
import {Cog6ToothIcon, GlobeAltIcon, ShoppingCartIcon, UserCircleIcon} from "@heroicons/vue/24/outline";
import GoogleButton from "@/components/buttons/GoogleButton.vue";
import ProfilModal from "@/components/modal/ProfilModal.vue";
import { onMounted, computed, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import axios from "axios";
import UsernameModal from "@/components/modal/UsernameModal.vue";
import Logo from "@/components/icons/Logo.vue";
import Back from "@/components/buttons/back.vue";

const authStore = useAuthStore();
const isAuthenticated = computed(() => !!authStore.token);

onMounted(async () => {
  authStore.loadTokenFromStorage();
  await authStore.ensureTokenValidity();
});

const showModal = ref(false);
const showProfileModal = ref(false);

const profile = () => {
  showProfileModal.value = true;
};

const closeModal = () => {
  showProfileModal.value = false;
};

async function createNewPlayer(username: string): Promise<void> {
  try {
    const response = await axios.post(`http://localhost:3000/player/`, { username });
    console.log(response.data);
    authStore.player = response.data;
    authStore.savePlayerToLocalStorage(response.data);
    closeModal();
  } catch (error: any) {
    console.error('createNewPlayer error:', error);
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Une erreur s\'est produite. Veuillez réessayer.');
    }
  }
}

const game = () => {
  if (!isAuthenticated.value) {
    if(authStore.player?.username) {
      location.href = "/play";
    } else {
      showModal.value = true;
    }
  } else {
    location.href = "/play";
  }
};

const close = () => {
  showModal.value = false;
};

const google = () => {
  // Logique de connexion avec Google
};
</script>

<template>
  <div class="grid place-items-center h-screen">
    <username-modal :is-visible="showModal" @close="closeModal" :create-new-player="createNewPlayer" :close="close"/>
    <div class="grid grid-cols-5 grid-rows-4 gap-x-6 ">
      <div class="col-span-2 row-span-5 flex items-center justify-center">
        <div class="flex flex-col items-center">
          <logo class="w-96 h-76"/>
          <main-menu-button @click="game" label="JOUER" background-color="red"/>
          <main-menu-button target="game" label="JEU DU JOUR" background-color="red"/>
          <main-menu-button target="multiplayer" label="MULTIJOUEUR" background-color="red"/>
        </div>
      </div>
      <div class="col-span-3 ">
        <div class="flex flex-row justify-evenly">
          <main-menu-button background-color="red" :label="ShoppingCartIcon"/>
          <main-menu-button background-color="red" :label="GlobeAltIcon"/>
          <main-menu-button background-color="red" :label="Cog6ToothIcon"/>
        </div>

      <div class="w-full h-full bg-gray-400">
      </div>
      </div>
      <div v-if="showProfileModal ">
        <ProfilModal :is-visible="showProfileModal" @close="closeModal"/>
      </div>
      <google-button v-if="!isAuthenticated" @click="google" class="absolute bottom-16 right-16 w-30" background-color="red"/>
      <back class="absolute bottom-16 right-16 w-30" v-if="isAuthenticated" background-color="red" :label="UserCircleIcon" @click="profile"/>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
