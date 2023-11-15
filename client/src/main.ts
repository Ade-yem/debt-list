import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import router from './utils/router.ts';
import axios from "axios";

axios.create({
  baseURL: 'https://api.example.com',
	timeout: 5000,
	withCredentials: false,
	headers: {
	  'Content-Type': 'application/json'
	}
});

const app = createApp(App)
app.use(router);
app.mount('#app');
