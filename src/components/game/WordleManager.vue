<script setup lang="ts">
import {ref} from "vue";

let word: String = "Possum";
const dictionary: String[] = ["Possum", "Capybara", "Flower"];

let key_pressed = ref<String[]>([]);
let input_key_pressed = ref<number>(0)

let trials = ref<String[]>([]);
const MAXIMUM_TRIALS = 3;

word.split("").forEach(letter => {
  key_pressed.value.push("");
})

function changeWordToBeFound(): void {
  word = dictionary[Math.floor(Math.random() * dictionary.length)];
  trials.value = [];
  resetInput();
}

function resetInput(): void {
  key_pressed.value = [];
  input_key_pressed.value = 0;
  word.split("").forEach(letter => {
    key_pressed.value.push("");
  })
}

function verifyWord(trial: String): void {
  if (trial === word) {
    changeWordToBeFound();
  } else {
    if (trials.value.length >= MAXIMUM_TRIALS) {
      changeWordToBeFound();
      //TODO: Retirer de la vie (et.ou du score?)
    } else {
      resetInput();
      trials.value.push(trial);
    }
  }
}

document.addEventListener('keydown', (event: KeyboardEvent) => {
  const keyName = event.key;
  if (keyName === "Shift"
      || keyName === "Control"
      || keyName === "Tab"
      || keyName === "CapsLock"
      || keyName === "Escape"
      || keyName === "Alt") {
    event.preventDefault();
  } else if (keyName === "Backspace") {
    input_key_pressed.value--;
    key_pressed.value[input_key_pressed.value] = "";
  } else if (keyName === "Enter") {
    if (key_pressed.value.join('').length < word.length) {
      alert('Enter word too short!');
    } else {
      verifyWord(key_pressed.value.join(''));
    }
  } else {
    if (input_key_pressed.value < word.length) {
      key_pressed.value[input_key_pressed.value] = event.key;
      input_key_pressed.value++;
    }
  }
});

function getLetterClass(letter: any, index: any) {

  if (letter === word[index]) {
    return 'text-primary-green';
  } else if (word.includes(letter)) {
    return 'text-primary-yellow';
  } else {
    return '';
  }
}
</script>

<template>
  <div class="h-80 mt-8">
    <span v-for="letter in key_pressed" class="text-3xl border border-black px-5 py-2 mx-3">
      {{ letter }}
    </span>
    <div v-for="trial in trials" class="mt-16">
    <span v-for="(letter, index) in trial" class="text-3xl border border-black px-5 py-2 mx-3"
          :class="getLetterClass(letter, index)">
      {{ letter }}
    </span>
    </div>
  </div>
</template>

<style scoped>

</style>