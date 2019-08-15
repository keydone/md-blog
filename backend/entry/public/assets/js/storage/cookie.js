/*!
 * @author claude
 * date 07/05/2019
 * 简单封装 cookie
 * api 与 js-cookie 相同
 * 默认所有 api 都会自动添加前缀
 */

import Cookies from 'js-cookie';
import base64url from 'base64-url';

const encode = process.env.NODE_ENV === 'production';

Cookies.defaults = {
    path:    '/',
    domain:  window.location.hostname,
    expires: 7,
};

const cookie = {
    // 设置cookie
    set(name, value, options = {
        expires:   7, // 过期时间默认 7 天
        expiresAt: 0,
        encode,
    }) {
        if (typeof name === 'object') {
            for (const key in name) {
                const value = name[key];

                cookie.setOne(key, value, options);
            }
        } else {
            cookie.setOne(name, value, options);
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

        Cookies.set(name, val, options);
    },
    // 获取并尝试转换为JSON格式返回
    get(name, options = {
        encode,
    }) {
        const originName = name;

        if (options.encode) {
            name = base64url.encode(name);
        }

        let result = Cookies.getJSON(name);

        if (result) {
            if (options.encode) {
                result = base64url.decode(result);
            }

            const { value, expires } = result;

            // 已过期
            if (Date.now() > expires) {
                cookie.remove(originName);
                return null;
            }
            return value;
        }
        return result;
    },
    /**
     * 移除 key
     * @param {String} name
     * @param {Object} options
     */
    remove(name, options = {}) {
        if (Array.isArray(name)) {
            name.forEach(item => {
                const key = `${base64url.encode(`${item}`)}`;

                Cookies.remove(key, options);
                Cookies.remove(item);
            });
        } else {
            Cookies.remove(`${base64url.encode(`${name}`)}`, options);
            Cookies.remove(name, options);
        }
    },
};

export default cookie;
