const Router = require('koa-router');

const router = new Router();

router.get('/', ctx => {
    console.log('--- backdoor index ---');
});

module.exports = router.routes();
