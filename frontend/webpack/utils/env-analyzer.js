const path = require('path');
const { readdirSync } = require('fs');
const { original } = JSON.parse(process.env.npm_config_argv);
const resolve = (dir) => path.resolve(__dirname, dir);
const envjs = require('../../.frontend.env');

const envConfig = {
    excludes: [],  // dev 时忽略的项目
    envParams: {}, // 命令行参数集合
    devMode: process.env.NODE_ENV !== 'production',
};

// 非 prod 环境才可以忽略文件夹
if (process.env.npm_lifecycle_event !== 'prod') {

    // 获取 xx=xx 参数
    original.slice(2).forEach(item => {
        const param = item.replace(/^--/, '');
        const [key, value] = param.split('=');

        envConfig.envParams[key] = value || '';
    });

    // 按文件夹读取子项目的配置文件
    const modules = readdirSync(resolve('../../src/modules'));

    modules.forEach(item => {
        const system = envjs[item.toLowerCase()];

        if (system) {
            if (system.watch === false) {
                // 排除监听的路径
                envConfig.excludes.push(resolve(`../../src/${item}`));
            }
        }
    });
}

module.exports = envConfig;
