/*!
 * @author claude
 * date 07/05/2019
 * 公共 route 配置文件
 */

/**
 * @param {meta: requiresAuth} Boolean false 无需登录权限即可进入
 * @param {meta: requiresLogout} Boolean true 必须未登录才能访问
 * @param {meta: permission} Boolean 表明当前用户是否有权限访问
 * @param {meta: icon} String 当前菜单的图标
 * @param {meta: title} String 当前菜单的标题
 */
import asyncComponent from '@js/common/asyncComponent/index';

// 主框架路由
const baseRoutes = [
    {
        path: '/',
        meta: {
            // hidden: true, // 默认菜单不显示
        },
        component: () => import('@comp/LayoutBase.vue'),
        children:  [
            {
                path: '/',
                name: 'index',
                meta: {
                    title:     '首页',
                    keepAlive: true,
                },
                component: () => asyncComponent(import('@views/index/index.vue')),
            },
            {
                path: '/list',
                name: 'list',
                meta: {
                    title:         '列表',
                    showSideBlock: false,
                },
                component: () => asyncComponent(import('@views/list/list.vue')),
            },
            {
                path: '/details',
                name: 'details',
                meta: {
                    title: '详情',
                },
                component: () => asyncComponent(import('@views/details/details.vue')),
            },
            {
                path: '/post',
                name: 'post',
                meta: {
                    title:         '发布新资源',
                    showSideBlock: false,
                },
                component: () => asyncComponent(import('@views/post.vue')),
            },
            {
                path: '/notes',
                name: 'notes',
                meta: {
                    title:         '笔记列表',
                    showSideBlock: false,
                },
                component: () => asyncComponent(import('@views/notes/notelist.vue')),
            },
            {
                path: '/note-post',
                name: 'note-post',
                meta: {
                    title:         '发布新笔记',
                    showSideBlock: false,
                },
                component: () => asyncComponent(import('@views/notes/note.vue')),
            },
        ],
    }, {
        path: '/login',
        name: 'login',
        meta: {
            requiresLogout: true,
        },
        component: () => asyncComponent(import('@views/sign/login.vue')),
    }, {
        path: '/register',
        name: 'register',
        meta: {
            requiresLogout: true,
        },
        component: () => asyncComponent(import('@views/sign/register.vue')),
    }, {
        path:      '/resetpassword',
        name:      'resetpassword',
        component: () => asyncComponent(import('@views/index/index.vue')),
    }, {
        path: '*',
        name: 'notfound',
        meta: {
            roles: '*',
        },
        component: () => import('@views/404.vue'),
    },
];

export default baseRoutes;
