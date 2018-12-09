const Router = require('koa-router');

const router = new Router();
const index = require('../controllers/articles');
// const data = require('../mock/index');

router
    .get('/', index.findAll, (ctx) => {
        ctx.render('index', {
            data: {
                posts: ctx.response.body,
            },
        });
    });

module.exports = router.routes();
