import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import router from './utils/router.ts';
import axios from "axios";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueTyper from 'vue-typer'
import "vue3-typer/dist/vue-typer.css"
import { faBars, faCaretDown, faTimes} from '@fortawesome/free-solid-svg-icons'


library.add(faCaretDown, faBars, faTimes)

axios.create({
  baseURL: 'http://localhost:8000/api/v1',
	timeout: 5000,
	withCredentials: true,
	headers: {
	  'Content-Type': 'application/json'
	}
});

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router);
app.use(VueTyper);
app.mount('#app');
