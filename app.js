const Koa = require('koa');
const path = require('path');
const Pug = require('koa-pug');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const koaWebpack = require('koa-webpack');
const favicon = require('koa-favicon');
const static = require('koa-static');
const helmet = require("koa-helmet"); // 安全防护
const mongoose = require('mongoose');

const log4js = require('./server/utils/logs');
const routes = require('./server/routes.js');
const webpackConf = require('./webpack.config');
const router = new Router();
const app = new Koa();

// 加载路由配置模块
routes(router);

// 连接数据库
mongoose.connect('mongodb://localhost:27017/ranger', { useNewUrlParser: true });

koaWebpack({
    config: webpackConf,
    devMiddleware: {
        publicPath: '/',
        logLevel: 'silent',
    },
    hotClient: {
        logLevel: 'silent',
    },
}).then((middleware) => {
    // console.log('webpack middleware----', middleware);
    app.use(middleware);
});

new Pug({
    viewPath: './views',
    debug: false,
    pretty: false,
    compileDebug: false,
    app,
});

app.use(helmet())
    .use(static(path.join(__dirname, 'static')))
    .use(favicon(__dirname + 'src/img/logo.png'))
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
    .on('error', err => {
        console.error('server error', err)
    })
    .listen(8080);
