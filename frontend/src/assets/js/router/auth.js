/*!
 * @author claude
 * date 07/05/2019
 * 用户认证相关
 */

import { UPDATE_USER } from '@js/const/mutationTypes';
import {
    lsKeyLogin,
    lsKeyMenuList,
    lsKeyUserinf,
} from '@js/const/localstorage';
import ls from '@js/storage/localstorage';
import { mergeRoute } from './resolve';
import store from '@js/store/store';

/**
 * 检测登录状态
 */
export const baseIsLogin = () => {
    // 以 ls 为准
    const isLogin = ls.get(lsKeyLogin);

    if (isLogin && !store.getters.isLogin) {
        // 同步更新 store
        syncStoreUserinfo({ isLogin });
    }

    return isLogin;
};

/**
 * 登录
 */
export const baseLogin = async (isLogin, menuList) => {

    syncStoreUserinfo({ isLogin, menuList });

    if (isLogin) {
        // 登录成功, 存储用户信息
        ls.set(lsKeyLogin, isLogin);
        ls.set(lsKeyMenuList, menuList);
        // 合并路由权限等
        mergeRoute();

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
 * 同步 store 中的用户状态
 */
export const syncStoreUserinfo = ({ isLogin }) => {
    // 同步更新 store
    store.commit(UPDATE_USER, { isLogin });
};

/**
 * 同步多标签用户状态
 */
export const syncTabsUserState = async () => {
    // 未登录
    window.addEventListener('storage', (e) => {

        if (e.key === ls.get(lsKeyLogin)) {

            if (ls.get(e.newValue)) {
                // 已登录
                baseLogin();

            } else {
                // 未登录或已过期
                baseLoginOut();
            }
        }
    });
};

/**
 * 强制用户下线, 清除登录信息并跳转到登录页面
 */
export const baseLoginOut = () => {

    const { $router } = window.$app;

    // 重置 store 和 localstorage
    syncStoreUserinfo({ isLogin: null });
    ls.remove(lsKeyLogin, lsKeyUserinf);

    $router.replace({
        name: 'login',
        query: {
            redirect: $router.currentRoute.fullPath,
        },
    });
};

/**
 * 读取用户信息
 */
export const getUserInfo = () => {
    // 读取本地存储
    const menuList = ls.get(lsKeyMenuList);

    return menuList;
};
