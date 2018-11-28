const Koa = require('koa');
const Pug = require('koa-pug');
const Router = require('koa-router');
const BodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const router = new Router();
const app = new Koa();

// 加载路由配置模块
require('./server/routes.js')(router);

// 连接数据库
mongoose.connect('mongodb://localhost:27017/ranger', { useNewUrlParser: true });

new Pug({
    viewPath: './views',
    debug: false,
    pretty: false,
    compileDebug: false,
    app,
});

app.use(BodyParser({
    enableTypes: ['json'],
    jsonLimit: '5mb',
    strict: true,
    onerror: (err, ctx) => {
        ctx.throw('body parse error', 422);
    }
}))
    .use(router.routes())
    .use(router.allowedMethods())
    .on('error', err => {
        console.error('server error', err)
    })
    .listen(8080);

module.exports = app;
