<script setup lang="ts">

defineProps<{
  label: string;
}>()

</script>

<template>
  <div class="flex justify-center items-center">
    <div class="inline-block bg-gray-900 text-white rounded p-0.5 px-1 mt-0.5">
      {{ label }}
    </div>
  </div>
</template>

<style scoped>

</style>
