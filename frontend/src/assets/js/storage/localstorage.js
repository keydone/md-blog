/*!
 * @author claude
 * date 07/05/2019
 * 简单封装 ls
 */
const { localStorage } = window;
const prefix = '';

const ls = {
    /**
     * 设置 key
     * @param {String} name
     * @param {*} value
     */
    set(name, value) {
        localStorage.setItem(`${prefix}${name}`, value);
    },
    /**
     * 获取 key
     * @param {String} name
     */
    get(name) {
        return localStorage.getItem(`${prefix}${name}`);
    },
    /**
     * 移除 key
     * @param {String} name
     */
    remove(name) {

        localStorage.removeItem(`${prefix}${name}`);
    },
    /**
     * 更新/合并
     * @param {String} name
     * @param {*} value
     * @param {Object} options
     */
    update(name, value, options) {
        const old = localStorage.getItem(`${prefix}${name}`);

        // 合并对象并存储
        if (options.merge) {
            localStorage.setItem(`${prefix}${name}`, Object.assign(value, old));
        }
    },
};

export default ls;
