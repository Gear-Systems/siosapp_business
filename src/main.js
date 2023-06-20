import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { store } from './store/index.js'
import './tailwind.css'
import './firebase';
import App from './App.vue'
import router from './router'
import Notifications from 'notiwind'

const app = createApp(App)


app.use(router)
app.use(createPinia())
app.use(store)
app.use(Notifications)
app.mount('#app')
