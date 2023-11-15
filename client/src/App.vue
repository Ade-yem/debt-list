<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
import Header from './components/Header.vue';
import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import Signup from './pages/Signup.vue';
import DebtBoard from './pages/Board.vue';


</script>

<template>
  <div>
	<h1>Hi</h1>
		<Header/>
		<RouterLink to="/">Home</RouterLink>
		<RouterLink to="/login">Login</RouterLink>
		<RouterLink to="/signup">Signup</RouterLink>
		<RouterLink to="/debt-list">DebtBoard</RouterLink>
	</div>
	<RouterView />
</template>
<style>
	
</style>
