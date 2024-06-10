<script setup lang="ts">
import {computed, type FunctionalComponent} from "vue";

const props = defineProps<{
  icon: FunctionalComponent,
  size?: number
}>();

const final_size = computed(() => {
  const size = props.size || 8;
  return `w-${size}`;
});
</script>

<template>
  <component :is="icon" :class="`${final_size} scale-90 hover:scale-100 cursor-pointer`"/>
</template>

<style scoped>

</style>