const Router = require('koa-router');
const menu = require('../controllers/menu');

const router = new Router();

router
    .get('/',
        async (ctx) => {
            ctx.body = {
                route: `/papers-${ctx.params[0]}`,
            };
            // 获取导航菜单
            await menu.findAll(ctx);

            ctx.render('papers', {
                pageheader: false,
                data: ctx.body,
            });
        });

module.exports = router.routes();
