import {createRouter, createWebHistory, Router} from "vue-router";
import type {App} from "vue"
import {unauthorized} from "@/net";

const routes = [
  {
    path: "/welcome",
    name: 'welcome',
    component: () => import('@/views/WelcomeView.vue'),
    children: [
      {
        path: '',
        name: 'user-login',
        component: () => import('@/views/user/LoginPage.vue')
      }, {
        path: "/register",
        name: "register",
        component: () => import("@/views/user/RegisterPage.vue")
      }
    ]
  },
  {
    path: "/big-display",
    name: "bigDisplay",
    component: () => import("@/views/data/big-display/index.vue")
  },
  {
    path: "/",
    name: "",
    component: () => import("@/components/layout/AppLayout.vue"),
    meta: {requiresAuth: true, title: "首页"},
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/Home.vue"),
        meta: {title: "默认页"}
      },
      {
        path: "/robot-list",
        name: "robotList",
        meta: {title: "Robot列表"},
        component: () => import("@/views/data/robot/index.vue")
      },
      {
        path: "/data-stream-display",
        name: "dataStreamDisplay",
        meta: {title: "数据流量"},
        component: () => import("@/views/data/data-stream/index.vue")
      },
      {
        path: "/exception-display",
        name: "exceptionDisplay,",
        meta: {title: "异常历史"},
        component: () => import("@/views/monitor/exception-display/index.vue")
      },
      {
        path: "/monitor-flow",
        name: "monitorFlow",
        meta: {title: "流量监测"},
        component: () => import("@/views/monitor/flow/index.vue")
      },
      {
        path: "/:xxx(.*)*",
        name: "error",
        component: () => import("@/views/ErrorPage.vue"),
        meta: {title: "错误页面"}
      }
    ]
  },
]


const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

/**
 * 路由守卫，防止在没有登录情况下访问不应该访问的地址
 */
// router.beforeEach((to, from, next) => {
//     const isUnauthorized = unauthorized()
//     if (to.name.toString().startsWith("user-") && !isUnauthorized) {
//         next("/home")
//     } else if (to.fullPath.startsWith("/home") && isUnauthorized){
//         next("/")
//     } else {
//         next() // 正常情况
//     }
//
// })
export const setupRouter = (app: App<Element>) => {
  app.use(router)
}

export default router