
import http from '@bjs/http/http';
import { strongMerge } from '@bjs/utils/types';

/**
 * 公共service方法
 * @param {*} config 实际传入的参数
 * @param {*} defaultOpt 默认参数
 */
const baseService = (config = {}, defaultOpt = {}) => {

    const opts = strongMerge({
        methods: 'post',
        loading: true,
    }, strongMerge(defaultOpt, config));

    /**
     * 兼容 url?params=xxx
     */
    const param = [];

    if (opts.params) {
        for (const key in opts.params) {
            param.push(`${key}=${opts.params[key]}`);
        }
    }

    opts.url = `${opts.url}?${param.join('&')}`;

    return http(opts);
};

export default baseService;
