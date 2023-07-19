import Vue from 'vue'
import VueRouter from 'vue-router'
import Post from '@/views/Post'
import Home from '@/views/Home'



Vue.useAttrs(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',  
        component: Home      
    },
    {
        path: 'post/:id',
        name: 'Post',
        component: Post   
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
export default router