/**
 * @author claude
 * date 07/30/2019
 * http 服务接口
 * @param {Object} config 需要被 deepMerge 的对象
 * @param {Object} config 请求入参, 与 axios 默认参数相同
 *
 * 支持动态 url, 使用 urltail 传入字符串, 将自动合并到 url 末尾
 * 入参列表:
 * config = {
 *      (新增) urltail, url 后缀, 常用于动态分页
 *      (新增) btnState: {
 *          type, 支持单个字符串和数组 ['loading', 'disabled'], 默认为 'loading', 传入 false 将不作处理
 *          target, 点击事件 $event
 *      },
 *      (新增) isCancel, 是否可取消上次的请求
 *      (新增) isLogin, 验证是否需要登录才能发送请求
 *      (新增) systemError, 是否显示系统报错弹窗, 默认为 true
 *      baseURL, url 前缀
 *      timeout (Number), 请求超时
 *      headers (Object), 请求头字段
 *      params (Object), key=value 参数, 自动拼接到 url ? 后面
 *      data (Object), post 参数
 * }
 *
 * @param {isCancel} Object 使用方法:
 * isCancel: {
 *      state: true / 'all', true 时只取消当前请求, 'all' 将取消所有请求
 *      msg: String, 主动取消时弹窗提示语, 非必传
 * }
 *
 * 请求响应无论怎样报错都会返回 code 和 msg,
 * 所以你可以根据 code 进行不同错误的后续处理
 * 前台 code 提供了 'cancelled', 'timeout'
 */
import baseService from '@bjs/http/httpCreate.js';
import { deepMerge } from '@bjs/utils/types';

const http = (config = {}, options = {}) => {
    const result = deepMerge(config, options);

    result.btnState = options.btnState; // deepMerge 无法合并正确的 dom, 也无法合并正确的 promise
    return baseService(result);
};

export default http;
