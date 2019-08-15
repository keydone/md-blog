/**
 * 合并用户权限
 * 先挂载 vue 实例 -> 获取权限信息 -> 对store 进行 commit -> 添加动态路由
 * 1, 请求后台接口获取用户可访问权限
 * 2, 合并到本地 routes
 */
import store from '@js/store/store';
import { UPDATE_MENUS } from '@js/store/mutationTypes';
import {
    getUserInfo,
    baseIsLogin,
} from './auth';
import dynamicRoutes from './dynamicRoutes';

const recursionPermission = (route) => {
    // 设置 routes meta
    if (!route.meta) {
        route.meta = {};
    }
    // 有权限
    route.meta.permission = true;
    // 递归匹配次级菜单
    if (route.children) {
        for (const index in route.children) {
            const sub = route.children[index];

            return recursionPermission(sub);
        }
    }
    return route;
};

const resolvePermission = (menuList, routes) => {

    for (const index in menuList) {
        const menu = menuList[index];

        for (const $index in routes) {
            const route = routes[$index];

            // 匹配路由 path
            const reg = new RegExp(menu.url.endsWith('/**') ? menu.url.substr(0, menu.url.length - 1) : menu.url);

            if (reg.test(route.path)) {
                recursionPermission(route);
            }
        }
    }

    return routes;
};

const mergeRoute = (baseRoutes) => {
    const isLogin = baseIsLogin();

    if (isLogin) {
        const menuList = getUserInfo();

        if (menuList) {
            const result = resolvePermission(menuList, dynamicRoutes);
            const routeBase = {
                path: '/',
                component: () => import('@comp/LayoutBase.vue'),
                children: [
                    {
                        path: '/dashboard',
                        name: 'dashboard',
                        meta: {
                            hidden: true,
                            requiresAuth: true,
                            permission: true,
                        },
                        component: () => import('@views/index/index.vue'),
                    }, {
                        path: '/',
                        name: 'index',
                        meta: {
                            hidden: true,
                            permission: true,
                        },
                        redirect: {
                            name: 'dashboard',
                        },
                    },
                    ...result,
                ],
            };

            // 存入 store
            store.commit(UPDATE_MENUS, { menuList: routeBase.children });

            const { $app } = window;

            // 无刷新时合并路由
            if ($app) {
                let addRoutesLock = true;
                const { $router } = $app;

                for (const index in $router.options.routes) {
                    const item = $router.options.routes[index];

                    if (item.path === '*') {
                        item.redirect = {
                            path: '',
                            name: 'notfound',
                        };
                    } else if (item.path === '/') {
                        addRoutesLock = false;
                    }
                }
                // 防止重复添加
                if (addRoutesLock) {
                    addRoutesLock = false;
                    $router.$addRoutes([routeBase]);
                }
            }
            // 刷新后合并路由
            if (baseRoutes) {
                baseRoutes.forEach(item => {
                    if (item.path === '*') {
                        item.redirect = {
                            path: '',
                            name: 'notfound',
                        };
                    }
                });
                return [routeBase, ...baseRoutes];
            }
        }
    }
};

export default mergeRoute;
