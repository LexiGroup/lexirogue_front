<script setup lang="ts">
const azerty = ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'w', 'x', 'c', 'v', 'b', 'n'];
const qwerty = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];

const selected_layout = azerty; //TODO: Get the layout from the player settings
</script>

<template>
  <div class="grid grid-cols-10 gap-5">
    <p v-for="key in selected_layout" class="cursor-pointer border-black border-4 text-4xl px-4 py-2 scale-95 justify-items-center hover:scale-100 text-center">{{ key }}</p>
  </div>
</template>

<style scoped>

</style>