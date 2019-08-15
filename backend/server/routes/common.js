const Router = require('koa-router');
const Utils = require('../utils/utils');

const router = new Router();
const imgUpload = require('../api/upload');

router
    // 上传文件
    .post('/file-upload',
        async (ctx, next) => {
            await Utils.checkRedis(ctx, next);
        }, async (ctx, next) => {
            await Utils.checkAuthent(ctx, next);
        }, async (ctx, next) => {
            const _ctx = ctx;
            const { error, ...rest } = await imgUpload(ctx, next);

            console.log('上传完毕:', rest.filepath);

            if (error) {
                console.log(error);
                _ctx.status = 400;
                _ctx.body = {
                    code: 1,
                    msg:  error === 'ResponseTimeoutError' ? '请求超时, 上传失败' : '上传失败',
                };
            } else {
                _ctx.body = {
                    code: 0,
                    msg:  'ok',
                    url:  rest.filepath,
                };
            }
        });

module.exports = router.routes();
