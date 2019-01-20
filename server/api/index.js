const Router = require('koa-router');

const router = new Router();
const imgUpload = require('./upload');

router.post('/stuff-upload', async (ctx, next) => {
    const { error, ...rest } = await imgUpload(ctx, next);
    console.log('上传完毕:', rest.path);

    ctx.body = {
        status: error ? 1 : 0,
        msg: error || 'ok',
        data: {
            ...rest,
        },
    };
});

module.exports = router.routes();
