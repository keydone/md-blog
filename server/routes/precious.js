const Router = require('koa-router');

const router = new Router();

router
    .get('/', ctx => {
        ctx.render('precious', {
            page: 'page-precious',
        })
    });

module.exports = router.routes();
