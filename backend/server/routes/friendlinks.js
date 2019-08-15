const Router = require('koa-router');

const router = new Router();
const controllers = require('../controllers/controller.export');

router
    // 查询网站友链
    .get('/list', async (ctx) => {
        await controllers.friendlinks.findAll({ ctx });
    })
    // 保存网站友链
    .post('/save', async (ctx) => {
        await controllers.friendlinks.save({ ctx });
    })
    // 删除网站友链
    .post('/delete', async (ctx) => {
        await controllers.friendlinks.remove({ ctx });
    });

module.exports = router.routes();
