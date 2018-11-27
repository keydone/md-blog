/**
 * 公共服务接口
 */

import baseService from '@js/http/service.js';

/**
 * 用户登录
 */
export const serviceLogin = (config = {}, defaultOpt = {
    url: '/user/login',
    loading: false,
}) => baseService(config, defaultOpt);

/**
 * 注销登录
 */
export const serviceLogout = () => { };

/**
 * 找回密码
 */
export const serviceFindPw = () => { };
