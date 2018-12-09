const Router = require('koa-router');

const router = new Router();

router.get('/', (ctx) => {
    ctx.render('about', {
        page: 'page-about',
    });
});

module.exports = router.routes();
