const Router = require('koa-router');

const router = new Router();
const imgUpload = require('./upload');

router.post('/img-upload', async (ctx, next) => {
    const { name, error } = await imgUpload(ctx, next);
    const path = `//img.kaiziye.cn/${name}`;
    console.log('上传完毕:', name, error);

    if (error) {
        ctx.body = {
            status: 1,
            msg: error,
            data: {
                name,
                path,
            },
        };
    } else {
        ctx.body = {
            status: 0,
            msg: 'ok',
            data: {
                name,
                path,
            },
        };
    }
});

module.exports = router.routes();
