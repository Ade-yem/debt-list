import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import router from './utils/router.ts';
import axios from "axios";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faUserSecret} from '@fortawesome/free-solid-svg-icons'
import { faBars} from '@fortawesome/free-solid-svg-icons'


library.add(faUserSecret, faBars)

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
