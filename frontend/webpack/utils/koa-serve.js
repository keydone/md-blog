const fs = require('fs');
const Koa = require('koa');
const path = require('path');
const { promisify } = require('util');
const stat = promisify(fs.stat);
const mime = require('mime/lite');
const Router = require('koa-router');
// const staticPath = require('koa-static');
// const proxy = require('koa-proxy');

const app = new Koa();
const router = new Router();

const indexPath = async (ctx) => {
    //如果不是文件，则判断是否存在index.html
    const filename = path.join(__dirname, '../../../dist/frontend/index.html');

    const stats = await stat(filename);

    if (stats.isFile()) {
        ctx.set('Content-Type', 'text/html;charset=utf-8');
        ctx.body = fs.createReadStream(filename);
    }
};

const staticPath = (dir) => {

    return async (ctx) => {
        const _ctx = ctx;
        const pathname = ctx.path;

        if (pathname.indexOf('/api') !== 0) {
            try {
                //获取请求文件的绝对路径
                const realPath = path.join(dir, pathname);
                const statObj = await stat(realPath);

                if (statObj.isFile()) {
                    //如果是文件则读取文件，并且设置好相应的响应头
                    ctx.set('Content-Type', `${mime.getType(realPath)};charset=utf-8`);

                    _ctx.body = fs.createReadStream(realPath);
                } else {
                    await indexPath(ctx);
                }
            } catch (e) {
                await indexPath(ctx);
            }
        }
    };
};

// 接口代理
/* router
    .all(/^\/api/, proxy({
        host: app.env === 'development' ? env.API_DEV : env.API_PROD,
        map: (path) => path.split('/api')[1],
    })); */

/*
for (const key in env) {
    const module = env[key];

    for (const apindex in module) {
        if (module[apindex] && apindex.includes('API_')) {
            const $env = apindex.split('API_')[1].toLowerCase();
            // /api-wesecurity-fat
            const proxyApi = `/api-${key}-${$env}`;
            // /^\/api-wesecurity-fat
            const reg = new RegExp(`^${proxyApi}`);

            router
                .all(reg, proxy({
                    map:  path => path.split(proxyApi)[1],
                    host: module[apindex],
                }));
        }
    }
}
*/

app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(staticPath(path.resolve(__dirname, '../../../dist/frontend')))
    .listen('3101', () => {
        console.log('服务器正在运行在 3101 端口上...\nhttp://127.0.0.1:3101');
    })
    .on('error', (err) => {
        console.log(err.toString());
    });
