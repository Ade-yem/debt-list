<template>
<header :class="['absolute top-0 w-[100%] align-middle z-10 left-0 h-fit']">
<div class="flex justify-between  ">
  <div class="h-10 w-25 my-4 ml-6" id="logo">
    <img src="../assets/toluwa1.jpg" class="h-full w-full" alt="tolu">
	</div>
	<div class="hidden  sm:flex justify-center space-x-4 mt-4">
    <router-link class="p-4 " to="/" >Home</router-link>
    <router-link v-if="!store.loggedIn" class="p-4 " to="/login">Login</router-link>
    <router-link v-if="!store.loggedIn" class="p-4 " to="/signup">Signup</router-link>
    <router-link class="p-4 " to="/debt-list">Debtors</router-link>
    <router-link class="p-4 " to="/price-list">Price List</router-link>
    <router-link class="p-4 " to="/to-buy">To Buy</router-link>
  </div>
  <div class="block">
    <button v-if="store.loggedIn" @click="toggleLogout" class="text-white bg-blue-500 hover:bg-blue-700 focus:ring-2 focus:outline-none focus:ring-blue-100 font-medium mr-6 my-4 rounded-full text-sm px-3 py-1.5 text-center inline-flex items-center dark:bg-blue-400 dark:hover:bg-blue-600 dark:focus:ring-blue-600" type="button">
      <span class="text-2xl">{{ store.user.charAt(0).toLocaleUpperCase() }} </span>
      <svg class="w-2 h-2 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
      </svg>
    </button>
    <!-- // a dropdown when the username is clicked that shows logout button -->
    <div v-if="showLogout" class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
      <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
        <div>{{store.user}}</div>
      </div>
      
      <div class="py-2">
        <p @click="Logout" class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</p>
      </div>
    </div>
  </div>
  <div @click="toggleCaret" class=" sm:hidden py-4 px-6 mt-3">
    <font-awesome-icon v-if="!caret" :icon="['fas', 'caret-down']" style="color: blue" size="2xl" />
    <font-awesome-icon v-else :icon="['fas', 'caret-down']" rotation=180 style="color: blue" size="2xl" />
  </div>
  
</div>
  <div v-if="caret" class="justify-center text-sm transition duration-150 ease-linear">
    <router-link class="pt-2 pb-3 px-2" to="/" >Home</router-link>
    <router-link class="pt-2 pb-3 px-2" to="/login">Login</router-link>
    <router-link class="pt-2 pb-3 px-2" to="/signup">Signup</router-link>
    <router-link class="pt-2 pb-3 px-2" to="/debt-list">Debtors</router-link>
    <router-link class="pt-2 pb-3 px-2" to="/price-list">Price List</router-link>
    <router-link class="pt-2 pb-3 px-2" to="/to-buy">To Buy</router-link>
  </div>
</header>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { store } from '../utils/store';
  import { useToast } from 'vue-toastification';
  import { useRouter } from 'vue-router';
  
  const caret = ref(false);
  const showLogout = ref(false);
  const toast = useToast();
  const router = useRouter();
  const Logout = async () => {
    try {
    toast.info("Logging out", {id: "logout"})
    await store.logout();
    toast.success("Logged out successfully", {id: "logout"})
    store.loggedIn = false;
    store.user = "";
    router.replace('/login');

    } catch (err: any) {
      toast.error(`${err}`, {id: "logout"})
      console.error(err)
    }
  }
  const toggleCaret = () => caret.value = !caret.value;
  const toggleLogout = () => showLogout.value = !showLogout.value;
</script>