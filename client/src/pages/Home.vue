<script setup>
	import { VueTyper } from 'vue-typer';

  components: {
	  VueTyper
	}

</script>

<template>
  <div :class='flex justify-center mt-3 mx-auto items-center'>
    <vue-typer
      :text='["ToluwaNiose Stores","What do you want to buy","Buscuits Sweets","Pasta Noodles"]'
      :repeat='Infinity'
      :shuffle='false'
      initial-action='typing'
      :pre-type-delay='70'
      :type-delay='70'
      :pre-erase-delay='2000'
      :erase-delay='150'
      erase-style='backspace'
      :erase-on-complete='false'
      caret-animation='smooth'
></vue-typer>
  </div>
	<div>
    <h3>Where do you want to go?</h3>
		<div>
		  <>Debtors  List</button>
		</div>
	</div>
<template/>

<style>
@import 'vue-typer/dist/vue-typer.css';
</style>