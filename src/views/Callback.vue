<!-- src/views/Callback.vue -->
<template>
  <div>
    <p>Authentification en cours...</p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  const token = route.query.token as string;
  if (token) {
    authStore.setToken(token);
    router.push('/');
  } else {
    console.error('Token manquant');
  }
});
</script>
