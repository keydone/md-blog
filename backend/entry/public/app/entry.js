/*!
 * @author claude
 * date 07/05/2019
 * 应用程序入口文件
 */

import Vue from 'vue';
import { syncTabsUserState } from '@bjs/router/auth';
import { btnPermission } from '@bjs/directives/directives';
import env from '../../../.backend.env';
import components from './components';
import store from '@bjs/store/store';
import http from '@bjs/http/http';
import router from '@bjs/router';
import App from './App.vue';
import '@bstyles/base.scss';

// 自动注册所有组件
Vue.use(components);

// 全局指令
Vue.directive('auth', btnPermission);

// 挂载全局 http
Vue.prototype.$http = http;

// 递归向上派发事件
Vue.prototype.$dispatch = function $dispatch(eventName, data) {
    let parent = this.$parent;

    while (parent) {
        parent.$emit(eventName, data);
        parent = parent.$parent;
    }
};

// 递归向下传递事件
Vue.prototype.$broadcast = function $broadcast(eventName, data) {
    const broadcast = function () {
        this.$children.forEach((child) => {
            child.$emit(eventName, data);
            if (child.$children) {
                $broadcast.call(child, eventName, data);
            }
        });
    };

    broadcast.call(this, eventName, data);
};

// 添加 eventbus
Vue.prototype.$bus = new Vue();

// 挂载全局 api 变量
const $env = process.env.NODE_ENV === 'production';

window.api = {
    env:     process.env.NODE_ENV,
    baseUrl: $env ? env.entry.API_PROD : env.entry.API_DEV,
};

/**
 * 应用入口
 */
window.$app = new Vue({
    el: '#app',
    store,
    router,
    created() {
        // 同步多标签用户状态
        syncTabsUserState();
    },
    render: h => h(App),
});
