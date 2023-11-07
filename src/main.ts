import { createApp } from 'vue'
import {setupRouter} from './router'
import App from './App.vue'
import axios from "axios";
import {setupPinia} from "@/store";
import {mockDataInit, mockRequest} from "@/mock";
import {setupDirectives} from "@/directives"
import {test} from "@/test"

import 'element-plus/theme-chalk/dark/css-vars.css'
import "@/styles/index.scss"

test()  // 测试某些语法功能
mockRequest()  // 使用mockRequest
mockDataInit()  // 将一些需要mock的数据从本地文件加载到局部变量中

axios.defaults.baseURL = "http://localhost:8080"


const app = createApp(App)
setupDirectives(app)
setupPinia(app)
setupRouter(app)

app.mount('#app')
