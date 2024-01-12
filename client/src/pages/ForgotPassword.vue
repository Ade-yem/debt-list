// forgot password page

<template>
    <div class="text-center mx-auto mt-5 w-full h-full min-w-[300px]">
        <h2 class="text-xl my-5">Forgot Password</h2>
        <form @submit.prevent="Submit">
        <div class="relative mb-6">
            <input type="text" v-model="username" id="username" name="username" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label for="username" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Username</label>
        </div>
        <div class="relative mb-6">
            <input type="password" v-model="password" id="password" name="password" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label for="password" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">New Password</label>
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>

    </div>
</template>

<script lang="ts" setup>
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
            toast.info("Changing your password", {id: "forgot"})
            await store.forgot(username.value, password.value);
            toast.success("Password changed successfully, you can sign in with your new password", {id: "forgot"})
            router.push('/login');
        } catch (err: any) {
            toast.error(`${err}`, {id: "forgot"})
            console.error(err)
        }
    }
</script>