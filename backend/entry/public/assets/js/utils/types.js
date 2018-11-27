/**
 * 数据类型转换
 */

/**
 * 是否为空 (空对象/空数组/空字符串)
 * @param {*} (obj / array / string)
 */
export const isEmpty = obj => {
    if (!obj || obj === '' || obj == null) return true;

    if (obj.constructor === Array) {
        // 是数组
        if (obj.length === 0) return true;
    } else {
        // 是对象
        if (Object.keys(obj).length === 0) return true;
    }
    return false;
};

/**
 * 深拷贝
 * @param {Object} obj
 */
export const deepClone = (obj) => {
    if (obj == null) return obj;
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (typeof obj !== 'object') return obj;

    // 开始拷贝
    let target = new obj.constructor();

    Object.keys(target).forEach((key) => {
        if (obj.hasOwnProperty(key)) {
            target = deepClone(obj[key]);
        }
    });

    return target;
};

/**
 * 合并对象(保留两者所有的属性, 后者覆盖前者)
 * @param {target} obj
 * @param {origin} obj
 */
export const strongMerge = (target, origin) => {
    for (const key in origin) {
        target[key] = target[key] && origin[key] !== undefined && origin[key].toString() === '[object Object]' ? strongMerge(target[key], origin[key]) : target[key] = origin[key];
    }
    return target;
};
