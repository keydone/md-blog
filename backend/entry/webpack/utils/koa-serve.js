const fs = require('fs');
const Koa = require('koa');
const path = require('path');
const mime = require('mime/lite');
const { promisify } = require('util');
const stat = promisify(fs.stat);
const Router = require('koa-router');
// const staticPath = require('koa-static');
// const proxy = require('koa-proxy');

const app = new Koa();
const router = new Router();

const indexPath = async (ctx) => {
    //如果不是文件，则判断是否存在index.html
    const filename = path.join(__dirname, '../../../../dist/backend/index.html');

    await stat(filename);

    ctx.set('Content-Type', 'text/html;charset=utf-8');
    ctx.body = fs.createReadStream(filename);
};

const staticPath = (dir) => {

    return async (ctx) => {
        const pathname = ctx.path;

        //获取请求文件的绝对路径
        const realPath = path.join(dir, pathname);

        try {
            const statObj = await stat(realPath);

            if (statObj.isFile()) {
                //如果是文件则读取文件，并且设置好相应的响应头
                ctx.set('Content-Type', `${mime.getType(realPath)};charset=utf-8`);

                ctx.body = fs.createReadStream(realPath);
            } else {
                await indexPath(ctx);
            }
        } catch (e) {
            await indexPath(ctx);
        }
    };
};

// 接口代理
/* router
    .all(/^\/api/, proxy({
        host: app.env === 'development' ? env.API_DEV : env.API_PROD,
        map: (path) => path.split('/api')[1],
    })); */

app
    .use(router.routes())
    .use(router.allowedMethods())
    .use(staticPath(path.resolve(__dirname, '../../../../dist/backend')));

app.listen('3102', () => {
    console.log('服务器正在运行在 3102 端口上...');
});
