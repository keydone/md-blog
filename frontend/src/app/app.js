import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import { syncTabsUserState } from '@js/router/auth';
import env from '@/frontend/.frontend.env';
import components from './components';
import store from '@js/store/store';
import http from '@js/http/http';
import router from '@js/router';
import App from './App.vue';
import '@styles/base.scss';

Vue.use(components);
Vue.use(VueLazyload, {
    attempt: 1,
});

const $env = process.env.NODE_ENV === 'production';

window.api = {
    env: process.env.NODE_ENV,
    baseUrl: $env ? env.public.API_PROD : env.public.API_DEV,
};

// 挂载全局 http
Vue.prototype.http = http;

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
