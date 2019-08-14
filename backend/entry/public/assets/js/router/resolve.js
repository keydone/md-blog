import { getUserInfo } from './auth';
import dynamicRoutes from './dynamicRoutes';

/**
 * 合并用户权限
 * 先挂载 vue 实例 -> 获取权限信息 -> 对store 进行 commit -> 添加动态路由
 * 1, 请求后台接口获取用户可访问权限
 * 2, 合并到本地 routes
 */
const resolvePath = (menuList, routes) => {

    for (const index in menuList) {
        const menu = menuList[index];

        for (const $index in routes) {
            const route = routes[$index];

            // 匹配路由 path
            const reg = new RegExp(menu.url.endsWith('/**') ? menu.url.substr(0, menu.url.length - 1) : menu.url);

            if (reg.test(route.path)) {
                // 设置 routes meta
                if (!route.meta) {
                    route.meta = {};
                }
                // 有权限
                route.meta.permission = true;
                // 递归匹配次级菜单
                if (route.children) {
                    return resolvePath(menu, route.children);
                }
            }
        }
    }

    return routes;
};

export const mergeRoute = () => {
    const menuList = getUserInfo();

    if (menuList) {
        const result = resolvePath(menuList, dynamicRoutes);
        const routeBase = [{
            path: '/',
            component: () => import('@bcomp/LayoutBase.vue'),
            children: [
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    meta: {
                        requiresAuth: true,
                        permission: true,
                    },
                    component: () => import('@bviews/index.vue'),
                }, {
                    path: '/',
                    name: 'index',
                    meta: {
                        permission: true,
                    },
                    redirect: {
                        name: 'dashboard',
                    },
                },
                ...result,
            ],
        }];

        const { $app } = window;

        if ($app) {
            // 无刷新时合并路由
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
                $router.$addRoutes(routeBase);
            }
        }
        // 存入 store
        // ...
        // 刷新后合并路由
        return routeBase;
    }
};
