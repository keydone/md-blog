const Router = require('koa-router');

const router = new Router();
const controllers = require('../controllers/controller.export');

router
    // 查询分类
    .get('/list', async (ctx) => {
        await controllers.category.findAll({ ctx });
    })
    // 新增分类
    .post('/save', async (ctx) => {
        await controllers.category.save({ ctx });
    })
    // 删除分类
    .post('/delete', async (ctx) => {
        await controllers.category.remove({ ctx });
    });

module.exports = router.routes();
