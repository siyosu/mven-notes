import './style.css'
import '@/assets/nprogress.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHome,
  faNoteSticky,
  faRightFromBracket,
  faSun,
  faMoon
} from '@fortawesome/free-solid-svg-icons'
library.add(faHome, faNoteSticky, faRightFromBracket, faSun, faMoon)

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('FontAwesomeIcon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
