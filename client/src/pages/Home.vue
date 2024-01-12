<!-- Home.vue -->

<template>
  <div class="home">
    <div class="content flex flex-col items-center w-full absolute top-0 left-0 space-y-10 justify-center h-full">
      <div class="mt-3 mx-auto items-center dark:text-white">
        <VueTyper
          :text='["Check the latest prices","Check the debt records","What are we selling?","Pasta Noodles","Where are you going?",]'
          :repeat='Infinity'
          :shuffle='true'
          initial-action='typing'
          :pre-type-delay='70'
          :type-delay='70'
          :pre-erase-delay='2000'
          :erase-delay='100'
          erase-style='backspace'
          :erase-on-complete='true'
          caret-animation='smooth'
          :style="{ fontSize: '50px', color: 'white', fontWeight: 'bold' }"
        ></VueTyper>
      </div>

      <div>
        <h3 class=" font-mono font-semibold">Where do you want to go?</h3>
        <div class="flex space-x-10 m-6">
          <router-link to="/debt-list">Debt Records</router-link>
          <router-link to="/price-list">Price List</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .home {
    background-color: #f3f4f6;
    /* height: 100vh;
    width: 100vw; */
    background-image: url("../assets/shop-bg.jpg");
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    /* position: relative; */
    /* overflow: hidden; */
  }

</style>
