<script setup lang="ts">
defineProps<{
  label: string,
  backgroundColor: string,
}>()
</script>

<template>
  <div class="my-3 cursor-pointer bg-white inline-block p-1.5 rounded-md border-4 border-black scale-95 hover:scale-100 min-w-full">
    <div :class="`bg-primary-${backgroundColor} px-14 py-3 rounded flex justify-center`">
      <p class="text-4xl text-black">{{label}}</p> <!-- Rajouter couleur texte tailwind palette -->
    </div>
  </div>
</template>

<style scoped>

</style>