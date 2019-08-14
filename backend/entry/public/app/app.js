import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import { syncTabsUserState } from '@bjs/router/auth';
import env from '../../../.backend.env';
import components from './components';
import store from '@bjs/store/store';
import http from '@bjs/http/http';
import router from '@bjs/router';
import App from './App.vue';
import '@bstyles/base.scss';

Vue.use(components);
Vue.use(VueLazyload, {
    attempt: 1,
});

const $env = process.env.NODE_ENV === 'production';

window.api = {
    env: process.env.NODE_ENV,
    baseUrl: $env ? env.entry.API_PROD : env.entry.API_DEV,
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
