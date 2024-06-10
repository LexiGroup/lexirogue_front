<script setup lang="ts">
defineProps<{
  label: string | Object,
  backgroundColor: string,
  target?: string
}>()
</script>

<template>
  <RouterLink v-if="typeof label === 'string'"
       class="my-3 cursor-pointer bg-white inline-block p-1.5 rounded-md border-4 border-black scale-95 hover:scale-100" :to="`${target}`">
    <div :class="`bg-primary-${backgroundColor} px-14 py-3 rounded flex justify-center`">
      <p class="text-4xl text-black">{{ label }}</p> <!-- Rajouter couleur texte tailwind palette -->
    </div>
  </RouterLink>
  <RouterLink v-else
       class="my-3 cursor-pointer bg-white inline-block p-1.5 rounded-md border-4 border-black scale-95 hover:scale-100" :to="`${target}`">
    <div :class="`bg-primary-${backgroundColor} px-7 py-3 rounded flex justify-center`">
      <component :is="label" class="w-16 text-black"/>
    </div>
  </RouterLink>
</template>

<style scoped>

</style>