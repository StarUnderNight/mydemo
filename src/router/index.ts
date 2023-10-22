import {createRouter, createWebHistory, Router} from "vue-router";
import {unauthorized} from "@/net";

const routes = [
  {
    path: "/welcome",
    name: 'welcome',
    component: () => import('@/views/WelcomeView.vue'),
    children: [
      {
        path: '',
        name: 'welcome-login',
        component: () => import('@/views/welcome/LoginPage.vue')
      }, {
        path: "/register",
        name: "register",
        component: () => import("@/views/welcome/RegisterPage.vue")
      }
    ]
  }, {
    path: "/",
    name: "home",
    component: () => import("@/components/layout/AppLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/Home.vue")
      },
      {
        path: "/dev-list",
        name: "devList",
        component: () => import("@/views/device/DeviceIndex.vue")
      },
      {
        path: "/data-stream-display",
        name: "dataStreamDisplay,",
        component: () => import("@/views/data/DataStreamDisplay.vue")
      },
      {
        path: "/exception-display",
        name: "exceptionDisplay,",
        component: () => import("@/views/monitor/ExceptionDisplay.vue")
      },
      {
        path: "/:xxx(.*)*",
        name: "error",
        component: () => import("@/views/ErrorPage.vue")
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
//     if (to.name.toString().startsWith("welcome-") && !isUnauthorized) {
//         next("/home")
//     } else if (to.fullPath.startsWith("/home") && isUnauthorized){
//         next("/")
//     } else {
//         next() // 正常情况
//     }
//
// })

export default router