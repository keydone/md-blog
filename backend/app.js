const fs = require('fs');
const Koa = require('koa');
const path = require('path');
const cors = require('@koa/cors');
const Router = require('koa-router');
const favicon = require('koa-favicon');
const cacheControl = require('koa-cache-control');
const routes = require('./server/routes/routes');
const log4js = require('./server/utils/logs');
const bodyParser = require('koa-bodyparser');
const compression = require('koa-compress');
const { promisify } = require('util');
const mongoose = require('mongoose');
const helmet = require('koa-helmet');
const mime = require('mime/lite');
const stat = promisify(fs.stat);

const resolve = dir => path.resolve(__dirname, dir);

const indexPath = async (ctx) => {
    //如果不是文件，则判断是否存在index.html
    const filename = path.join(__dirname, '../dist/backend/index.html');

    const stats = await stat(filename);

    if (stats.isFile()) {
        ctx.set('Content-Type', 'text/html;charset=utf-8');
        ctx.body = fs.createReadStream(filename);
    }
};

// 区分静态资源
const staticPath = (dir) => {

    return async (ctx, next) => {
        const _ctx = ctx;
        const pathname = ctx.path;

        if (pathname.indexOf('/api/') === 0) {
            // 接口请求
            await next();
        } else {
            //获取请求文件的绝对路径
            const realPath = path.join(dir, pathname);

            try {
                const stats = await stat(realPath);

                if (stats.isFile()) {
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

// 连接数据库
async function connectDB(callback) {
    const connectState = await mongoose.connect('mongodb://127.0.0.1:27017/source', {
        useCreateIndex:     true,
        useNewUrlParser:    true,
        useUnifiedTopology: true,
    }).catch(err => console.log(err));

    if (connectState) {
        callback();
    }
}

// 连接数据库
connectDB(() => {
    const app = new Koa();
    const router = new Router();

    // 加载路由配置模块
    routes(router);

    app.keys = ['some-secret'];

    app.use(cors())
        .use(helmet()) // 安全防护
        .use(cacheControl({
            maxAge: 3600 * 24 * 14, // (秒) 14 天
        }))
        .use(compression())
        .use(staticPath(resolve('../dist/backend')))
        .use(favicon(resolve('../dist/backend/logo.png')))
        // 挂载日志模块
        .use(async (ctx, next) => {
            // 是否为手机访问
            // const isMobile = Utils.isMobile(ctx);

            ctx.util = {
                log: log4js,
            };
            await next();
        })
        // 记录日志
        .use(async (ctx, next) => {
            ctx.util.log.info(`host: ${ctx.req.headers.host} - url: ${ctx.request.url} - status: ${ctx.request.status}`);
            await next();
        })
        .use(bodyParser({
            formLimit: '100mb',
            jsonLimit: '100mb',
            textLimit: '100mb',
        }))
        .use(router.routes())
        .use(router.allowedMethods())
        .listen(3102, () => {
            console.log('服务器正在运行在 3102 端口上...\nhttp://localhost:3102');
        })
        .on('error', (err) => {
            console.error('[server error]:', err.toString());
        });
});
