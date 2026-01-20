import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

import { Quasar } from 'quasar'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(Quasar, {
  config: {}
})

app.mount('#app')
