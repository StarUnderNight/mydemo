import {createRouter, createWebHistory, Router} from "vue-router";
import {unauthorized} from "@/net";

const routes = [
    {
        path: "/",
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
        path: "/home",
        name: "home",
        component: () => import("@/views/Home.vue")
    }
]


const router :Router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

/**
 * 路由守卫，防止在没有登录情况下访问不应该访问的地址
 */
router.beforeEach((to, from, next) => {
    const isUnauthorized = unauthorized()
    if (to.name.toString().startsWith("welcome-") && !isUnauthorized) {
        next("/home")
    } else if (to.fullPath.startsWith("/home") && isUnauthorized){
        next("/")
    } else {
        next() // 正常情况
    }

})

export  default router