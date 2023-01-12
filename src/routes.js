import Vue from "vue";
import VueRouter from "vue-router";

import ProductPage from "./components/ProductPage.vue"

Vue.use(VueRouter)

const routes = [
    {
        name:"Home",
        path :"/",
        component: ProductPage
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router 
   