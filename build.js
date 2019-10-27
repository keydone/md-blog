const { exec } = require('shelljs');

// 获取npm命令行参数
const { cooked } = JSON.parse(process.env.npm_config_argv);
const presets = {
    dev(env) {
        let envPath = '';

        if (env === 'front') {
            envPath = 'frontend';
        } else if (env === 'back') {
            envPath = 'backend/entry';
        }
        exec(`webpack-dev-server --config ${envPath}/webpack/webpack.dev.js`);
    },
    build(env) {
        let envPath = '';

        if (env === 'front') {
            envPath = 'frontend';
        } else if (env === 'back') {
            envPath = 'backend/entry';
        }
        exec(`node ${envPath}/webpack/build.js`);
    },
    server(env) {
        let envPath = '';

        if (env === 'front') {
            envPath = 'frontend';
        } else if (env === 'back') {
            envPath = 'backend/entry';
        }
        exec(`node ${envPath}/webpack/utils/koa-serve.js`);
    },
};

let mode = [];

// 解析 npm 命令行参数
if (cooked[2] == null) {
    mode = ['front', 'back'];
} else {
    mode.push(cooked[2].substr(2));
}

// 执行相应命名
mode.forEach(item => {
    presets[cooked[1]](item);
});
