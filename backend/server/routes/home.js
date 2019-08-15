const Router = require('koa-router');

const router = new Router();
const { mergeBlocks } = require('../utils/midwares');
const controllers = require('../controllers/controller.export');

router
    // 查询首页板块管理
    .get('/blocks',
        async (ctx, next) => {
            await controllers.blocks.findAll({
                ctx,
                next,
                merge: {
                    lean: true,
                },
                sort: {
                    createdAt: 1,
                },
            });

            const _ctx = ctx;

            if (_ctx.$body) {
                _ctx.body = _ctx.$body;
            }
        },
        async ctx => mergeBlocks(ctx))
    // 保存首页板块管理
    .post('/blocks-save', async (ctx) => {
        await controllers.blocks.save({ ctx });
    })
    // 删除首页板块管理
    .post('/blocks-delete', async (ctx) => {
        await controllers.blocks.remove({ ctx });
    })
    // 更新首页板块管理
    .post('/blocks-update', async (ctx) => {
        await controllers.blocks.update({ ctx });
    })
    // 查询广告位管理
    .get('/advertises', async (ctx) => {
        await controllers.advertise.findAll({
            ctx,
            merge: {
                lean: true,
            },
            sort: {
                createdAt: 1,
            },
        });
    })
    // 保存广告位
    .post('/advs-save', async (ctx) => {
        await controllers.advertise.save({ ctx });
    })
    // 删除广告位
    .post('/advs-delete', async (ctx) => {
        await controllers.advertise.remove({ ctx });
    })
    // 更新广告板块
    .post('/advs-update', async (ctx) => {
        await controllers.advertise.update({ ctx });
    })
    // 查询首页公告管理
    .get('/notice', async (ctx) => {
        await controllers.notice.findAll({
            ctx,
            sort: {
                createdAt: 1,
            },
        });
    })
    // 查询首页活跃度管理
    .get('/activity', async (ctx) => {
        await controllers.activity.findAll({
            ctx,
            merge: {
                lean: true,
            },
            sort: {
                createdAt: 1,
            },
        });
    });

module.exports = router.routes();
