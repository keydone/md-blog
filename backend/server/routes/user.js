const Router = require('koa-router');

const router = new Router();
const controllers = require('../controllers/controller.export');

router
    // 注册
    .post('/register', async (ctx) => {
        await controllers.user.register(ctx);
    })
    // 登录
    .post('/login', async (ctx) => {
        await controllers.user.login(ctx);
    })
    // 查询用户信息
    .get('/userinfo', async (ctx) => {
        await controllers.user.userinfo(ctx);
    })
    // 查询注册用户列表
    .get('/signed-list', async (ctx) => {
        await controllers.user.signedList(ctx);
    });

module.exports = router.routes();
