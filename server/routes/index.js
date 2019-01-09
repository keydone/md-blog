const Router = require('koa-router');

const router = new Router();
const index = require('../controllers/articles');
// const data = require('../mock/index');

router
    .get('/', index.findAll, (ctx) => {
        const { body } = ctx;
        ctx.render('index', {
            data: {
                posts: body,
            },
        });
    });

module.exports = router.routes();
