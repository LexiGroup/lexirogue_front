<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import MainMenuButton from "@/components/buttons/MainMenuButton.vue";
</script>

<template>
<div class="flex flex-col items-center">
  <main-menu-button label="JOUER" background-color="red"/>
  <main-menu-button label="JEU DU JOUR" background-color="red"/>
  <main-menu-button label="MULTIJOUEUR" background-color="red"/>
</div>
</template>
