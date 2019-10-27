const Router = require('koa-router');

const router = new Router();
const controllers = require('../controllers/controller.export');

router
    // 查询列表
    .get('/list', async (ctx) => {
        await controllers.article.findAll({ ctx });
    })
    // 查询文章
    .get('/find', async (ctx) => {
        await controllers.article.findOne({ ctx });
    })
    // 保存文章
    .post('/save', async (ctx) => {
        await controllers.article.save({ ctx });
    })
    // 删除文章
    .post('/delete', async (ctx) => {
        await controllers.article.remove({ ctx });
    });

module.exports = router.routes();
