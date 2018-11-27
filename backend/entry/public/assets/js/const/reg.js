/**
 * 通用正则
 */

// 邮箱匹配规则
export const EMAILREG = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

// 匹配字母数字下划线
export const REMOVESPACE = /^\w+$/;

// 匹配前后空格
export const WHITESPACE = /(^\s*)|(\s*$)/g;
