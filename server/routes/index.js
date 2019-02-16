const Router = require('koa-router');

const router = new Router();
const articles = require('../controllers/article');

router
    .get('/',
        async (ctx) => {
            ctx.body = {};
            // 获取最新文章
            await articles.findLastPost(ctx);
            // 获取标签信息

            // 获取分类信息

            // 获取分页数据
            await articles.findAll(ctx);

            ctx.render('index', {
                data: ctx.body,
            });
        });

module.exports = router.routes();
