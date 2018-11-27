const Router = require('koa-router');
const articles = require('../controllers/article');
const category = require('../controllers/category');
const paper = require('../controllers/paper');
const stuff = require('../controllers/stuff');
const menu = require('../controllers/menu');

const router = new Router();

router
    .get('/', async (ctx, next) => {
        ctx.body = {};
        Object.assign(ctx.query, {
            draft: 1, // 显示全部类型
        });

        await articles.findAll(ctx, next);

        ctx.render('admin/admin', {
            hideheader: true,
            hidefooter: true,
            data: {
                ...ctx.body,
                paginator: '/admin',
                block: 'articles',
            },
        });
    })
    .get('/menus', async (ctx, next) => {
        ctx.body = {};
        await menu.findAll(ctx, next);

        ctx.render('admin/menus', {
            hideheader: true,
            hidefooter: true,
            data: ctx.body,
        });
    })
    .get(['/write', '/write/:id'], async (ctx) => {
        ctx.body = {};
        const { id } = ctx.params;
        const { block } = ctx.request.query;
        if (block !== 'articles') {
            await paper.findOne(ctx);
        } else {
            let article = '';
            // 获取分类信息
            await category.findAll(ctx);
            if (id) {
                await articles.findOne(ctx);
                const { body } = ctx;
                const articleId = body.article.path;
                const stuffs = await stuff.findOne(articleId);
                article = body;
                if (stuffs) {
                    article.stuffs = stuffs.stuff;
                }
            }
        }

        ctx.render('admin/write', {
            hideheader: true,
            hidefooter: true,
            data: {
                ...ctx.body,
                block,
            },
        });
    })
    .post('/articles-publish', async (ctx) => {
        const { postType } = ctx.request.body;

        if (+postType === 0) {
            await articles.save(ctx);
        } else {
            await articles.update(ctx);
        }
    })
    .post('/articles-delete', async (ctx, next) => {
        await articles.remove(ctx, next);
    })
    .get('/cates', async (ctx, next) => {
        ctx.body = {};
        await category.findAll(ctx, next);

        ctx.render('admin/cates', {
            hideheader: true,
            hidefooter: true,
            data: {
                ...ctx.body,
            },
        });
    })
    .post('/cates-action', async (ctx, next) => {
        const { type } = ctx.request.body;
        if (type === 'add') {
            await category.save(ctx, next);
        } else if (type === 'display') {
            await category.update(ctx, next);
        } else if (type === 'remove') {
            await category.remove(ctx, next);
        }
    })
    .post('/menus-action', async (ctx, next) => {
        const { type } = ctx.request.body;
        if (type === 'add') {
            await menu.save(ctx, next);
        } else if (type === 'update') {
            await menu.update(ctx, next);
        } else if (type === 'remove') {
            await menu.remove(ctx, next);
        }
    })
    .post('/notes-publish', async (ctx, next) => {
        const { success, msg } = await articles.save(ctx, next);

        if (success) {
            ctx.body = {
                status: 0,
                msg: 'ok',
            };
        } else {
            ctx.body = {
                status: 1,
                msg,
            };
        }
    })
    .get('/previous', (ctx) => {
        ctx.body = {};
        ctx.render('admin/admin', {
            hideheader: true,
            hidefooter: true,
            data: {
                ...ctx.body,
                paginator: '/admin/previous',
                block: 'previous',
            },
        });
    })
    .get('/papers-*', async (ctx) => {
        ctx.body = {};
        const block = ctx.params[0];

        await paper.findAll(ctx);

        ctx.render('admin/admin', {
            hideheader: true,
            hidefooter: true,
            data: {
                ...ctx.body,
                paginator: `/admin/${block}`,
                block,
            },
        });
    })
    .post('/*-publish', async (ctx) => {
        await paper.save(ctx);
    });

module.exports = router.routes();
