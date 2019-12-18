const Router = require('koa-router');

const router = new Router();
const controllers = require('../controllers/controller.export');

router
    // 查询列表
    .get('/list', async (ctx) => {
        await controllers.article.findAll({ ctx, model: 'notes' });
    })
    // 查询文章
    .get('/find', async (ctx) => {
        await controllers.article.findOne({ ctx, model: 'notes' });
    })
    // 保存文章
    .post('/save', async (ctx) => {
        await controllers.article.save({ ctx, model: 'notes' });
    })
    // 删除文章
    .post('/delete', async (ctx) => {
        await controllers.article.remove({ ctx, model: 'notes' });
    });

module.exports = router.routes();
