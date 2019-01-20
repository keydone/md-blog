const Router = require('koa-router');

const router = new Router();
const articles = require('../controllers/article');

router
    .get('/', articles.findOne, (ctx) => {
        ctx.render('article', {
            pageheader: false,
            data: {
                ...ctx.body,
            },
        });
    });

module.exports = router.routes();
