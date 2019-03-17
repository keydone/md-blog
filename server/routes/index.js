const Router = require('koa-router');
const menu = require('../controllers/menu');
const category = require('../controllers/category');

const router = new Router();
const articles = require('../controllers/article');

router
    .get('/',
        async (ctx, next) => {
            ctx.body = {
                route: '/',
            };
            // 首页分类数量限制
            ctx.request.body.catesLimit = 12;
            // 获取导航菜单
            await menu.findAll(ctx);
            // 获取最新文章
            await articles.findLastPost(ctx);
            // 获取标签信息

            // 获取分类信息
            await category.findAll(ctx);

            // 获取分页数据
            await articles.findAll(ctx);

            ctx.render('index', {
                data: ctx.body,
            });
        });

module.exports = router.routes();
