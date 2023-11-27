import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
import router from './utils/router.ts';
import axios from "axios";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueTyper from 'vue3-typer'
import "vue3-typer/dist/vue-typer.css"
import { faBars, faCaretDown, faTimes, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'


library.add(faCaretDown, faBars, faTimes, faPlus, faTrash)

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = "application/json"

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('VueTyper', VueTyper);
app.use(router);
app.mount('#app');
