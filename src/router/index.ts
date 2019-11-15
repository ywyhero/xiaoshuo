import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    }, {
        path: '/chapter',
        name: 'chapter',
        component: () => import('./../views/chapter.vue'),
    }, {
        path: '/detail',
        name: 'detail',
        component: () => import('./../views/detail.vue'),
    }, {
        path: '/more',
        name: 'more',
        component: () => import('./../views/more.vue'),
    }, {
        path: '/about',
        name: 'about',
        component: () => import('./../views/about.vue'),
    }, {
        path: '/option',
        name: 'option',
        component: () => import('./../views/option.vue'),
    }, {
        path: '/search',
        name: 'search',
        component: () => import('./../views/search.vue'),
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
