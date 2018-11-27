const Router = require('koa-router');

const router = new Router();

router
    .get('/', (ctx) => {
        ctx.render('tags', {
            page: 'page-tags',
        });
    });

module.exports = router.routes();
