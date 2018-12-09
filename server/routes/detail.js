const Router = require('koa-router');

const router = new Router();
const articles = require('../controllers/articles');
// const data = require('../mock/index');

router
    .get('/:id', articles.findOne, (ctx) => {
        ctx.render('content', {
            pageheader: false,
            data: {
                article: ctx.response.body,
            },
        });
    });

module.exports = router.routes();
