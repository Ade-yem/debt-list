import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Signup from '../pages/Signup.vue';
import DebtBoard from '../pages/Board.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/debt-list', component: DebtBoard },

]

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export default router;
