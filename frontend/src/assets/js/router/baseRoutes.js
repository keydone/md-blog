/*
*  公共 route 配置文件
*/

import others from './others';

/**
 * @param {meta: ignoreLogin} Boolean 为 true 无需登录即可进入
 */

// 主框架路由
const mainRoutes = [
    {
        path: '/',
        name: 'index',
        meta: {
            requiresAuth: false,
        },
        component: () => import('@views/index/index.vue'),
    }, {
        path: '/login',
        name: 'login',
        meta: {
            requiresAuth: true,
            showSideBlock: false,
            hideBaseHeader: true,
            hideBaseFooter: true,
        },
        component: () => import('@views/login/login.vue'),
    }, {
        path: '/register',
        name: 'register',
        meta: {
            requiresAuth: true,
            showSideBlock: false,
            hideBaseHeader: true,
            hideBaseFooter: true,
        },
        component: () => import('@views/register/register.vue'),
    }, {
        path: '*',
        name: 'notfound',
        meta: {
            requiresAuth: true,
        },
        component: () => import('@views/404.vue'),
    },
];

const routes = [
    ...mainRoutes,
    // 其他系统路由
    ...others,
];

export default routes;
