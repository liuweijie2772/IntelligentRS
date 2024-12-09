import { createRouter, createWebHashHistory } from "vue-router";
import HomePage_intelligent from "@/Pages/HomePage_intelligent.vue";
const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            redirect:'/home'
        },
        {
            name:'home',
            path:'/home',
            component:HomePage_intelligent
        },
    ]
})

export default router
