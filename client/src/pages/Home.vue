<script setup lang="ts">
import VueTyper from 'vue-typer';

const textArray = ["ToluwaNiose Stores", "What do you want to buy", "Buscuits Sweets", "Pasta Noodles"];
const repeatCount = Infinity;
const shuffleText = false;
const initialAction = 'typing';
const preTypeDelay = 70;
const typeDelay = 70;
const preEraseDelay = 2000;
const eraseDelay = 150;
const eraseStyle = 'backspace';
const eraseOnComplete = false;
const caretAnimation = 'smooth';
</script>

<template>
  <div class='flex justify-center mt-3 mx-auto items-center'>
    <vue-typer
      :text='textArray'
      :repeat='repeatCount'
      :shuffle='shuffleText'
      :initial-action='initialAction'
      :pre-type-delay='preTypeDelay'
      :type-delay='typeDelay'
      :pre-erase-delay='preEraseDelay'
      :erase-delay='eraseDelay'
      :erase-style='eraseStyle'
      :erase-on-complete='eraseOnComplete'
      :caret-animation='caretAnimation'
    ></vue-typer>
  </div>

  <div>
    <h3>Where do you want to go?</h3>
    <div>
      <router-link to="/debt-list">Debtors List</router-link>
      <router-link to="/price-list">Price List</router-link>
    </div>
  </div>
</template>

<style>

</style>