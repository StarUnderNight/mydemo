import type {App} from "vue"
import {createPinia} from "pinia";

export const pinia = createPinia()  // 导出pinia对象
export const setupPinia = (app: App<Element>) => {
  app.use(pinia)
}

export default pinia


