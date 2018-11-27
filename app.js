const Koa = require('koa');
const Pug = require('koa-pug');
const Router = require('koa-router');
const md = require('markdown-it')();
const Monk = require('monk');
const router=new Router();
const app = new Koa();

const db = new Monk('localhost/ranger');

new Pug({
    viewPath: './views',
    debug: false,
    pretty: false,
    compileDebug: false,
    app,
});

app.use(function* () {
    this.render('index', {
        path: md.render('# markdown-it rulezz!'),
    }, true);
});

app.use(router.routes());

app.on('error', err => {
    console.error('server error', err)
});

app.listen(8080);
