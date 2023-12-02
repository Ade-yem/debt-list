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
import Toast, { POSITION, PluginOptions } from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

library.add(faCaretDown, faBars, faTimes, faPlus, faTrash)

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = "application/json";

const options: PluginOptions = {
  timeout: 10000,
  position: POSITION.TOP_RIGHT,
  transition: "Vue-Toastification__slideBlurred",
  maxToasts: 20,
  newestOnTop: true,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  containerClassName: "my-container-class",
  rtl: false
}

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('VueTyper', VueTyper);
app.use(Toast, options);
app.use(router);
app.mount('#app');
