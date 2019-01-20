const Router = require('koa-router');

const router = new Router();

router
    .get('/', (ctx) => {
        ctx.render('precious', {
            data: 'page-precious',
        });
    });

module.exports = router.routes();
