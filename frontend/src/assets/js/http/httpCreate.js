/**
 * http 初始化
 * 初始化全局loading, 请求拦截, 响应
 */

import axios from 'axios';
import store from '@js/store/store';
import { Message, Loading } from 'element-ui';
import { resetToLogin } from '@js/router/auth';

let loadingInstance = null;

const httpCreate = axios.create({
    // 请求超时 20s
    timeout: 20000,
    headers: {}, // 公共头
    baseURL: window.api.baseUrl,
    // responseType: 'json', // default
    // responseEncoding: 'utf8', // default
    // xsrfCookieName: 'XSRF-TOKEN', // default
    // xsrfHeaderName: 'X-XSRF-TOKEN', // default
});

// 请求拦截器
httpCreate.interceptors.request.use(config => {
    // 发送请求前判断是否登录
    if (!store.getters.isLogin && config.isLogin) {
        // 跳转到登录页
        resetToLogin();
    }
    // 添加全局弹窗
    loadingInstance = Loading.service({ fullscreen: true });

    return config;
}, error => {
    Message.error(error.response.msg);
    Promise.reject(error);
});

// 响应拦截器
httpCreate.interceptors.response.use(
    res => {
        // 关闭全局弹窗
        if (loadingInstance) {
            loadingInstance.close();
        }
        // 登录信息失效或需要重新登录
        if (res.redirect) {
            // 跳转到登录页
            resetToLogin();
        }
    },
    error => {
        // 防止 loading 太快引起页面闪烁
        setTimeout(() => {
            if (loadingInstance) {
                loadingInstance.close();
            }
        }, 300);
        // 全局错误处理
        if (error.response.status) {
            switch (+error.response.status) {
                case 404:
                    Message.error(error.response.statusText);
                    break;
                default:
                    Message.error(error.response.msg);
            }
        }
        Promise.reject(error.response);
        return {};
    },
);

export default httpCreate;
