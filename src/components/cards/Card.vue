<script setup lang="ts">
import CategoryTag from "@/components/cards/CategoryTag.vue";
import { computed, ref, watch } from "vue";

const props = defineProps<{
  title: string,
  category: string,
  difficulty?: number,
  imgUrl?: string,
  nbLetter?: number
}>()

console.log('Props in Card.vue:', props);

const difficultyRef = ref(props.difficulty);

const difficultyColor = computed(() => {
  if (difficultyRef.value === 1) {
    return 'green';
  } else if (difficultyRef.value === 2) {
    return 'yellow';
  } else if (difficultyRef.value === 3) {
    return 'red';
  } else {
    return '';
  }
});

// Ajoutez ce watch pour vérifier les props reçues
watch(
    () => props,
    (newProps) => {
      console.log('Received props in Card.vue:', newProps);
    },
    { immediate: true }
);
</script>

<template>
  <div class="flex flex-col h-full hover:bg-gray-100 rounded-md border-4 border-black p-3 scale-95 hover:scale-100 mx-4">
    <div :class="['bg-primary-' + difficultyColor, 'p-5', 'rounded', 'w-full', 'h-full']">
      <div>
        <img class="object-cover object-center w-full h-[200px]" :src="'src/assets/img/'+props.imgUrl" :alt="title">
      </div>
      <div>
        <p class="text-4xl flex justify-center items-center my-2 text-center">{{ title }} <span v-if="!props.difficulty"><!--<component :is="ShoppingBagIcon" class="w-8"/>--></span></p>
        <CategoryTag v-if="props.difficulty" :label="`${props.category}`"/>
      </div>
      <span v-if="props.difficulty" class="flex justify-center mt-2 text-3xl">En {{ props.nbLetter }} lettres</span>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
