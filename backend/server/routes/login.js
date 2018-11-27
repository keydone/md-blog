const Router = require('koa-router');

const router = new Router();

router
    .get('/', async (ctx, next) => {
        ctx.body = {};
        const { type } = ctx.request.query;

        ctx.render('admin/login', {
            hideheader: true,
            hidefooter: true,
            data: {
                type,
                ...ctx.body,
            },
        });
    });

module.exports = router.routes();
