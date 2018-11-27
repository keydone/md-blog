const Router = require('koa-router');

const router = new Router();

router.get('/', (ctx) => {
    ctx.render('about', {
        data: 'page-about',
    });
});

module.exports = router.routes();
