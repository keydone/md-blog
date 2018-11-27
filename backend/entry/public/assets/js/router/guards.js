/**
 * 全局路由守卫
 */
import { baseIsLogin, resetToLogin } from './auth';

export default function guards(router) {

    router.beforeEach((to, from, next) => {
        // to and from are both route objects. must call `next`.
        // 权限认证
        const isLogin = baseIsLogin();

        // console.log(to, from);

        if (to.meta.ignoreLogin) {
            if (isLogin) {
                // 如果进入登录页等则前往首页
                if (to.name === 'login') {
                    router.replace({
                        name: 'index',
                    });
                }
            } else {
                next();
            }
        } else if (isLogin) {
            next();
        } else {
            resetToLogin(router);
        }
    });
}
