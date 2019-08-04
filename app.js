const Koa = require('koa');
const path = require('path');
const Pug = require('koa-pug');
const cors = require('@koa/cors');
const Router = require('koa-router');
// const cacheControl = require('koa-cache-control');
const bodyParser = require('koa-bodyparser');
const compression = require('koa-compress');
const staticPath = require('koa-static');
const favicon = require('koa-favicon');
const session = require('koa-session');
const helmet = require('koa-helmet'); // 安全防护
const mongoose = require('mongoose');
const moment = require('moment');
// const shelljs = require('shelljs');

const routes = require('./server/routes');
const Utils = require('./server/utils/utils');
const log4js = require('./server/utils/logs');
const SessionStore = require('./server/utils/sessionStore');
const $config = require('./server/site_config');
const env = require('./.env.js');

const router = new Router();
const app = new Koa();

// 加载路由配置模块
routes(router);

// 连接数据库
mongoose.connect('mongodb://localhost:27017/ranger', {
    useCreateIndex: true,
    useNewUrlParser: true,
});
mongoose.connection.on('error', (error) => {
    console.log('[error]: ', error.name, error.errorLabels);
});

// 编译 js, css
// shelljs.exec('webpack webpack.config.v3.js');

const pug = new Pug({
    viewPath: './views',
    locals: {
        setting: $config,
        moment,
    },
    noCache: env.NODE_ENV === 'development',
    app,
});

app.keys = ['some-secret'];

app.use(cors())
    .use(helmet())
    .use((ctx, next) => {
        if (!ctx.request.url.includes('/login')) {
            ctx.cacheControl = {
                maxAge: 3600 * 24 * 7, // 秒
            };
        }
        return next();
    })
    .use(compression())
    .use(staticPath(path.join(__dirname, 'public')))
    .use(favicon(`${__dirname}/src/img/logo.png`))
    // 挂载日志模块
    .use(async (ctx, next) => {
        // 判断是否为手机访问
        const isMobile = Utils.isMobile(ctx);

        pug.locals.isMobile = isMobile;
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
        formLimit: '200mb',
        jsonLimit: '200mb',
        textLimit: '200mb',
    }))
    .use(session({
        key: 'koa:sess',
        maxAge: 86400000,
        overwrite: true,
        httpOnly: true,
        signed: true,
        rolling: false,
        store: new SessionStore(),
    }, app))
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async (ctx) => {
        if (ctx.status === 404 || ctx.status === 500) {
            await ctx.render('404.pug');
        }
    })
    .on('error', (err) => {
        console.error('!!! server error, msg:', err.message);
    })
    .listen(2333, () => {
        console.log('server is running on port 2333');
    });
