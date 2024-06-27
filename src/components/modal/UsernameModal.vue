
<template>
  <div v-if="isAuthenticated">
    <div v-if="isVisible" class="modal-overlay" @click="close">
      <div class="modal-content w-1/4 h-3/4 bg-no-repeat p-14 flex-row  justify-items-center justify-self-center justify-center " @click.stop>
        <div>
          <button @click="close" class="close-button">X</button>
          <h1>Profil</h1>
          <form @submit.prevent="updateUsername">
            <label for="username">Pseudo:</label>
            <input v-model="username" id="username" type="text" required />
            <button type="submit">Mettre à jour</button>
          </form>
        </div>
        <nav class="justify-self-stretch">
          <main-menu-button @click="logout" text-size="18"  class="text-sm" v-if="isAuthenticated" background-color="red" label="Se déconnecter"  />

        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch} from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
import {jwtDecode} from "jwt-decode";
import MainMenuButton from "@/components/buttons/MainMenuButton.vue";

const token = localStorage.getItem('authToken');
if (token) {
  const decodedToken = jwtDecode(token);
  console.log('Decoded token:', decodedToken);
}

export default defineComponent({
  components: {MainMenuButton},
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const authStore = useAuthStore();
    const username = ref('');



    watch(
        () => authStore.player,
        (newPlayer) => {
          if (newPlayer) {
            username.value = newPlayer.username || '';

          }
        },
        { immediate: true }
    );




    const updateUsername = async () => {
      if (authStore.player && authStore.player.id) {
        console.log(`${import.meta.env.VITE_API_URL}/player/${authStore.player.id}`)
        try {
          await axios.put(`${import.meta.env.VITE_API_URL}/player/${authStore.player.id}`, { username: username.value }, {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          });
          authStore.player.username = username.value;

        } catch (error) {
          console.error('Erreur lors de la mise à jour du pseudo', error);

        }
      }
    };

    return {
      username,
      logout,
      isAuthenticated,
      updateUsername,
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
});
</script>

<style scoped>
h1 {
  font-family: 'Grandstander', cursive;
  font-size: 2em;
  text-align: center;
  margin-bottom: 22px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  border-radius: 5px;
  position: relative;
  background-image: url('@/assets/img/background/notebook_2.png');
  background-repeat: no-repeat;
  background-size: contain;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5em;
}
</style>
