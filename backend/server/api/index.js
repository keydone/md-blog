const Router = require('koa-router');
const user = require('../controllers/user');

const router = new Router();
const imgUpload = require('./upload');

router
    .post('/user/register', async (ctx, next) => {
        // await user.register(ctx);
    })
    .post('/user/login', async (ctx, next) => {
        await user.login(ctx);
    })
    .get('/user/userinfo', async (ctx, next) => {
        await user.userinfo(ctx);
    })
    .post('/stuff-upload', async (ctx, next) => {
        const { error, ...rest } = await imgUpload(ctx, next);

        console.log('上传完毕:', rest.filepath);

        ctx.body = {
            status: error ? 1 : 0,
            msg: error || 'ok',
            data: {
                ...rest,
            },
        };
    });

module.exports = router.routes();
