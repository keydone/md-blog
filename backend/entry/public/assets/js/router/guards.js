/*!
 * @author claude
 * date 07/05/2019
 * 全局路由守卫
 */

/**
 * 实现思路:
 * - 根据 to.meta 判断是否需要登录权限
 *      1, 不需要
 *          - 如果跳转后有需要, 跳到登录页并带上 redirect
 *          - 确定跳转后不需要, 但是登录时访问登录页, 则自动跳转到首页
 *      2, 需要
 *          - 未登录
 *              - 前往登录页并带上当前页地址
 *              - 登录请求接口, 接口返回用户角色, 权限, 拥有的路由表
 *              - 合并接口的路由表并与本地的路由表合并, 并存入 store
 *          - 已登录
 *              - 判断路由是否带有 redirect
 *              - 从 store 获取缓存, 并 addRouter 动态添加路由表
 *              - 如有需要, 在后台悄悄请求新的路由表并更新 store 和本地存储
 */
import { baseIsLogin } from './auth';

export default function guards(router) {

    router.beforeEach((to, from, next) => {
        // 获取登录信息 & 权限认证
        const isLogin = baseIsLogin();

        // 无需登录
        if (to.matched.some(record => record.meta.requiresAuth !== true)) {
            if (to.matched.some(record => record.meta.requiresLogout)) {
                // 登录后访问了不可访问的路由, 比如登录页
                if (isLogin) {
                    router.replace({
                        name: 'index',
                    });
                }
            }
        } else {
            // 需要登录
            if (!isLogin) {
                router.replace({
                    name: 'login',
                    query: {
                        redirect: window.location.pathname,
                    },
                });
            } else if (to.matched.some(record => record.meta.permission === true)) {
                // 有访问权限
                // next();
            } else {
                // 没有访问权限
                console.log('没有访问权限');
                router.push({ name: 'notfound' });
            }
        }
        // 最后必须调用 next
        next();
    });
}
