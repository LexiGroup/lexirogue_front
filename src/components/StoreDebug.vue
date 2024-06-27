<template>
  <div>
    <h2>Debug Store</h2>
    <pre>{{ authStore.user }}</pre>
    <pre>{{ authStore.player }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from '@/stores/auth';

export default defineComponent({
  setup() {
    const authStore = useAuthStore();

    return {
      authStore,
    };
  },
});
</script>

<style scoped>
pre {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  overflow: auto;
}
</style>
