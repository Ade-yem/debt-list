<template>
<header>
<div class="flex absolute top-0 w-full m-0">
  <div class="" id="logo">
	</div>
	<div class="hidden  sm:flex justify-center space-x-4">
    <router-link to="/">Home</router-link>
    <router-link to="/login">Login</router-link>
    <router-link to="/signup">Signup</router-link>
    <router-link to="/debt-list">DebtBoard</router-link>
  </div>
  <div class=" m-auto">
    <font-awesome-icon :icon="['fas', 'user-secret']" ></font-awesome-icon>
  </div>
</div>
</header>
</template>
<script setup lang="ts"></script>