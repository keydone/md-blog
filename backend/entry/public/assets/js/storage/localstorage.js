/*!
 * @author claude
 * date 07/05/2019
 * 简单封装 ls
 */
import base64url from 'base64-url';
// import { deepMerge } from '@js/utils/types';

const { localStorage } = window;
const encode = process.env.NODE_ENV === 'production';

const ls = {
    /**
     * 设置 key
     * @param {String} name
     * @param {*} value
     * @param {Object} options
     * expires: 7 过期时间默认 7 天, 时间单位 天
     * expiresAt: 0 过期于 xxx 时间点(毫秒), 超过时间点自动过期
     * encode 是否使用 base64url 转义, 默认为 true
     */
    set(name, value, options = {
        expires:   7, // 过期时间默认 7 天
        expiresAt: 0,
        encode,
    }) {
        if (typeof name === 'object') {
            for (const key in name) {
                const value = name[key];

                ls.setOne(key, value, options);
            }
        } else {
            ls.setOne(name, value, options);
        }
    },
    setOne(name, value, options = {}) {
        const now = Date.now();
        const expires = options.expires * 3660 * 24 * 1000 + now;

        // 存储格式: {expires: 过期时间, value: 存入的值}
        let val = JSON.stringify({
            expires,
            value,
        });

        if (options.encode) {
            name = base64url.encode(name);
            val = base64url.encode(val);
        }

        localStorage.setItem(name, val);
    },
    /**
     * 获取 key
     * @param {String} name
     * 返回值经过 JSON.parse 转义
     */
    get(name, options = {
        encode,
    }) {
        const originName = name;

        if (options.encode) {
            name = base64url.encode(name);
        }

        let result = localStorage.getItem(name);

        if (result) {
            if (options.encode) {
                result = base64url.decode(result);
            }

            const item = JSON.parse(result);
            const { value, expires } = item;

            // 已过期
            if (Date.now() > expires) {
                ls.remove(originName);
                return null;
            }
            return value;
        }
        return result;
    },
    /**
     * 移除 key
     * @param {String|Array|Object} name
     */
    remove(name) {
        if (typeof name === 'object') {
            for (const keyIndex in name) {
                const key = `${base64url.encode(`${name[keyIndex]}`)}`;

                localStorage.removeItem(key);
                localStorage.removeItem(name[keyIndex]);
            }
        } else {
            localStorage.removeItem(`${base64url.encode(`${name}`)}`);
            localStorage.removeItem(name);
        }
    },
    /**
     * 更新/合并
     * 内部使用 JSON.stringify
     * @param {String} name
     * @param {*} value
     * @param {Object} options
     */
    /* update(name, value, options = {
        merge: false,
        encode: true,
        expires: 7, // 过期时间默认 7 天
        expiresAt: 0,
    }) {
        const originName = name;

        if (options.encode) {
            name = `${base64url.encode(`${name}`)}`;
        }

        let old = ls.get(name);

        if (old != null) {
            if (options.encode) {
                old = base64url.decode(old);
            }

            const oldVal = JSON.parse(old).value;

            // 合并对象并存储
            if (options.merge) {
                ls.set(originName, deepMerge(oldVal, value), options);
            }
        } else {
            ls.set(originName, value, options);
        }
    }, */
};

export default ls;
