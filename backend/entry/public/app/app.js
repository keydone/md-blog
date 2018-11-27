import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { syncUserState } from '@bjs/router/auth';
import env from '@/backend/.backend.env.js';
import store from '@bjs/store/store';
import router from '@bjs/router';
import App from './App.vue';
import '@bstyles/base.scss';

Vue.use(Element, { size: 'small' });

const $env = process.env.NODE_ENV === 'production';

window.api = {
    env: process.env.NODE_ENV,
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
        syncUserState();
    },
    render: h => h(App),
});
