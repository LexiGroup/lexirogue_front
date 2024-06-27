<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const remainingTime = ref(180);
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

let interval: NodeJS.Timeout;

const startTimer = () => {
  interval = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      clearInterval(interval);
      if (confirm('Time out. Do you want to restart?')) {
        window.location.reload();
      } else {
        window.location.href = '/';
      }
    }
  }, 1000);
};

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <p class="text-center text-white text-5xl">
    <span>{{ formatTime(remainingTime) }}</span>
  </p>
</template>

<style scoped>
</style>
