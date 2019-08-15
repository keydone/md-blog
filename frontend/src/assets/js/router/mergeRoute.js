/**
 * 合并用户权限
 * 先挂载 vue 实例 -> 获取权限信息 -> 对store 进行 commit -> 添加动态路由
 * 1, 请求后台接口获取用户可访问权限
 * 2, 合并到本地 routes
 */
import store from '@js/store/store';
import ls from '@js/storage/localstorage';
import { lsLoginKeys } from '@js/const/consts';
import { UPDATE_MENUS } from '@js/store/mutationTypes';
import dynamicRoutes from './dynamicRoutes';

const hasPermission = (url, path) => {
    const reg = new RegExp(url);

    return reg.test(path);
};

// 恢复默认 权限开关
const resetPermission = (route) => {
    route.hasPermissioned = false;
    if (route.children) {
        route.children.forEach(sub => {
            resetPermission(sub);
        });
    }
};

// 递归路由
const recursionRoutes = (route) => {
    // 设置 routes meta
    if (!route.meta) {
        route.meta = {};
    }
    // 有权限
    route.meta.permission = true;
    // 递归匹配次级菜单
    if (route.children) {
        route.children.forEach(sub => {
            recursionRoutes(sub);
        });
    }
};

// 处理路由权限
const reduceRoutes = (menuList, routes) => {
    // 存储有权限的路由
    const authorizedRoutes = [];

    routes.forEach(route => {
        resetPermission(route);
    });

    menuList.forEach(menu => {
        routes.forEach(route => {
            // 匹配路由 path
            if (!route.hasPermissioned && (hasPermission(menu.url, route.path) || route.meta.permission)) {
                recursionRoutes(route);
                authorizedRoutes.push(route);
                route.hasPermissioned = true;
            }
        });
    });

    return authorizedRoutes;
};

// 更新默认路由
const updateRoute = (routes) => {
    routes.find(item => {
        if (item.path === '*') {
            item.redirect = {
                path: '/notfound',
            };
        }
    });
};

// 合并动态路由
const mergeRoute = (router, baseRoutes) => {
    const menuList = ls.get(lsLoginKeys.menuList);

    if (menuList) {
        // 处理路由权限
        const resultArray = reduceRoutes(menuList, dynamicRoutes);

        // 将侧边栏菜单存入 store (侧边栏菜单支持无限级嵌套)
        store.commit(UPDATE_MENUS, {
            menuList:      resultArray,
            btnPermission: resultArray,
        });

        // 无刷新时合并路由
        if (window.$app) {
            let addRoutesLock = true;
            const { $router, $router: { options: { routes } } } = window.$app;

            routes.find(route => {
                // 已经添加过
                if (route.path === '/') {
                    addRoutesLock = false;
                }
            });

            // 防止重复添加
            if (addRoutesLock) {
                updateRoute(routes);
                $router.$addRoutes([...routes, ...resultArray]);
            }
        } else {
            updateRoute(baseRoutes);
            router.$addRoutes([...baseRoutes, ...resultArray]);
        }
    }
};

export default mergeRoute;
