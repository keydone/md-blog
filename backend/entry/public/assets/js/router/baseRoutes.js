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

const { pathname } = window.location;

// 主框架路由
const baseRoutes = [
    {
        path: '/login',
        name: 'login',
        meta: {
            title:          '登录xxx',
            requiresAuth:   false,
            requiresLogout: true,
            roles:          '*',
        },
        component: () => import('@bviews/sign/login.vue'),
    }, {
        path: '/register',
        name: 'register',
        meta: {
            title:          '注册xxx',
            requiresAuth:   false,
            requiresLogout: true,
            roles:          '*',
        },
        component: () => import('@bviews/sign/register.vue'),
    }, {
        path: '/resetpassword',
        name: 'resetpassword',
        meta: {
            requiresAuth:   false,
            requiresLogout: true,
            roles:          '*',
        },
        component: () => import('@bviews/sign/resetAuth.vue'),
    }, {
        path: '/notfound',
        name: '404',
        meta: {
            title:        '找不到了',
            requiresAuth: false,
            roles:        '*',
        },
        component: () => import('@bviews/404.vue'),
    }, {
        path: '/forbidden',
        name: 'forbidden',
        meta: {
            title:        '没有访问权限',
            requiresAuth: false,
            roles:        '*',
        },
        component: () => import('@bviews/403.vue'),
    }, {
        path:     '*',
        redirect: {
            path:  '/login',
            query: {
                redirect: pathname,
            },
        },
    },
];

export default baseRoutes;
