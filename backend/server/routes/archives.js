const Router = require('koa-router');

const router = new Router();

router
    .get(['/', '/:id'], (ctx) => {
        ctx.render('archives', {
            page: 'page-archives',
        });
    });

module.exports = router.routes();
