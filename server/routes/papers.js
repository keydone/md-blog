const Router = require('koa-router');
const menu = require('../controllers/menu');
const paper = require('../controllers/paper');

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
        })
    .post('/',
        async (ctx) => {
            console.log(3);
            await paper.save(ctx);
        });

module.exports = router.routes();
