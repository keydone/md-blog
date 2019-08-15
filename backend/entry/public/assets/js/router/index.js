/*!
 * @author claude
 * date 07/05/2019
 * 全局路由入口
 */

import Vue from 'vue';
import Router from 'vue-router';
import mergeRoute from './mergeRoute';
import baseRoutes from './baseRoutes';
import guards from './guards';

Vue.use(Router);

// 合并路由
const routes = mergeRoute(baseRoutes) || baseRoutes;

// 实例化路由
const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
});

// 重置路由表
router.$addRoutes = (params) => {
    router.matcher = new Router({ mode: 'history', routes }).matcher;
    router.addRoutes(params);
};

// 路由守卫
guards(router);

export default router;
