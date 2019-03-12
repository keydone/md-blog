/* const emoji = require('markdown-it-emoji');
const mdCheckbox = require('markdown-it-checkbox');
const mdSmartArrows = require('markdown-it-smartarrows');
const mdDivs = require('markdown-it-div');
const md = require('markdown-it')({ html: true }); */
const ArticlesModel = require('../models/articles');
const stuffs = require('../models/stuffs');
const Utils = require('../utils/utils');

/* md.use(emoji)
    .use(mdCheckbox, {
        divWrap: true,
        divClass: 'checkbox',
        idPrefix: 'checkbox_'
    })
    .use(mdSmartArrows)
    .use(mdDivs); */

/**
 * @param {*page} page
 * @param {*pagesize} pagesize
 * @param {*drafts} drafts 1: 全部 0:非草稿 2:草稿
 */
const findAll = async (ctx, next) => {
    const { draft } = ctx.request.query;
    const drafts = draft === undefined ? 0 : +draft;
    let { page, pagesize } = ctx.request.query;
    const filter = {};
    page = (page - 1) || 0;
    pagesize = pagesize || 12;

    if (drafts === 0) {
        filter.isDraft = 0;
    } else if (drafts === 2) {
        filter.isDraft = 1;
    }

    try {
        const total = await ArticlesModel.countDocuments();
        const list = await ArticlesModel.find(filter)
            .limit(pagesize)
            .skip(page * pagesize)
            .sort({ createdAt: -1 });
        Object.assign(ctx.body, {
            total,
            pagesize,
            page,
            list,
        });
        if (next) next(ctx, next);
    } catch (error) {
        Object.assign(ctx.body, {
            error,
        });
        if (next) next(ctx, next);
        console.log('err ---', error);
    }
};

// 最新几篇
const findLastPost = async (ctx) => {
    ctx.body.last_post = await ArticlesModel.find({
        isDraft: 0,
    })
        .limit(5)
        .sort({ createdAt: -1 });
};

const findOne = async (ctx, next) => {
    const { id } = ctx.query;
    if (!ctx.body) ctx.body = {};

    try {
        const article = await ArticlesModel.findOne({ path: id });
        if (article) {
            const attachment = await stuffs.findOne({ articleId: id });
            article.stuffs = attachment || {};
            const { _id } = article;
            let prevItem = await ArticlesModel.find({ _id: { $lt: _id } }).sort({ _id: -1 }).limit(1);
            prevItem = prevItem.length ? prevItem[0] : null;

            let nextItem = await ArticlesModel.find({ _id: { $gt: _id } }).sort({ _id: 1 }).limit(1);
            nextItem = nextItem.length ? nextItem[0] : null;

            Object.assign(ctx.body, {
                prevItem,
                article,
                nextItem,
            });

            if (next) next(ctx, next);
        }
    } catch (error) {
        Object.assign(ctx.body, {
            error,
        });

        if (next) next(ctx, next);
        console.log('err ---', error);
    }
};

const save = async (ctx, next) => {
    const { body } = ctx.request;
    const articleData = body.article;
    const { path, title } = articleData;

    if (!title) {
        ctx.body = { status: 1, msg: '文章标题 不能为空' };
    } else {
        if (path) {
            articleData.path = `${path}-${Utils.today()}`;
        } else {
            articleData.path = +new Date();
        }

        const isExists = await ArticlesModel.findOne({ path: articleData.path });
        if (isExists) {
            ctx.body = { status: 1, msg: '文章id 已存在' };
        } else {
            try {
                const article = new ArticlesModel(articleData);
                await article.save();
                ctx.body = { status: 0, msg: '发布成功!' };
            } catch (err) {
                ctx.body = { status: 1, msg: Utils.unexpected(err) };
            }
        }
    }
    if (next) next(ctx);
};

const update = async (ctx, next) => {
    const { _id, article } = ctx.request.body;

    try {
        const res = await ArticlesModel.findOneAndUpdate({ _id }, article, {
            new: true,
            useFindAndModify: false,
        });

        if (res === null) {
            ctx.body = { status: 1, msg: '更新失败 (-_-)' };
        } else {
            ctx.body = { status: 0, msg: '更新成功!' };
        }
    } catch (err) {
        ctx.body = { status: 1, msg: Utils.unexpected(err) };
    }

    if (next) next(ctx);
};

const remove = async (ctx, next) => {
    const { _id } = ctx.request.body;
    try {
        const { deletedCount } = await ArticlesModel.deleteOne({ _id });
        if (deletedCount) {
            ctx.body = { status: 0, msg: '删除成功!' };
        } else {
            ctx.body = { status: 1, msg: '删除失败' };
        }
    } catch (err) {
        ctx.body = { status: 1, msg: Utils.unexpected(err) };
    }
    if (next) next(ctx);
};

module.exports = {
    findAll,
    findLastPost,
    findOne,
    save,
    update,
    remove,
};
