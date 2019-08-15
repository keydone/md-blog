/*!
 * @author claude
 * date 07/05/2019
 * 全局路由入口
 */

import Vue from 'vue';
import Router from 'vue-router';
import mergeDynamicRoutes from './mergeRoute';
import baseRoutes from './baseRoutes';
import guards from './guards';
// 防止路由重复跳转报错
const originalPush = Router.prototype.push;
const originalReplace = Router.prototype.replace;

Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};
Router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err);
};

Vue.use(Router);

// 实例化路由
const createRouter = () => new Router({
    mode:   'history',
    routes: baseRoutes,
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
});

const router = createRouter();

// 添加动态路由
router.$addRoutes = (array) => {
    router.matcher = new Router({ mode: 'history', array }).matcher;
    router.addRoutes(array);
};

// 添加动态路由
mergeDynamicRoutes(router, baseRoutes);

// 路由守卫
guards(router);

// 重置路由
export const resetRouter = () => {
    // 恢复默认 redirect
    baseRoutes.find(item => {
        if (item.path === '*') {
            item.redirect = {
                path: '/login',
            };
        }
    });

    const newRouter = new Router({ mode: 'history', routes: baseRoutes });

    router.matcher = newRouter.matcher;
};

export default router;
