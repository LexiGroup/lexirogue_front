<script setup lang="ts">
import {defineProps} from 'vue'
import {RouterLink} from 'vue-router'

defineProps<{
  label: string | Object,
  backgroundColor: string,
  target?: string
}>()
</script>

<template>
  <component :is="target ? RouterLink : 'div'" :to="target ? `${target}` : undefined"
             class="my-3 cursor-pointer bg-white inline-block p-1.5 rounded-md border-4 border-black scale-95 hover:scale-100">
    <div :class="`bg-primary-${backgroundColor} ${typeof label === 'string' ? 'px-14' : 'px-7'} py-3 rounded flex justify-center`">
      <p v-if="typeof label === 'string'" class="text-4xl text-black">{{ label }}</p>
      <component v-else :is="label" class="w-16 text-black"/>
    </div>
  </component>
</template>

<style scoped>

</style>
