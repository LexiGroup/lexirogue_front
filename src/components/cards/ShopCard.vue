<script setup lang="ts">
import CategoryTag from "@/components/cards/CategoryTag.vue";
import {ShoppingBagIcon} from "@heroicons/vue/24/outline";
import MainMenuButton from "@/components/buttons/MainMenuButton.vue";
import ShopButton from "@/components/buttons/ShopButton.vue";

const props = defineProps<{
  title: string,
  price: number,
  category: string,
  description: string,
  imgUrl?: string
}>();
</script>

<template>
  <div class="flex flex-col bg-white hover:bg-gray-100 rounded-md border-4 border-black p-2 scale-95 hover:scale-100 mx-4 w-3/4 sm:w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl">
    <div class="p-3 rounded w-full h-full">
      <div class="aspect-w-16 aspect-h-9">
        <img class="object-cover w-full h-full rounded-t-md" :src="'src/assets/img/' + props.imgUrl" :alt="`${title}`"> <!-- TODO: Utiliser '@' plutôt que `src` pour webpack -->
      </div>
      <div class="p-2">
        <p class="text-xl md:text-2xl lg:text-3xl flex justify-center items-center my-2 text-center">{{ props.price }} LR</p>
        <p class="text-lg md:text-xl lg:text-2xl flex justify-center items-center my-2 text-center">{{ props.title }}</p>
        <div class="flex justify-center my-2">
          <CategoryTag :label="`${props.category}`"/>
        </div>
        <p class="text-sm md:text-base lg:text-lg flex justify-center items-center my-2 text-center">{{ props.description }}</p>
      </div>
      <div class="flex justify-center mt-4">
        <ShopButton/>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
