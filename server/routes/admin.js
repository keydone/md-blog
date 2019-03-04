const Router = require('koa-router');
const articles = require('../controllers/article');
const category = require('../controllers/category');
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
        // ctx.render('admin/login');
        ctx.render('admin/admin', {
            hideheader: true,
            hidefooter: true,
            data: ctx.body,
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
    .get('/write', async (ctx) => {
        ctx.body = {};
        const { id } = ctx.query;
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

        ctx.render('admin/write', {
            hideheader: true,
            hidefooter: true,
            data: {
                ...article,
            },
        });
    })
    .get('/note', (ctx) => {
        ctx.body = {};
        ctx.render('admin/note', {
            hideheader: true,
            hidefooter: true,
            data: {

            }
        });
    })
    .get('/cates', async (ctx, next) => {
        ctx.body = {};
        await category.findAll(ctx, next);

        ctx.render('admin/cates', {
            hideheader: true,
            hidefooter: true,
            data: ctx.body,
        });
    })
    .post('/menus-action', async (ctx, next) => {
        const { type } = ctx.request.body;
        if (type === 'add') {
            await menu.save(ctx, next);
        } else if (type === 'display') {
            await menu.update(ctx, next);
        } else if (type === 'remove') {
            await menu.remove(ctx, next);
        }
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
    .post('/article-publish', async (ctx, next) => {
        const { postType } = ctx.request.body;

        if (+postType === 0) {
            await articles.save(ctx, next);
        } else {
            await articles.update(ctx, next);
        }
    })
    .post('/article-delete', async (ctx, next) => {
        await articles.remove(ctx, next);
    })
    .post('/note-publish', async (ctx, next) => {
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
    });

module.exports = router.routes();
