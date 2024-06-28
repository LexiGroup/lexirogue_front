<template>
  <div v-if="isVisible" class="modal">
    <div class="modal-content">
      <span @click="close" class="close">&times;</span>
      <h2 class="text-2xl">Connectez-vous pour jouer</h2>
      <form @submit.prevent="submit" class="mt-3" >
        <div class="flex justify-center align-mid">
          <input v-model="username" class="p-1 border-black border-2 rounded" type="text" placeholder="Nom d'utilisateur" required>
          <button type="submit" class="w-25 h-25 justify-self-center"><PlayIcon class="size-10 text-green-600 "/></button>
        </div>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <div class="google-section">
        <p>Ou connectez-vous avec Google :</p>
        <google-button @click="google" class="google-button" background-color="red"/>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';
import GoogleButton from "@/components/buttons/GoogleButton.vue";
import { PlayIcon } from "@heroicons/vue/24/solid";

interface Props {
  isVisible: boolean;
  close: () => void;
  createNewPlayer: (username: string) => Promise<void>;
}

const props = defineProps<Props>();

const username = ref('');
const errorMessage = ref<string | null>(null);

const submit = async () => {
  try {
    await props.createNewPlayer(username.value);
    errorMessage.value = null;
    props.close();
    location.href = "/play";
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage.value = error.response.data.message;
    } else if (error.message) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = 'Une erreur s\'est produite. Veuillez réessayer.';
    }
  }
};

const google = () => {
  // Logique de connexion avec Google
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  text-align: center;
  border-radius: 8px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.google-section {
  margin-top: 20px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
