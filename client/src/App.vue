<script setup lang="ts">

import Header from './components/Header.vue';
import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import Signup from './pages/Signup.vue';
import DebtBoard from './pages/Board.vue';


</script>

<template>
  <div>
		<Header/>
		<router-view>Home</router-view>
		<router-view>Login</router-view>
		<router-view>Signup</router-view>
		<router-view>DebtBoard</router-view>
	</div>
</template>
<style>
	
</style>
