/*!
 * @author claude
 * date 07/05/2019
 * 全局路由守卫
 */

/**
 * 实现思路:
 * - 根据 to.meta 判断是否需要登录权限
 *      1, 不需要
 *          - 直接 next
 *          - 登录时访问登录页, 则自动跳转到首页
 *      2, 需要
 *          - 未登录
 *              - 前往登录页并带上当前页地址
 *          - 已登录
 *              - 判断路由是否带有 redirect
 */
import { baseIsLogin } from './auth';

export default (router) => {

    // 导航前置导航
    router.beforeEach((to, from, next) => {
        // 获取登录状态
        const isLogin = baseIsLogin();

        // debugger;
        // 无需登录
        if (to.matched.some(record => record.meta.requiresAuth !== true)) {
            // 登录后访问了不可访问的路由, 比如登录页
            if (isLogin && to.matched.some(record => record.meta.requiresLogout)) {
                router.replace({
                    name: 'index',
                });
            }
        } else {
            // 需要登录
            if (!isLogin) {
                // 没有登录/登录失效则带上当前 url 跳转到登录页
                let query = {};

                if (window.location.pathname !== '/') {
                    query = {
                        redirect: window.location.pathname,
                    };
                }
                router.replace({
                    name: 'login',
                    query,
                });
            } else if (to.meta.roles !== '*' && !to.matched.some(record => record.meta.permission === true)) {
                // 没有访问权限
                console.log('没有访问权限');
                router.push({ name: 'forbidden' });
            }/*  else {
                // 有访问权限
                // next();
            } */
        }
        // 最后必须调用 next
        next();
    });

    // 导航后置守卫
    router.afterEach(route => {
        if (route.meta) {
            document.title = route.meta.title || '';
        }
    });
};
