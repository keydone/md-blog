const Router = require('koa-router');

const router = new Router();
const controllers = require('../controllers/controller.export');

router
    // 查询标签
    .get('/list', async (ctx) => {
        await controllers.tags.findAll({ ctx });
    })
    // 新增标签
    .post('/save', async (ctx) => {
        await controllers.tags.save({ ctx });
    })
    // 删除标签
    .post('/delete', async (ctx) => {
        await controllers.tags.remove({ ctx });
    });

module.exports = router.routes();
