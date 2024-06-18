<script setup lang="ts">
defineProps<{
  color: string
}>()
</script>

<template>
  <div :class="`bg-primary-${color} p-6 m-4`">
    <p class="text-2xl font-bold text-gray-700">
      Désordre
    </p>
    <p>Cupcake ipsum dolor sit amet croissant jelly beans pudding. Fruitcake pie fruitcake wafer I love dessert.</p>
  </div>
</template>

<style scoped>

</style>