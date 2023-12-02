import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Signup from '../pages/Signup.vue';
import DebtBoard from '../pages/Board.vue';
import PriceList from "../pages/PriceList.vue"
import ForgotPassword from "../pages/ForgotPassword.vue"
import { createRouter, createWebHistory } from 'vue-router';
import { store } from './store';
import { checkUserAuth } from './auth-api';

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/signup', component: Signup, name: 'signup' },
  { path: '/forgot-password', component: ForgotPassword, name: 'forgot-password' },
  { path: '/debt-list', component: DebtBoard, name: 'debt-list' },
  { path: '/price-list', component: PriceList, name: 'price-list' },

]

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

router.beforeEach(async (to, _, next) => {
  const isAuthenticated = store.loggedIn;

  if (to.name != 'login' && to.name != 'signup' && to.name != 'forgot-password' && !isAuthenticated) {
    try {
      const res = await checkUserAuth(); // Assuming checkUserAuth returns an object with a "username" property
      store.loggedIn = true;
      console.log(res)
      store.user = res;
      next();
    } catch (error) {
      console.error(error);
      next('/login');
    }
  } else {
    // Continue to the next route if it doesn't require authentication
    next();
  }
});

export default router;
