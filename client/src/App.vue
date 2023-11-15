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
		<RouterView><Home/></RouterView>
		<RouterView><Login/></RouterView>
		<RouterView><Signup/></RouterView>
		<RouterView><DebtBoard/></RouterView>
	</div>
</template>
<style>
	
</style>
