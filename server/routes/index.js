const Router = require('koa-router');

const router = new Router();
const index = require('../controllers/index.js');

router.get('/', index.list, ctx => {
    console.log('--- get index ---');
    ctx.render('index');
});

module.exports = router.routes();
