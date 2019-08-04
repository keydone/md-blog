/*!
 * @author claude
 * date 07/05/2019
 * 简单封装 cookie
 * api 与 js-cookie 相同
 * 默认所有 api 都会自动添加前缀
 */

import Cookies from 'js-cookie';
import { cookiePrefix } from '@js/const/cookie';

Cookies.defaults = {
    path: '/',
    domain: window.location.hostname,
    // expires: 14,
};

const Cookie = {
    // 获取
    get(name, options = {
        prefix: cookiePrefix,
    }) {
        return Cookies.get(`${options.prefix}${name}`);
    },

    // 获取并尝试转换为JSON格式返回
    getJSON(name, options = {
        prefix: cookiePrefix,
    }) {
        return Cookies.getJSON(`${options.prefix}${name}`);
    },

    // 设置cookie
    set(name, value, options = {
        prefix: cookiePrefix,
    }) {
        Cookies.set(`${options.prefix}${name}`, value, options);
    },

    // 移除cookie
    remove(name, options = {
        prefix: cookiePrefix,
    }) {
        Cookies.remove(`${options.prefix}${name}`, options);
    },
};

export default Cookie;
