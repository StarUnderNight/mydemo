import type { App, Directive } from 'vue'

// 枚举配置指令名
enum Config {
  directiveName = 'autoscroll',
}

class AutoScroll {
  element: HTMLElement

  timer: null | number

  scrolling: boolean

  step: number

  constructor(element: HTMLElement, step: number) {
    this.element = element
    this.step = step
    this.timer = null
    this.scrolling = true
  }

  // 元素无限滚动
  startScroll() {
    const { element, step } = this  // 解构，类似于将对象的属性值赋值
    this.timer = setInterval(() => {
      // 如果到达了最下方，则跳转到最上方
      if (element.scrollHeight - element.scrollTop - element.clientHeight < 1) {
        element.scrollTop = 0
      } else if (this.scrolling) element.scrollTop += 1
    }, step)
  }

  openScroll() {
    this.scrolling = true
  }

  closeScroll() {
    this.scrolling = false
  }

  clearScroll() {
    this.timer && clearInterval(this.timer)
  }
}
// 设置自定义指令
const directive: Directive = {
  mounted(el, binding) {
    const { modifiers } = binding
    const step = 1000 / binding.value
    let element
    if (modifiers.parent) {
      element = el.parentElement
    }
    element = el
    const autoScroll = new AutoScroll(element, step)
    autoScroll.startScroll()
    element.mouseenter = autoScroll.closeScroll.bind(autoScroll)
    element.mouseleave = autoScroll.openScroll.bind(autoScroll)
    element.clearScroll = autoScroll.clearScroll.bind(autoScroll)
    element.addEventListener('mouseenter', element.mouseenter)
    element.addEventListener('mouseleave', element.mouseleave)
  },
  //   updated(el, binding) {},
  unmounted(el) {
    el.removeEventListener('mouseenter', el.mouseenter)
    el.removeEventListener('mouseleave', el.mouseleave)
    el.clearScroll()
  },
}

export const setupAutoscrollDirective = (app: App) => {
  app.directive(Config.directiveName, directive)
}
