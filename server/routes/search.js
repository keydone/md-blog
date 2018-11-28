const Router = require('koa-router');

const router = new Router();

router
    .get('/', ctx => {
        ctx.render('search', {
            page: 'page-search',
        })
    });

module.exports = router.routes();
