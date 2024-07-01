<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import {io} from "socket.io-client";



const socket = io('http://localhost:3000');

let word = ref<string>("");
let key_pressed = ref<string[]>([]);
let input_key_pressed = ref<number>(0)
let trials = ref<string[]>([]);
const MAXIMUM_TRIALS = 3;
const message = ref<string>("");

onMounted(async () => {
  word.value = await getRandomWord();
  console.log(word.value)
  resetInput();
});

socket.on("wordIsEqual", (response) => {
  console.log(response)
  if (response.equal) {
    changeWordToBeFound();
  } else {
    if (trials.value.length >= MAXIMUM_TRIALS) {
      changeWordToBeFound();
      //TODO: Retirer de la vie (et.ou du score?)
    } else {
      trials.value.push(key_pressed.value.join(''));
      resetInput();
    }
  }
})

socket.on("wordVerificationResponse", (response) => {
  if (!response.exist) {
    alert("Le mot n'existe pas");
  }
})

async function getRandomWord(): Promise<string> {
  try {
    const response = await axios.get("http://localhost:3000/word/random");
    return response.data.ortho;
  } catch (error) {
    return "Possum";
  }
}

async function changeWordToBeFound(): Promise<void> {
  word.value = await getRandomWord();
  console.log(word.value)
  trials.value = [];
  resetInput();
}

function resetInput(): void {
  key_pressed.value = [];
  input_key_pressed.value = 0;
  word.value.split("").forEach(letter => {
    key_pressed.value.push("");
  })
}

function verifyWord(trial: string): void {
  if (trial === word.value) {
    //TODO: Augmenter le score et voir avec la route si un autre mot doit être chargé ou c'est le tour du boss
    changeWordToBeFound();
  } else {
    //Plus de tentatives
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
  if (!/^\p{L}$/u.test(keyName)) {
    if (keyName === "Backspace") {
      input_key_pressed.value--;
      key_pressed.value[input_key_pressed.value] = "";
    } else if (keyName === "Enter") {
      if (key_pressed.value.join('').length < word.value.length) {
        alert('Enter word too short!');
      } else {
        socket.emit("verifyWord", key_pressed.value.join('') + '_' + word.value);
      }
      event.preventDefault();
    }
  } else {
    if (input_key_pressed.value < word.value.length) {
      key_pressed.value[input_key_pressed.value] = event.key;
      input_key_pressed.value++;
    }
  }
});

function getLetterClass(letter: any, index: any) {
  if (letter === word.value[index]) {
    return 'text-primary-green';
  } else if (word.value.includes(letter)) {
    return 'text-primary-yellow';
  } else {
    return '';
  }
}
</script>

<template>
  <div class="h-80 mt-8">
    <h1>{{message}}</h1>
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
