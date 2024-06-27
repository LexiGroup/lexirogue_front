<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  life: number
}>();
</script>

<template>
  <div class="life-ui">
    <p>Life: {{ life }}</p>
  </div>
</template>

<style scoped>

</style>