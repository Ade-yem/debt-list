<template>
<header :class="['absolute top-0 w-[100%] align-middle z-10 left-0 border-b border-gray-400 h-fit']">
<div class="flex justify-between  ">
  <div class="h-10 w-25 m-2" id="logo">
    <img src="../assets/toluwa1.jpg" class="h-full w-full" alt="tolu">
	</div>
	<div class="hidden  sm:flex justify-center space-x-4 mt-4">
    <router-link class="p-4 " to="/" >Home</router-link>
    <router-link v-if="!store.loggedIn" class="p-4 " to="/login">Login</router-link>
    <router-link v-if="!store.loggedIn" class="p-4 " to="/signup">Signup</router-link>
    <router-link class="p-4 " to="/debt-list">Debtors</router-link>
    <router-link class="p-4 " to="/price-list">Price List</router-link>
  </div>
  <div class=" text-lg font-semibold text-blue-500 font-serif py-4 px-6 mt-3" v-if="store.loggedIn" @click="toggleLogout">{{ store.user || "Adeyemi" }}</div>
  <!-- // a dropdown when the username is clicked that shows logout button -->
  <div v-if="showLogout" class="absolute right-0 top-0 mt-16 mr-2 bg-white rounded-lg shadow-lg">
    <button class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="Logout">Logout</button>
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