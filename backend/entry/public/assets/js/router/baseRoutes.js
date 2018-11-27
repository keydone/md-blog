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
        component: () => import('@bviews/index.vue'),
    }, {
        path: '/login',
        name: 'login',
        meta: {
            ignoreLogin: true,
        },
        component: () => import('@bviews/login/login.vue'),
    }, {
        path: '*',
        name: 'notfound',
        meta: {
            ignoreLogin: true,
        },
        component: () => import('@bviews/404.vue'),
    },
];

const routes = [
    ...mainRoutes,
    // 其他系统路由
    ...others,
];

export default routes;
