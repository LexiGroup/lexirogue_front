<script setup lang="ts">
import MainMenuButton from "@/components/buttons/MainMenuButton.vue";
import {Cog6ToothIcon, GlobeAltIcon, ShoppingCartIcon, UserCircleIcon} from "@heroicons/vue/24/outline";
import GoogleButton from "@/components/buttons/GoogleButton.vue";
import ProfilModal from "@/components/modal/ProfilModal.vue";
import {onMounted, computed, ref, type UnwrapRef, type Ref} from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const isAuthenticated = computed(() => !!authStore.token);

onMounted(async () => {
  authStore.loadTokenFromStorage();
  await authStore.ensureTokenValidity();
});


const showModal = ref(false);

const profile = () => {
  showModal.value = true;
};

</script>

<template>

  <div class="grid grid-cols-5 grid-rows-5 gap-x-6 gap-y-4">
    <div class="col-span-2 row-span-5 flex items-center justify-center">
      <div class="flex flex-col items-center">
        <main-menu-button target="play" label="JOUER" background-color="red"/>
        <main-menu-button target="game" label="JEU DU JOUR" background-color="red"/>
        <main-menu-button target="multiplayer" label="MULTIJOUEUR" background-color="red"/>
      </div>
    </div>
    <div class="col-span-3 row-span-2">
      <div class="flex flex-row justify-evenly">
        <main-menu-button background-color="red" :label="ShoppingCartIcon"/>
        <main-menu-button background-color="red" :label="GlobeAltIcon"/>
        <main-menu-button background-color="red" :label="Cog6ToothIcon"/>
      </div>
    </div>
    <div class="col-span-3 row-span-3 bg-gray-400">
    </div>

    <div>
      <ProfilModal :isVisible="showModal" @close="showModal = false">
      </ProfilModal>
    </div>
     <google-button v-if="!isAuthenticated"  class="absolute bottom-16 right-16 w-30" background-color="red"/>
      <main-menu-button  class="absolute bottom-16 right-16 w-30" v-if="isAuthenticated" background-color="red" :label="UserCircleIcon" @click="profile"/>
  </div>

</template>
