const Router = require('koa-router');

const router = new Router();
const index = require('../controllers/index.js');

router
    .get('/', index.list, ctx => {
        console.log('--- get index ---');
        console.log(ctx.body);
        ctx.render('index', {
            locals: {
                title: 'title',
            },
            page: 'index'
        });
    });

module.exports = router.routes();
