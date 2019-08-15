const Router = require('koa-router');

const router = new Router();
const controllers = require('../controllers/controller.export');

router
    // 查询网站底部板块
    .get('/list', async (ctx) => {
        await controllers.footerblock.findAll({ ctx });
    })
    // 保存网站底部板块
    .post('/save', async (ctx) => {
        await controllers.footerblock.save({ ctx });
    })
    // 删除网站底部板块
    .post('/delete', async (ctx) => {
        await controllers.footerblock.remove({ ctx });
    });

module.exports = router.routes();
