/*!
 * @author claude
 * date 07/05/2019
 * 简单封装 ls
 */
import base64url from 'base64-url';
import { deepMerge } from '@js/utils/types';

const { localStorage } = window;

const ls = {
    /**
     * 设置 key
     * @param {String} name
     * @param {*} value
     */
    set(name, value) {
        localStorage.setItem(`${base64url.encode(`${name}`)}`, base64url.encode(JSON.stringify(value)));
    },
    /**
     * 获取 key
     * @param {String} name
     * 返回值经过 JSON.parse 转义
     */
    get(name) {
        const result = localStorage.getItem(`${base64url.encode(`${name}`)}`);

        return result ? JSON.parse(base64url.decode(result)) : result;
    },
    /**
     * 移除 key
     * @param {String} name
     */
    remove(...name) {
        if (Array.isArray(name)) {
            name.forEach(item => {
                const key = `${base64url.encode(`${item}`)}`;

                localStorage.removeItem(key);
            });
        } else {
            localStorage.removeItem(`${base64url.encode(`${name}`)}`);
        }
    },
    /**
     * 更新/合并
     * 内部使用 JSON.stringify
     * @param {String} name
     * @param {*} value
     * @param {Object} options
     */
    update(name, value, options) {
        const old = localStorage.getItem(`${base64url.encode(`${name}`)}`);

        if (old != null) {
            const oldVal = JSON.parse(old);

            // 合并对象并存储
            if (options.merge) {
                localStorage.setItem(`${base64url.encode(`${name}`)}`, base64url.encode(JSON.stringify(deepMerge(oldVal, value))));
            }
        } else {
            ls.set(name, value);
        }
    },
};

export default ls;
