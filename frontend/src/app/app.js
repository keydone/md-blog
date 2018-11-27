import Vue from 'vue';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { syncUserState } from '@js/router/auth';
import env from '@/frontend/.frontend.env';
import store from '@js/store/store';
import router from '@js/router';
import App from './App.vue';
import '@styles/base.scss';

Vue.use(Element, { size: 'small' });

const $env = process.env.NODE_ENV === 'production';

window.api = {
    env: process.env.NODE_ENV,
    baseUrl: $env ? env.public.API_PROD : env.public.API_DEV,
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
