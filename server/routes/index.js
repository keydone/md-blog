const Router = require('koa-router');

const router = new Router();
const articles = require('../controllers/article');

router
    .get('/', articles.findAll, (ctx) => {
        ctx.render('index', {
            data: ctx.body,
        });
    });
module.exports = router.routes();
