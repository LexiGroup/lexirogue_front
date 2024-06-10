<script setup lang="ts">
import CategoryTag from "@/components/cards/CategoryTag.vue";
import {computed, ref} from "vue";

const props = defineProps<{
  title: string,
  category: string
  difficulty: number
  imgUrl?: string
}>()

const difficultyRef = ref(props.difficulty);

const difficultyColor = computed(() => {
  if (difficultyRef.value === 0) {
    return 'green';
  } else if (difficultyRef.value === 1) {
    return 'yellow';
  } else {
    return 'red';
  }
})
</script>

<!-- TODO: Les cartes ne sont pas uniformes en height et en width -->
<!-- TODO: Ajouter score quand implémenté -->
<template>
  <div class="flex flex-col bg-white hover:bg-gray-100 rounded-md border-4 border-black p-3 scale-95 hover:scale-100 mx-4">
    <div :class="['bg-primary-' + difficultyColor, 'p-5', 'rounded', 'w-full', 'h-full']">
      <div>
        <img class="object-cover w-full" :src="'src/assets/img/' + props.imgUrl" :alt="`${title}`"> <!-- TODO: Utiliser '@' plutôt que `src` pour webpack -->
      </div>
      <div>
        <p class="text-4xl flex justify-center my-2 text-center">{{ props.title }}</p>
        <CategoryTag :label="`${props.category}`"/>
      </div>
      <span class="flex justify-center mt-2 text-3xl">En X lettres</span>
    </div>
  </div>
</template>

<style scoped>

</style>
