/*!
 * @author claude
 * date 07/05/2019
 * 全局路由入口
 */

import Vue from 'vue';
import Router from 'vue-router';
import { baseIsLogin } from './auth';
import { mergeRoute } from './resolve';
import baseRoutes from './baseRoutes';
import guards from './guards';

Vue.use(Router);

// 合并路由
let routes = baseRoutes;
const isLogin = baseIsLogin();
const mergedRoutes = mergeRoute();

if (isLogin && mergedRoutes) {
    baseRoutes.forEach(item => {
        if (item.path === '*') {
            item.redirect = {
                path: '',
                name: 'notfound',
            };
        }
    });
    routes = [...mergedRoutes, ...baseRoutes];
}

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
