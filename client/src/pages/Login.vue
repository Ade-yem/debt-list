<template>
  <div class="text-center mx-auto mt-5 w-full h-full">
    <h2 class="text-xl my-5">Welcome Back, please login to continue</h2>
    <form @submit.prevent="Submit">
      <div class="relative mb-6">
        <input type="text" v-model="username" id="name" name="name" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-green-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label for="name" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Userame</label>
      </div>
      <div class="mb-6 relative">
        <input type="password" name="password" v-model="password" id="password" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required/>
        <label for="password" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
      </div>
      <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
    <!-- forgot password -->
    <p class="text-xs mt-2">
      <router-link to="/forgot-password">Forgot your password?</router-link>
    </p>
    <p class="text-xs mt-2">
      Don't have an account? <router-link to="/signup">Create an account</router-link> 
    </p>
    
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { store } from "../utils/store.ts";
  
  import { useRouter } from "vue-router";
  import { useToast } from "vue-toastification";
  const username = ref("");
  const password = ref("");
  const router = useRouter();
  const toast = useToast();
  const Submit = async () => {
    try {
      toast.info("Logging you in...", {id: "login"})
      const data = await store.login(username.value, password.value)
      toast.success(`${data.message}`, {id: "login"})
      store.loggedIn = true;
      store.user = data.username;
      router.push("/")
      
      } catch (err) {
        toast.error(`${err}`, {id: "login"})
        console.error(err)
        }
  }
</script>
