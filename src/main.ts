import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import axios from "axios";

import 'element-plus/theme-chalk/dark/css-vars.css'
import "@/styles/index.scss"

axios.defaults.baseURL = "http://localhost:8080"

const app = createApp(App)

app.use(router)

app.mount('#app')
