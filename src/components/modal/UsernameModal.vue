<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span @click="close" class="close">&times;</span>
      <h2>Connectez-vous pour jouer</h2>
      <form @submit.prevent="submit">
        <input v-model="username" type="text" placeholder="Nom d'utilisateur" required>
        <button type="submit">Jouer</button>
      </form>
      <google-button @click="google" class="google-button" background-color="red"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import GoogleButton from "@/components/buttons/GoogleButton.vue";

defineProps({
  isVisible: Boolean,
  close: Function,
  createNewPlayer: Function
});

const username = ref('');

const submit = () => {
  // Envoyez une requête pour créer un nouveau joueur avec le nom d'utilisateur
  createNewPlayer(username.value);
};

const google = () => {
  // Connectez-vous avec Google
};
</script>

<style scoped>
/* Ajoutez vos styles ici */
</style>