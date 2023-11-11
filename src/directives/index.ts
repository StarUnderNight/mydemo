import type { App } from 'vue'

import { setupAutoscrollDirective } from './autoscroll'  // 引入模块下的autoscroll方法

export const setupDirectives = (app: App<Element>) => {
  setupAutoscrollDirective(app)
}
