import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/home.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: 'Vine小说-最好看的免费小说网',
        },
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
        meta: {
            title: 'Vine小说-最好看的免费小说网',
        },
    }, {
        path: '/about',
        name: 'about',
        component: () => import('./../views/about.vue'),
        meta: {
            title: '关于本站-Vine小说 | 免费小说网',
        },
    }, {
        path: '/option',
        name: 'option',
        component: () => import('./../views/option.vue'),
        meta: {
            title: '意见反馈-Vine小说 | 免费小说网',
        },
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
router.beforeEach((to, from, next) => {
    /*路由发生改变修改页面的title */
    if (to.meta.title) {
      document.title = to.meta.title;
    }
    next();
});

export default router;
