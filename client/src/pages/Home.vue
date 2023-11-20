<script setup lang="ts">

</script>

<template>
  <div class="home">
  <div class='flex justify-center mt-3 mx-auto items-center'>
    <VueTyper
  :text='["Arya Stark","Jon Snow","Daenerys Targaryen","Melisandre","Tyrion Lannister"]'
  :repeat='Infinity'
  :shuffle='true'
  initial-action='typing'
  :pre-type-delay='70'
  :type-delay='70'
  :pre-erase-delay='2000'
  :erase-delay='250'
  erase-style='backspace'
  :erase-on-complete='true'
  caret-animation='smooth'
></VueTyper>
  </div>

  <div>
    <h3>Where do you want to go?</h3>
    <div>
      <router-link to="/debt-list">Debtors List</router-link>
      <router-link to="/price-list">Price List</router-link>
    </div>
  </div>
  </div>
</template>

<style scoped>
  .home {
    background-color: #f3f4f6;
    height: 100vh;
    width: 100vw;
    background-image: url("../assets/shop-bg.jpg");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    
  }
</style>