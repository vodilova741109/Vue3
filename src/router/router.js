import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home'
import Posts from '@/pages/Posts'
import PostsPageWithStore from '@/pages/PostsPageWithStore'
import PostsPageCompositionApi from '@/pages/PostsPageCompositionApi'
import About from '@/pages/About'
import Post from '@/pages/Post'


const routes = [{
        path: '/',
        component: Home
    },
    {

        path: '/posts',
        component: Posts
    },
    {

        path: '/store',
        component: PostsPageWithStore
    },
    {

        path: '/composition',
        component: PostsPageCompositionApi
    },
    {
        path: '/posts/:id',
        component: Post
    },
    {
        path: '/about',
        component: About
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;