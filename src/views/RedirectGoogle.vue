<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const apiUrl = import.meta.env.VITE_API_URL;
const route = useRoute();

onMounted(() => {
  const playerId = route.query.playerId;
  const redirectUrl = new URL(`${apiUrl}/auth/google`);
  if (playerId) {
    redirectUrl.searchParams.append('playerId', playerId);
  }
  window.location.href = redirectUrl.toString();
});
</script>

<template>
  <div>Redirecting to Google...</div>
</template>
