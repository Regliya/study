// import './assets/main.css'
import '@/styles/common.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { lazyPlugin } from '@/directives'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(createPinia())
app.use(pinia)
app.use(router)

// 注册持久化插件

pinia.use(piniaPluginPersistedstate)
app.use(lazyPlugin)
app.mount('#app')
