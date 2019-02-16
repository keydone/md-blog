const Router = require('koa-router');

const router = new Router();
const articles = require('../controllers/article');

router
    .get('/', articles.findOne, async (ctx) => {
        // 获取最新文章
        await articles.findLastPost(ctx);
        ctx.render('article', {
            pageheader: false,
            data: {
                ...ctx.body,
            },
        });
    });

module.exports = router.routes();
