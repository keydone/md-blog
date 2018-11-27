const Router = require('koa-router');

const router = new Router();

router
    .get('/', (ctx) => {
        ctx.render('category', {
            page: 'page-category',
        });
    });

module.exports = router.routes();
