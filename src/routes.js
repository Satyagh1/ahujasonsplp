import Vue from "vue";
import VueRouter from "vue-router";

import ProductPage from "./components/ProductPage.vue"

const NotFound = {<template>Page Not fount</template>}

Vue.use(VueRouter)

const routes = [
    {
        name:"Home",
        path :"/",
        component: ProductPage
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router 
   
