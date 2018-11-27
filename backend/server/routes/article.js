const Router = require('koa-router');

const router = new Router();
const menu = require('../controllers/menu');
const category = require('../controllers/category');
const articles = require('../controllers/article');

router
    .get('/', async (ctx) => {
        ctx.body = {
            route: `/papers-${ctx.params[0]}`,
        };
        ctx.request.body.catesLimit = 12;
        // 获取导航菜单
        await menu.findAll(ctx);
        // 获取最新文章
        await articles.findLastPost(ctx);
        // 获取分类信息
        await category.findAll(ctx);
        // 获取文章
        await articles.findOne(ctx);

        ctx.render('article', {
            pageheader: false,
            data: ctx.body,
        });
    });

module.exports = router.routes();
