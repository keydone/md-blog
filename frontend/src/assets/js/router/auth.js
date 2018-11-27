/**
 * 用户认证相关
 */
import { UPDATE_USER } from '@js/const/mutationTypes';
import ls from '@js/storage/localstorage';
import store from '@js/store/store';

/**
 * 检测登录状态
 */
export const baseIsLogin = () => {
    // 以 ls 为准
    let isLogin = ls.get('login');

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
        ls.set('login', isLogin);
    }
};

/**
 * 同步用户状态
 */
export const syncUserState = async () => {
    // 未登录
    window.addEventListener('storage', (e) => {

        if (e.key === 'isLogin') {

            if (e.newValue === 'true') {
                // 已登录
                baseLogin(true);
            } else {
                // 未登录或已过期
                resetToLogin();
            }
        }
    });
};

/**
 * 强制用户下线, 清除登录信息并跳转到登录页面
 */
export const resetToLogin = (router) => {

    const $router = router || window.$app.$router;

    // 重置 store 和 localstorage
    store.commit(UPDATE_USER, { isLogin: null });
    ls.remove('login');

    $router.replace({
        name: 'login',
        query: {
            redirect: router.currentRoute.fullPath,
        },
    });
};
