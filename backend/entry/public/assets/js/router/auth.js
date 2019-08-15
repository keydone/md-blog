/*!
 * @author claude
 * date 07/05/2019
 * 用户认证相关
 */
import {
    UPDATE_USER,
    UPDATE_MENUS,
} from '@bjs/store/mutationTypes';
import store from '@bjs/store/store';
import ls from '@bjs/storage/localstorage';
import { lsLoginKeys } from '@bjs/const/consts';
import { resetRouter } from '@bjs/router/index';
import mergeDynamicRoutes from './mergeRoute';

/**
 * 同步 store 中的用户状态
 */
export const syncStoreUserInfo = (type = 'sync', data = {}) => {
    // 同步更新 store
    const policy = {
        sync() {
            const userInfo = {};

            for (const key in lsLoginKeys) {
                const value = lsLoginKeys[key];

                userInfo[value] = ls.get(value);
            }
            store.commit(UPDATE_USER, userInfo);
        },
        set() {
            for (const key in lsLoginKeys) {
                const value = lsLoginKeys[key];

                ls.set(value, data[value]);
            }
            store.commit(UPDATE_USER, data);
        },
        reset() {
            ls.remove(lsLoginKeys);
            store.commit(UPDATE_USER, {});
            setTimeout(() => {
                store.commit(UPDATE_MENUS, {});
            }, 200);
            // 重置路由
            resetRouter();
        },
    };

    policy[type]();
};

/**
 * 检测登录状态
 * 先获取 store
 * 获取不到再去读取 ls
 * 并更新 store
 */
export const baseIsLogin = () => {
    let { isLogin } = store.getters;

    if (!isLogin) {
        isLogin = Boolean(ls.get(lsLoginKeys.token));
        if (isLogin) {
            // 同步存储信息
            syncStoreUserInfo('sync');
        } else {
            syncStoreUserInfo('reset');
        }
    }

    return isLogin;
};

/**
 * 登录
 * baseLogin({token: '1', menuList: [{path: '/*'}]}) 可直接登录
 */
export const baseLogin = async (userInfo = {}) => {

    if (userInfo.token) {
        // 登录成功, 存储用户信息
        syncStoreUserInfo('set', userInfo);

        // 添加动态路由
        mergeDynamicRoutes();

        const { $route, $router } = window.$app;

        if ($route.meta.requiresLogout) {
            const { href } = window.location;
            const url = window.decodeURIComponent(href);
            const target = url.split('?redirect=')[1];

            $router.replace(target || '/');
        } else {
            window.location.reload();
        }
    }
};

/**
 * 强制用户下线, 清除登录信息并跳转到登录页面
 */
export const baseLogout = () => {

    const { $router } = window.$app;
    const { location: { href, pathname } } = window;

    // 重置 store 和 localstorage
    syncStoreUserInfo('reset');

    let query = {};

    if ($router.currentRoute.path !== '/' && $router.currentRoute.path !== pathname && !href.includes('?redirect=')) {
        query = {
            redirect: $router.currentRoute.fullPath,
        };
    }

    $router.replace({
        name: 'login',
        query,
    });
};

/**
 * 同步多标签用户状态
 */
export const syncTabsUserState = async () => {
    // 未登录
    window.addEventListener('storage', (e) => {

        if (e.key === ls.get(lsLoginKeys.token)) {

            if (e.newValue) {
                // 已登录
                baseLogin();
            } else {
                // 未登录或已过期
                baseLogout();
            }
        }
    });
};
