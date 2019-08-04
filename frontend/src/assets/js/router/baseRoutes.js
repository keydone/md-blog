/*!
 * @author claude
 * date 07/05/2019
 * 公共 route 配置文件
 */

import others from './others';

/**
 * @param {meta: requiresAuth} Boolean false 无需登录即可进入
 * @param {meta: requiresLogout} Boolean true 登录后将无法访问
 * @param {meta: showSidebar} Boolean true 是否显示侧边栏导航
 */

// 主框架路由
const routes = [
    {
        path: '/',
        meta: {
            // hidden: true, // 默认菜单不显示
        },
        component: () => import('@comp/LayoutBase.vue'),
        children: [
            {
                path: '/',
                name: 'index',
                component: () => import('@views/index/index.vue'),
            },
            // 其他系统路由挂在到主系统下
            ...others,
        ],
    }, {
        path: '/login',
        name: 'login',
        meta: {
            requiresLogout: true,
            showSideBlock: false,
            hideBaseHeader: true,
            hideBaseFooter: true,
        },
        component: () => import('@views/login/login.vue'),
    }, {
        path: '/register',
        name: 'register',
        meta: {
            requiresLogout: true,
            showSideBlock: false,
            hideBaseHeader: true,
            hideBaseFooter: true,
        },
        component: () => import('@views/register/register.vue'),
    }, {
        path: '*',
        name: 'notfound',
        meta: {
            showSidebar: false,
            roles: '*',
        },
        component: () => import('@views/404.vue'),
    },
];

export default routes;
