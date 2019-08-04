/*!
 * @author claude
 * date 07/05/2019
 * 用户认证相关
 */

import { UPDATE_USER } from '@js/const/mutationTypes';
import { lsKeyLogin } from '@js/const/localstorage';
import ls from '@js/storage/localstorage';
import store from '@js/store/store';

/**
 * 检测登录状态
 */
export const baseIsLogin = () => {
    // 以 ls 为准
    let isLogin = ls.get(lsKeyLogin);

    isLogin = isLogin == null ? null : (isLogin === 'true');

    baseLogin(isLogin);

    return isLogin;
};

/**
 * 登录
 */
export const baseLogin = async (isLogin) => {
    // 同步更新 store
    store.commit(UPDATE_USER, { isLogin });

    if (isLogin != null) {
        ls.set(lsKeyLogin, isLogin);

        const { href, origin } = window.location;
        const url = window.decodeURIComponent(href);
        const target = url.split('?redirect=')[1];

        if (window.$app && url.startsWith(`${origin}/login`)) {
            if (target) {
                // 返回来源页
                console.log('返回来源页');
                window.location.href = target;
            } else {
                // 自动跳转到首页
                window.location.href = '/';
            }

        }
    }
};

/**
 * 同步用户状态
 */
export const syncUserState = async () => {
    // 未登录
    window.addEventListener('storage', (e) => {

        if (e.key === lsKeyLogin) {

            if (e.newValue === 'true') {
                // 已登录
                baseLogin(true);

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
    store.commit(UPDATE_USER, { isLogin: null });
    ls.remove(lsKeyLogin);

    $router.replace({
        name: 'login',
        query: {
            redirect: $router.currentRoute.fullPath,
        },
    });
};
