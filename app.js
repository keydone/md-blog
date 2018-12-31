const Koa = require('koa');
const path = require('path');
const Pug = require('koa-pug');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const compression = require('koa-compress');
const staticPath = require('koa-static');
const favicon = require('koa-favicon');
const helmet = require('koa-helmet'); // 安全防护
const mongoose = require('mongoose');
const shelljs = require('shelljs');

const log4js = require('./server/utils/logs');
const routes = require('./server/routes.js');
const $config = require('./server/site_config');

const router = new Router();
const app = new Koa();

// 加载路由配置模块
routes(router);

// 连接数据库
mongoose.connect('mongodb://localhost:27017/ranger', { useNewUrlParser: true });

// 编译 js, css
// shelljs.exec('webpack webpack.config.v3.js');

new Pug({
    viewPath: './views',
    locals: {
        setting: $config,
    },
    noCache: process.env.NODE_ENV === 'development',
    app,
});

app.use(helmet())
    .use(compression())
    .use(staticPath(path.join(__dirname, 'static')))
    .use(favicon(`${__dirname}src/img/logo.png`))
    // 挂载日志模块
    .use(async (ctx, next) => {
        ctx.util = {
            log: log4js
        };
        await next();
    })
    // 记录日志
    .use(async (ctx, next) => {
        ctx.util.log.info(`host: ${ctx.req.headers.host} - url: ${ctx.request.url}`);
        await next();
    })
    .use(BodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async (ctx) => {
        if (ctx.status === 404 || ctx.status === 500) {
            await ctx.render('404.pug');
        }
    })
    .on('error', (err) => {
        console.error('server error', err);
    })
    .listen(8080);
