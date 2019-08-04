/*!
 * @author claude
 * date 07/05/2019
 * 全局路由入口
 */

import Vue from 'vue';
import Router from 'vue-router';
import routes from './baseRoutes';
import guards from './guards';

Vue.use(Router);

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
