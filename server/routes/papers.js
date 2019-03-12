const Router = require('koa-router');
const menu = require('../controllers/menu');

const router = new Router();

router
    .get('/',
        async (ctx, next) => {
            ctx.body = {};
            // 首页分类数量限制
            ctx.request.body.catesLimit = 12;
            // 获取导航菜单
            await menu.findAll(ctx);

            ctx.render('reading', {
                data: ctx.body,
            });
        });

module.exports = router.routes();
