import Vue from 'vue';
import Router from 'vue-router';
import routes from './baseRoutes';
import guards from './guards';

Vue.use(Router);

/**
 * 路由入口
 */
const router = new Router({
    mode: 'history',
    routes,
    /* scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }, */
});

// 路由守卫
guards(router);

export default router;
