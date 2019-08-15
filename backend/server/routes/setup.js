const Router = require('koa-router');

const router = new Router();
const controllers = require('../controllers/controller.export');

router
    // 查询网站设置
    .get('/', async (ctx) => {
        await controllers.setup.findAll({ ctx });
    })
    // 保存网站设置
    .post('/save', async (ctx) => {
        await controllers.setup.save({ ctx });
    });

module.exports = router.routes();
